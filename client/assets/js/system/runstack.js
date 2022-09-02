const stack = new Map( );
let id = 0;
let step;

const loop = timestamp => {
    if(!step) step = timestamp;
    const dt = timestamp - step;
    for(const entry of stack.values( )) {
        try {
            entry(dt);
        } catch(err) {
            stopAll( );
            console.error(err);
            throw 'Error-RunStack: halting run';
        }
    }
    step = timestamp;
    id = window.requestAnimationFrame(loop);
}

export function run(name, func) {
    stack.set(name, func);
}

export function stop(name) {
    stack.delete(name);
}

export function stopAll( ) {
    window.cancelAnimationFrame(id);
}

export function resume( ) {
   id =  window.requestAnimationFrame(loop);
}