export function createBuffer(data, usage = Malestrom.gl.STATIC_DRAW) {
    let buffer = Malestrom.gl.createBuffer( );
    Malestrom.gl.bindBuffer(Malestrom.gl.ARRAY_BUFFER, buffer);
    Malestrom.gl.bufferData(Malestrom.gl.ARRAY_BUFFER, data, usage);
    return buffer;
}

export function activateTexture(index, uniform, texture, repeat = false ) {
    const gl = Malestrom.gl;
    gl.activeTexture(gl.TEXTURE0 + index);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    if(repeat) {
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
    }
    gl.uniform1i(uniform, index);
}

export function activateAttribute(attr, size, stride, offset, type = Malestrom.gl.FLOAT, span = Float32Array.BYTES_PER_ELEMENT) {
    const gl = Malestrom.gl;
    gl.enableVertexAttribArray(attr);
    gl.vertexAttribPoint(attr, size, type, false, stride * span, offset * span);   
}

