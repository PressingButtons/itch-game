import compileShaders from "./compile_shaders.js";

let currentShader;
let textureBuffer;
let gl;

const attributeDefs = {
    standard: {
        a_position: {size: 2, stride: 4, offset: 0},
        a_texCoord: {size: 2, stride: 4, offset: 2}
    }
}

/**========================================================================
 * Private functions ======================================================
 *=========================================================================
 */
const selectShader = name => {
    if(Maelstrom.Shaders[name] != currentShader) {
        currentShader = Maelstrom.Shaders[name];
        gl.useProgram(currentShader.program);
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA); 
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    } else {
        return currentShader;
    }
}

const setAttributes = attributes => {
    for(const name in attributes) {
        const attribute = currentShader.attributes[name];
        const data = attributes[name];
        gl.enableVertexAttribArray(attribute);
        gl.vertexAttribPointer(
            attribute, 
            data.size, 
            gl.FLOAT, 
            false,
            data.stride * Float32Array.BYTES_PER_ELEMENT,
            data.offset * Float32Array.BYTES_PER_ELEMENT
        );
    }
}

const setMatrices = matrices => {
    for(const name in matrices) gl.uniformMatrix4fv(currentShader.uniforms[name], false, matrices[name]);
}

const setTexture = (texture, index, uniform, repeats) => {
    gl.activeTexture(gl.TEXTURE0 + index);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    if(repeats) {
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
    }
    gl.uniform1i(uniform, index);
}


/**========================================================================
 * Export functions =======================================================
 *=========================================================================
 */
export async function init( ) {
    gl = Maelstrom.gl;
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    await compileShaders( );
    textureBuffer = createGLBuffer(new Float32Array([0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0]));
}

export function fill(color) {
    gl.clearColor(...color);
    gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);   
}

export function createGLBuffer(data, drawMethod = 'STATIC_DRAW') {
    const buffer = gl.createBuffer( );
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, data, gl[drawMethod]);
    return buffer;
}

export function drawTexture(data) {
    selectShader("standard");
    gl.bindBuffer(gl.ARRAY_BUFFER, textureBuffer);
    setAttributes(attributeDefs.standard);
    setMatrices(data.matrices);
    setTexture(data.texture, 0, currentShader.uniforms.u_texture, data.repeat);
    gl.uniform4fv(currentShader.uniforms.u_tint, data.tint || [1, 1, 1, 1]);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 6);
    console.log(data.matrices);
    Maelstrom.Matrix.releaseMatrices(data.matrices);
}