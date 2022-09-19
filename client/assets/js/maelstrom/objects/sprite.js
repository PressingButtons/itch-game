export default class Sprite {

    #data = new Uint16Array(6);
    #texture;

    constructor(texture, width, height, sx = 0, sy = 0, ex = null, ey = null) {
        this.setSource(texture, width, height, sx, sy, ex, ey);
    }

    get width( ) {
        return this.#data[0];
    }

    get height( ) {
        return this.#data[1];
    }

    get rect( ) {
        return {
            x: this.#data[2],
            y: this.#data[3],
            width: this.#data[4] - this.#data[2],
            height: this.#data[5] - this.#data[3]
        }
    }

    get rows( ) {
        return Math.floor(this.rect.height / this.height);
    }

    get columns( ) {
        return Math.floor( this.rect.width / this.width);
    }

    get texture( ) {
        return this.#texture.texture;
    }

    #getScale( ) {
        return [this.width, this.height, 1]
    }

    #getTranslation(r, c) {
        const x = c % this.columns * this.width;
        const y = Math.floor(r / this.columns) * this.height;

        return [
            x / this.rect.width,
            y / this.rect.height,
            0
        ]
    }

    getCellMatrix(rowIndex, colIndex = 0) {
        const translation = this.#getTranslation(rowIndex, colIndex);
        const scale = [this.width/this.rect.width, this.height/this.rect.height, 1];
        return glMatrix.mat4.fromRotationTranslationScale(Maelstrom.getMatrix( ), [0, 0, 0, 0], translation, scale);
    }

    getTransform(x, y, z, rx = 0, ry = 0, rz = 0) {
        return glMatrix.mat4.fromRotationTranslationScale(Maelstrom.getMatrix( ), [rx, ry, rz, 0], [x, y, z], [this.width, this.height, 1]);
    }

    getCellMatrices(i, x, y, z = 0) {
        return {
            u_texMatrix: this.getCellMatrix(...i),
            u_transform: this.getTransform(x, y, z)
        }
    }

    setSource(texture, width, height, sx = 0, sy = 0, ex = null, ey = null) {
        if(!ex || ex < 0) ex = texture.canvas.width;
        if(!ey || ey < 0) ey = texture.canvas.height;

        const w = ex - sx;
        const h = ey - sy;

        this.#data.set([
            Math.min(width, w),
            Math.min(height, h),
            sx, sy,
            ex, ey
        ]);

        this.#texture = texture;
    }

}