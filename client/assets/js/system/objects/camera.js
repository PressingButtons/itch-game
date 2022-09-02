 class Camera extends Core.Objects.GameObject {

    constructor( ) {
        super({name: "camera", width: 640, height: 360, alloc: 216});
        this.assignToBuffer('scale', Float32Array, 3);
        this.scale.set([1, 1, 1]);
        this.assignToBuffer('transform', Float32Array, 16);
        this.assignToBuffer('ortho', Float32Array, 16);
        this.assignToBuffer('_projection', Float32Array, 16);
        console.log(this.unallocated);
    }

    get projection( ) {
        this.transform = glMatrix.mat4.fromTranslationRotationScale(this.transform, [0, 0, 0, 0], this.position, this.scale);
        this.ortho = glMatrix.mat4.ortho(this.ortho, 0, this.width, this.height, 0, 1, -1);
        return glMatrix.mat4.multiply(this._projection, this.transform, this.ortho);
    }

    get left( ) {
        return this.x - this.width / 2;
    }

    set left(n) {
        this.x = n + this.width / 2;
    }

    get right ( ) {
        return this.x + this.width / 2;
    }

    set right(n) {
        this.x = n - this.width / 2;
    }

    get top( ) {
        return this.y - this.height / 2;
    }

    set top(n) {
        this.y = n + this.height / 2;
    }

    get bottom( ) {
        return this.y + this.height / 2;
    }

    set bottom(n) {
        this.y = n - this.height / 2;
    }

    track(...objects) {
        let min, max;
        for(const object of objects) {
            if(!min) min = [object.left, object.top];
            else min.forEach((value, index) => min[index] = Math.min(value, object.position[index]));
            if(!max)  max = [object.right, object.bottom];
            else max.forEach((value, index) => max[index] = Math.max(value, object.position[index]));
        }
        this.x = max[0] - min[0] / 2;
        this.y = max[1] - min[1] / 2;
    }

}

export default new Camera( );