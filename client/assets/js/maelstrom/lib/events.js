const GLOBAL_INPUT_EVENT = 'globalinputevent';


export function broadcastEvent(name, detail) {
    Maelstrom.dispatchEvent(new CustomEvent(name, {detail: detail}));
}

export {
    GLOBAL_INPUT_EVENT
}