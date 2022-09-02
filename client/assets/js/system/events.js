export function broadcastEvent(type, value, src) {
    Malestrom.dispatchEvent(new CustomEvent(
        type, { 
            detail: {
                src: src,
                value: value
            }
        }
    ));
}

export const GLOBAL_INPUT_EVENT = 'global_input_event',
             INPUT_DOWN = 'input_down',
             INPUT_UP = 'input_up',
             GAMEPAD_AXIS = 'gamepad_axis',
             MOUSE_EVENT = "mouse_event",
             GAMEPAD_CONNECTED = 'gamepad_connected',
             GAMEPAD_DISCONNECTED = 'gamepad_disconnected';
