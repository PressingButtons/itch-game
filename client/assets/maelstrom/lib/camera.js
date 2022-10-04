const size_ref = [1280, 720, 1];
let rotation = [0, 0, 0, 0];
let position = [0, 0, 0]; //center of stage
let bounds = [0, 0, 1280, 720];
let scale = 1;

const sides = {
    get left( ) { return position[0] - size_ref[0] * scale;},
    set left(n) { position[0] = n + size_ref[0] * scale;},
    
    get right( ) { return position[0] + size_ref[0] * scale;},
    set right(n) { position[0] = n - size_ref[0] * scale;},

    get top( ) { return position[1] - size_ref[1] * scale;},
    set top(n) { position[1] = n + size_ref[1] * scale;},

    get bottom( ) { return position[1] + size_ref[1] * scale;},
    set bottom(n) { position[1] = n - size_ref[1] * scale;}

}

const translation = ( ) => {
    return glMatrix.mat4.fromRotationTranslationScale(Maelstrom.Matrix.getMatrix( ), rotation, position, [scale, scale, 1]);
}

const ortho = ( ) => {
    return glMatrix.mat4.ortho(Maelstrom.Matrix.getMatrix( ), 0, size_ref[0], size_ref[1], 0, 1, -1);
}

export function projection( ) {
    //const m1 = ortho( );
    //const m2 = translation( );
    //const projection = glMatrix.mat4.multiply(Maelstrom.Matrix.getMatrix( ), m1, m2);
    //Maelstrom.Matrix.releaseMatrices(m1, m2);
    //return projection;
    return ortho( );
}

export function moveBy(x = 0, y = 0) {
    data[5] += x;
    data[6] += y;
}

export function reposition(x, y) {
    data[5] = x;
    data[6] = y;
}
