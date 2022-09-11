const shaderLibrary = { };

let currentShader = null, gl = null, textureBuffer = null;

const simpleAttributes = {
    a_position: {size: 2, stride: 4, offset: 0},
    a_texCoord: {size: 2, stride: 4, offset: 2}
}

/*************************************************
 * Private functions
 */

const compileShaders = async( ) => {
    const source = await fetch('/assets/shader/config.json').then(response => response.json( ));
    for(const shaderName in source) await compileShader(shaderName, source[shaderName]);
}

const compileShader = async(name, config) => {
    try {
        const vertexText = await fetch(config.vertex).then(response => response.text( ));
        const fragmentText = await fetch(config.fragment).then(response => response.text( ));
        //
        const vertexShader = defineShader(vertexText, gl.VERTEX_SHADER);
        const fragmentShader = defineShader(fragmentText, gl.FRAGMENT_SHADER);
        //
        const program = defineProgram(vertexShader, fragmentShader);
        //
        const attributes = getAttributes(program, vertexText, fragmentText);
        const uniforms   = getUniforms(program, vertexText, fragmentText);
        //
        shaderLibrary[name] = {
            program: program, 
            attributes: attributes,
            uniforms: uniforms
        }
    } catch (err) {
        throw err;
    }
}

const defineProgram = (vertexShader, fragmentShader) => {
    const program = gl.createProgram( );
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program, gl.LINK_STATUS);
    if(!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        const err = gl.getProgramInfoLog(program);
        gl.deleteProgram(program);
        console.log("Error - linkShaderProgram.\n================================");
        throw err;
    }
    return program;    
}

const defineShader = (text, type) => {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, text);
    gl.compileShader(shader);
    if(gl.getShaderParameter(shader, gl.COMPILE_STATUS)) return shader;
    console.error(text,'\n');
    throw `Could not compile shader [${type}].\n${gl.getShaderInfoLog(shader)}`; 
}

/********************************************
 * Drawing Functions 
 */

/**
 * drawingSimpleTexture  - 
 * @param {*} texture 
 * @param {*} matrices 
 * @param {*} tint 
 * @param {*} repeat 
 * @param {*} vertices 
 */

const drawSimpleTexture = (texture, matrices, tint = [1, 1, 1, 1], repeat = false, vertices = 6) => {
    useShader(shaderLibrary.simpleTexture);
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    setBuffer(textureBuffer);
    setMatrices(matrices);
    setAttributes(simpleAttributes);
    setTexture(0, currentShader.uniforms.u_texture, texture, repeat);
    gl.uniform4fv(currentShader.uniforms.u_tint, tint);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, vertices);
    clearMatrices(matrices);
} 

const drawSprite = (sprite, index, transform, projection, tint = [1, 1, 1, 1]) => {
    useShader(shaderLibrary.sprite);
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    const matrices = sprite.getCellMatrices(index, ...transform);
    matrices.u_projection = projection;
    setBuffer(textureBuffer);
    setMatrices(matrices);
    setAttributes(simpleAttributes);
    setTexture(0, currentShader.uniforms.u_texture, sprite.texture);
    gl.uniform4fv(currentShader.uniforms.u_tint, tint);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 6);
    clearMatrices(matrices);
}

/**
 * Helper functions for processing
 */

/**
 * 
 * @param {*} text 
 * @param {*} parameter 
 * @returns 
 */

const clearMatrices = matrices => {
    for(const key in matrices) Maelstrom.freeMatrix(matrices[key]); 
}

const findParameter = (text, parameter) => {
    const regex = new RegExp(`(?<=${parameter} ).*`, 'g');
    const results = text.match(regex);
    const params  =  results ? results.map( x => x.substring(x.lastIndexOf(' ') + 1, x.length - 1)) : [];
    return params;
}

const getAttributes = (program, vertex, fragment) => {
    let keys = [].concat(findParameter(vertex, 'attribute'), findParameter(fragment, 'attribute'));
    let source = [...new Set(keys).values( )];
    let result = { };
    for(const key of source) result[key] = gl.getAttribLocation(program, key);
    return result;
}

const getUniforms = (program, vertex, fragment) => {
    let keys = [].concat(findParameter(vertex, 'uniform'), findParameter(fragment, 'uniform'));
    let source = [...new Set(keys).values( )];
    let result = { };
    for(const key of source) result[key] = gl.getUniformLocation(program, key);
    return result;
}

const setBuffer = (buffer, bufferData, drawType = gl.STATIC_DRAW) => {
    if(bufferData) return createBuffer(bufferData, drawType);
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    return buffer;
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

const setTexture = (index, uniform, texture, repeat = false) => {
    gl.activeTexture(gl.TEXTURE0 + index);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    if(repeat) {
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
    }
    gl.uniform1i(uniform, index);
}

/**************************************************
 * GameTexture Object 
 */
class GameTexture {
    #texture;
    #ctx;
    #url;

    constructor(canvas = document.createElement('canvas')) {
        this.#ctx = canvas.getContext('2d');
        this.#texture = gl.createTexture( );
    }

    get texture( ) { return this.#texture; }

    get canvas( ) {return this.#ctx.canvas; }

    get url( ) {return this.#url; }

    clear( ) {
        this.#url = undefined;
        this.canvas.width = 1;
        this.canvas.height = 1;
    }

    async load(url) {
        this.#url = url;
        return Maelstrom.Assets.loadImage(url).then(this.texturize.bind(this));
    }

    po2(n) {
        return (n & (n - 1) == 0);
    }

    texturize(image) {
        this.canvas.width = image.width;
        this.canvas.height = image.height;
        this.#ctx.drawImage(image, 0, 0);
        gl.bindTexture(gl.TEXTURE_2D, this.#texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
        //
        if(this.po2(image.width) && this.po2(image.height)) {
            gl.generateMipmap(gl.TEXTURE_2D);
        } else {
            // Set the parameters so we can render any size image.
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        }
    }
}

/**************************************************
 * Functions to be used for export 
 */
 const init = async canvas => {
    gl = canvas.getContext('webgl', { preMultipliedAlpha: false });
    textureBuffer = createBuffer([
         0, 0, 0, 0, 
         1, 0, 1, 0, 
         0, 1, 0, 1, 
         0, 1, 0, 1,
         1, 1, 1, 1, 
         1, 0, 1, 0
    ]);
    await compileShaders( );
}

const clear = color => {
    gl.clearColor(...color);
    gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);
}

const createBuffer = (data, drawType = gl.STATIC_DRAW) => {
    const buffer = gl.createBuffer( );
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), drawType);
    return buffer;
}

const useShader = shader=> {
    if(shader != currentShader) {
        gl.useProgram(shader.program);
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA); 
        currentShader = shader;  
    } 
    return shader;
}

/**************************************************
 * Export functions  
 */
const exportObject = {
    get gl( ) {return gl},
    get Shaders( ) {return shaderLibrary},
    GameTexture: GameTexture,
    init: init,
    clear: clear,
    drawSimpleTexture: drawSimpleTexture,
    drawSprite: drawSprite
}

export default exportObject;