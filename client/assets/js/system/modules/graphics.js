import compileShader from './compileshader.js';

const FL_SPAN = Float32Array.BYTES_PER_ELEMENT;

let _gl;
let currentShader; 
let shaderPrograms;

export async function init(gl) {
    _gl = gl;
    _gl.viewport(...GameSystem.VIEW_PORT);
    await loadShaderPrograms( );
}

export function clear(color) {
    _gl.clearColor(...color);
    _gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);
}

export function drawTexture(texture, buffer, transform, projection, tint = [1, 1, 1, 1], repeat = false) {
    useShader(shaderPrograms.simpleTexture);
    userBuffer(buffer);
    activateAttribute(currentShader.attributes.a_position, 2, 4, 0);
    activateAttribute(currentShader.attributes.a_textCoord, 2, 4, 2);
    activateTexture(0, currentShader.uniforms.u_texture, texture, repeat);
}
//initialization of shader programs 
async function loadShaderPrograms( ) {
    const config = await GameSystem.loadJSON('/shaders/config.json');
    for(const shaderName in config) {
        shaderPrograms[shaderNAme] = await compileShader(_gl, config[shaderName]);
    }
}

//activate attribute 
function activateAttribute(attr, size, stride, offset) {
    _gl.enableVertexAttribArray(attr);
    _gl.vertexAttribPoint(attr, size, gl.FLOAT, false, stride * FL_SPAN, offset * FL_SPAN);
}

//activate texture 
//can repeat texture if flag is set accordingly
function activateTexture(index, uniform, texture, repeat) {
    _gl.activeTexture(_gl.TEXTURE0 + index);
    _gl.bindTexture(_gl.TEXTURE_2D, texture);
    if(repeat) {
        _gl.texParameteri(_gl.TEXTURE_2D, _gl.TEXTURE_WRAP_S, _gl.REPEAT);
        _gl.texParameteri(_gl.TEXTURE_2D, _gl.TEXTURE_WRAP_T, _gl.REPEAT);
    }
    _gl.uniform1i(uniform, index);
}

//set bind and set buffer
function useBuffer(buffer, bufferData) {
    _gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    if(bufferData) gl.bufferData(gl.ARRAY_BUFFER, bufferData, gl.STATIC_DRAW);
    return buffer;
}

//performs gl commands if buffer isn't current 
//to minimize gl calls 
function useShader(shader) {
    if(currentShader == shader) return shader;
    _gl.useProgram(shader.program);
    _gl.enable(gl.BLEND);
    _gl.blendFUNC(_gl.SRC_ALPHA, _gl.ONE_MINUS_SRC_ALPHA); 
}
