const allocated = [];
const unallocated = new Array(5).fill(0).map(x => new Float32Array(16));

const nextMatrix = ( ) => {
    allocated.push(unallocated.pop( ));
    return allocated[allocated.length - 1];
}

export function getMatrix( identity = false) {
    if(unallocated.length > 0) {
        if(!identity) return nextMatrix( );
        else return glMatrix.mat4.identity(nextMatrix( ));
    }
    else {
        console.trace( );
        throw 'Error - there are no open matrices for operation';
    }
}

export function release( ) {
    while(allocated.length > 0) unallocated.push(allocated.pop( ));
}

export function releaseMatrix(matrix) {
    const index = allocated.indexOf(matrix);
    if(index < 0) return;
    allocated.splice(index, 1);
    unallocated.push(matrix); 
}

export function releaseMatrices(object) {
    for(const key in object) releaseMatrix(object[key]);
}
