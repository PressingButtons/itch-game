import { loadImage } from "../utils.js";

const textureLibrary = new Map( );

/**========================================================================
 * Private functions ======================================================
 *=========================================================================
 */
const createTexture = (ctx, url) => {
    const gl = Maelstrom.gl;
    const texture = gl.createTexture( );
    textureLibrary.set(url, {texture: texture, src: ctx});
    bindTexture(texture, ctx.canvas);
    return url;
}

const po2 = n => {
    return (n & (n - 1) == 0);
}

/**========================================================================
 * Export functions =======================================================
 *=========================================================================
 */

 /**
  * bindTexture
  * @param {webgl_texture} texture 
  * @param {HTMLImageElement} image 
  * set binding point for texture
  */

 export function bindTexture(texture, image) {
    const gl = Maelstrom.gl;
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
    //
    if(po2(image.width) && po2(image.height)) {
        gl.generateMipmap(gl.TEXTURE_2D);
    } else {
        // Set the parameters so we can render any size image.
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    }
 }

 export function textureKeys( ) {
    return [...textureLibrary.keys( )];
 }

 export function getTexture(url) {
    return textureLibrary.get(url);
 }

/**
 * loadTexture
 * @param {string} url 
 * @returns promise
 * try to load texture into textureLibrary
 */

export function loadTexture(url) {
    return loadImage(url).then( ctx => createTexture(ctx, url));
}