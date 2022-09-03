import { loadImageFromURL } from "./loaders";

export default class GameTexture {

    #texture;
    #src;

    constructor( ) {
        this.#texture = Malestrom.gl.createTexture( );
    }

    get texture ( ) {
        return this.#texture;
    }

    get src( ) {
        return this.#src;
    }

    async loadFromURL(url) {
        return loadImageFromURL(url, true).then(this.texturize);
    }

    texturize(image) {
        this.#src = image;
        const gl = Malestrom.gl;
        gl.bindTexture(gl.TEXTURE_2D, this.#texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
        if(powerOfTwo(image.width) && powerOfTwo(image.height)) {
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

const powerOfTwo = n => {return (n &(n - 1) == 0)}