export INPUT_KEY_EVENT = 'input_event';


export function dispatchInputEvent(key, down = false) {
    Malestrom.dispatchEvent(
        new CustomEvent(INPUT_EVENT, {
            detail : {key: key, down: down}
        }
    );
}
