export default class Sprite {

    #source;
    #data = new Uint16Array(6);

    constructor( ) {

    }

    get width( ) {return this.#data[0]}
    get height( ) {return this.#data[1]}

    get columns( ) { return Math.floor(this.rect.width / this.width) }
    get rows( ) { return Math.floor(This.rect.height / this.height) }

    get rect( ) {
        return {
            x: this.#data[2],
            y: this.#data[3],
            width: this.#data[4] - this.#data[2],
            height: this.#data[5] - this.#data[3]
        }
    }

    get texture( ) {
        return this.#source.texture;
    }

    cellMatrix(row, column) {
        const translation = [column * this.width, row * this.height, 0];
        const scale = [this.width / this.rect.width, this.height / this.rect.height, 1];
        return {
            u_texMatrix: glMatrix.mat4.fromRotationTranslationScale(Maelstrom.Matrix.getMatrix( ), [0, 0, 0, 0], translation, scale),
            u_transform: glMatrix.mat4.fromScaling(Maelstrom.Matrix.getMatrix( ), [this.width, this.height, 1])
        }

    }

    load(url, width, height, sx = 0, sy = 0, ex = null, ey = null) {
        return Maelstrom.Textures.loadTexture(url)
        .then(Maelstrom.Textures.getTexture)
        .then(obj => this.setTexture(obj, width, height, sx, sy, ex, ey));
    }

    setTexture(textureObject, width, height, sx = 0, sy = 0, ex = null, ey = null) {
        this.#source = textureObject;
        sx = sx < 0 ? 0 : sx;
        sy = sy < 0 ? 0 : sy;
        ex = ex ? ex : textureObject.src.canvas.width - sx;
        ey = ey ? ey : textureObject.src.canvas.height - sy;
        this.#data.set([width, height, sx, sy, ex, ey])
    }

}