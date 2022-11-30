const runList = new Set( );

let run_id, 
    run_flag = false, 
    last_step;

const loop = timestamp => {
    if(!last_step) last_step = timestamp;
    const dt = timestamp - last_step;
    updateMethods(dt);
    last_step = timestamp;
    if(run_flag) run_id = requestAnimationFrame(loop);
}

const updateMethods = dt => {
    const it = runList.values( );
    for(const method of it) method(dt);
}

export function add(func) {
    runList.add(func);
}

export function remove(func) {
    runList.delete(func);
}

export function run( ) {
    run_flag = true;
    run_id = requestAnimationFrame(loop);
}

export function stop( ) {
    run_flag = false;
    last_step = null;
    cancelAnimationFrame(run_id);
}