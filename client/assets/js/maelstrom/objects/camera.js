class Camera {

    #width;
    #height;
    #position;
    #scale = 3.2;

    constructor(width, height) {
        this.#width = width;
        this.#height = height;
        this.#position = [0, 0, 0];
    }

    #getTransform( ) {
        return glMatrix.mat4.fromRotationTranslationScale(
            Maelstrom.getMatrix( ),
            [0, 0, 0, 0],
            this.#position,
            [1, 1, 1]
        );
    }

    #getOrtho( ) {
        const canvas = Maelstrom.Graphics.gl.canvas;
        return glMatrix.mat4.ortho(Maelstrom.getMatrix( ), 0, canvas.width / this.#scale, canvas.height / this.#scale, 0, 1, -1);
    }

    get projection( ) {
        const ortho = this.#getOrtho( );
        const transform = this.#getTransform( );
        const outbound = glMatrix.mat4.multiply(Maelstrom.getMatrix( ), ortho, transform);
        Maelstrom.freeMatrix(ortho, transform);
        return outbound;
    }

    get perspective( ) {
        const canvas = Maelstrom.Graphics.gl.canvas;
        const aspect = canvas.width / canvas.height;
        const zNear = 1;
        const zFar = 1000;
        const fov = Math.tan(Math.PI * 0.5 - 0.5 * 30);
        return glMatrix.mat4.perspective(Maelstrom.getMatrix( ), fov, aspect, zNear, zFar);
    }

    /* experimental */

    get projection3D( ) {
        const p2D = this.projection;
        const prs = this.perspective;
        const p3D = glMatrix.mat4.multiply(Maelstrom.getMatrix( ), p2D, prs);
        Maelstrom.freeMatrix(p2D, prs);
        return p3D;
    }

    get x( ) {return this.#position[0];}
    set x(n) {this.#position[0] = n;}

    get y( ) { return this.#position[1];}
    set y(n) { this.#position[1] = n;}

    get z( ) { return this.#position[2];}
    set z(n) { this.#position[2] = n}

    reposition(x, y, z = 1) {
        this.#position = [-x,-y, z];
    }

}


export default new Camera(1280, 720);