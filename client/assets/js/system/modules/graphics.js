import compileShader from './compileshader.js';

const FL_SPAN = Float32Array.BYTES_PER_ELEMENT;

let gl;
let currentShader; 
let shaderPrograms = { };
let textureBuffer;


export async function init(_gl) {
    gl = _gl;
    gl.viewport(...Malestrom.VIEW_PORT);
    textureBuffer = useBuffer(gl.createBuffer( ), [0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0]);
    await loadShaderPrograms( );
}

export function clear(color) {
    gl.clearColor(...color);
    gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);
}

export function drawMap(mapTexture, tileTexture, map_size, transform, projection, tint = [1, 1, 1, 1], buffer = textureBuffer, vertices = 6) {
    useShader(shaderPrograms.tilemap);
    useBuffer(buffer);
    activateAttribute(currentShader.attributes.a_position, 2, 4, 0);
    activateAttribute(currentShader.attributes.a_textCoord, 2, 4, 2);
    activateTexture(0, currentShader.uniforms.u_map_texture, mapTexture);
    activateTexture(1, currentShader.uniforms.u_tile_texture, tileTexture);
    gl.uniformMatrix4fv(currentShader.uniforms.u_transform, false, transform);
    gl.uniformMatrix4fv(currentShader.uniforms.u_projection, false, projection);
    gl.uniform4fv(currentShader.uniforms.u_tint, tint);
    gl.uniform1f(currentShader.uniforms.u_tilesize, Malestrom.Properties.TILESIZE);
    gl.uniform1f(currentShader.uniforms.u_map_size, map_size);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, vertices);
}

export function drawSprite(source_texture, color_texture, size, position, transform, projection, tint, buffer = textureBuffer, vertices = 6) {
    useShader(shaderPrograms.sprite);
    useBuffer(buffer);
    activateAttribute(currentShader.attributes.a_position, 2, 4, 0);
    activateAttribute(currentShader.attributes.a_textCoord, 2, 4, 2);
    activateTexture(0, currentShader.uniforms.u_source_texture, source_texture);
    activateTexture(1, currentShader.uniforms.u_color_texture, color_texture);
    gl.uniformMatrix4fv(currentShader.uniforms.u_transform, false, transform);
    gl.uniformMatrix4fv(currentShader.uniforms.u_projection, false, projection);
    gl.uniform4fv(currentShader.uniforms.u_tint, tint);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, vertices);
}

export function drawTexture(texture, transform, projection, tint = [1, 1, 1, 1], repeat = false,  buffer = textureBuffer, vertices = 6) {
    useShader(shaderPrograms.simpleTexture);
    userBuffer(buffer);
    activateAttribute(currentShader.attributes.a_position, 2, 4, 0);
    activateAttribute(currentShader.attributes.a_textCoord, 2, 4, 2);
    activateTexture(0, currentShader.uniforms.u_texture, texture, repeat);
    gl.uniformMatrix4fv(currentShader.uniforms.u_transform, false, transform);
    gl.uniformMatrix4fv(currentShader.uniforms.u_projection, false, projection);
    gl.uniform4fv(currentShader.uniforms.u_tint, tint)
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, vertices)
}
//initialization of shader programs 
async function loadShaderPrograms( ) {
    const config = await Malestrom.Methods.loadJSON('/assets/shader/config.json');
    for(const shaderName in config) {
        shaderPrograms[shaderName] = await compileShader(gl, config[shaderName]);
    }
}

export { 
    textureBuffer as SQR_TEXTURE_BUFFER,
};


//activate attribute 
function activateAttribute(attr, size, stride, offset) {
    gl.enableVertexAttribArray(attr);
    gl.vertexAttribPoint(attr, size, gl.FLOAT, false, stride * FL_SPAN, offset * FL_SPAN);
}

//activate texture 
//can repeat texture if flag is set accordingly
function activateTexture(index, uniform, texture, repeat) {
    gl.activeTexture(gl.TEXTURE0 + index);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    if(repeat) {
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
    }
    gl.uniform1i(uniform, index);
}

//set bind and set buffer
function useBuffer(buffer, bufferData) {
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    if(bufferData) gl.bufferData(gl.ARRAY_BUFFER, bufferData, gl.STATIC_DRAW);
    return buffer;
}

//performs gl commands if buffer isn't current 
//to minimize gl calls 
function useShader(shader) {
    if(currentShader == shader) return shader;
    gl.useProgram(shader.program);
    gl.enable(gl.BLEND);
    gl.blendFUNC(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA); 
}
