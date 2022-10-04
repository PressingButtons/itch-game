const NUM_MATRICES = 10;

const matrixBuffer = new ArrayBuffer(16 * NUM_MATRICES * Float32Array.BYTES_PER_ELEMENT);

const matrices = new Array(NUM_MATRICES).fill(0).map((x, i) => new Float32Array(matrixBuffer, i * 16 * Float32Array.BYTES_PER_ELEMENT, 16));

const allocated = [];

export function getMatrix( ) {
    if(matrices.length == 0) {
        throw 'Error - no open matrices for operation';
    }
    const matrix = matrices.pop( );
    allocated.push(matrix);
    return matrix;
}

export function freeMatrix(...matrixList) {
    for(const matrix of matrixList) {
        const index = allocated.indexOf(matrix);
        console.log(index, "allocated",  allocated, "unallocated",  matrices);
        if(index == -1) throw 'Error - invalid matrix, not a part of matrix cache.';
        allocated.splice(index, 1);
        matrices.push(matrix);
    }
}

export function freeAll( ) {
    while(allocated.length > 0) freeMatrix(allocated[allocated.length - 1]);
}

export function getIdentityMatrix( ) {
    return glMatrix.mat4.identity(getMatrix( ));
}