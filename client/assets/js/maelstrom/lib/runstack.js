const stack = new Map( );
let lastStep;
let id = 0;

const loop = timestamp => {
    if(!lastStep) lastStep = timestamp;
    const dt = timestamp - step;
    for(const entry of stack.values( )) {
        try {
            entry(dt);
        } catch(err) {
            Maelstrom.stopAll( );
            console.error(err);
            throw 'Error-RunStack: halting run';
        }
    }
    step = timestamp;
    id = window.requestAnimationFrame(loop);
}

Object.defineProperties(Maelstrom, {

    play: {
        resume: function( ) {
            id = window.requestAnimationFrame(loop);
        }
    }

    run: {
        value: function(name, func) {
            stack.set(name, func);
        }
    },

    stop: {
        value: function(name) {
            stack.delete(name);
        }
    },

    stopAll: {
        value: function( ) {
            window.cancelAnimationFrame(id);
            lastStep = null;
        }
    },

})
