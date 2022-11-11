let logger_id;
let updater;

export function init(_updater) {
    updater = _updater
}

export function activateLog( ) {
    document.getElementById('debug').classList.add('show');
    logger_id = updater.add(debugLog);
}

export function deactivateLog( ) {
    document.getElementById('debug').classList.remove('show');
    updater.remove(logger_id);
}


const debugLog = ( ) => {
    document.querySelector('#debug > p.fps span').innerHTML = updater.average_frames_per_second;
}