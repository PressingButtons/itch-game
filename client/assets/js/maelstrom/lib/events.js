const GLOBAL_INPUT_EVENT = 'globalinputevent';
const GAMEPAD_CONNECTED = 'gamepadconnected';
const GAMEPAD_DISCONNECTED = 'gamepaddisconnected';
const MOUSE_EVENT = 'mouseevent'


export function broadcastEvent(name, value, source) {
    Maelstrom.dispatchEvent(new CustomEvent(name, {detail: {
        value: value,
        src: source
    }}));
}

export {
    GLOBAL_INPUT_EVENT,
    GAMEPAD_CONNECTED,
    GAMEPAD_DISCONNECTED,
    MOUSE_EVENT
}