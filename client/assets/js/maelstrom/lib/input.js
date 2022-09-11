const keyDowns = new Set( );

const mouseData = {
    buttons: new Set( ),
    position: {x: 0, y: 0}
}

const gamepads = {};

const KeyboardListener = event => {
    const key = event.key.toLowerCase( );
    const value = event.type == 'keydown';
    switch(key) {
        case "arrowup":    Maelstrom.Events.broadcastEvent(Maelstrom.Events.GLOBAL_INPUT_EVENT, {key: 'up', value: value}, 'keyboard'); break;
        case "arrowleft":  Maelstrom.Events.broadcastEvent(Maelstrom.Events.GLOBAL_INPUT_EVENT, {key: 'left', value: value}, 'keyboard'); break;
        case "arrowdown":  Maelstrom.Events.broadcastEvent(Maelstrom.Events.GLOBAL_INPUT_EVENT, {key: 'down', value: value}, 'keyboard'); break;
        case "arrowright": Maelstrom.Events.broadcastEvent(Maelstrom.Events.GLOBAL_INPUT_EVENT, {key: 'right', value: value}, 'keyboard'); break;
        case "enter":      Maelstrom.Events.broadcastEvent(Maelstrom.Events.GLOBAL_INPUT_EVENT, {key: 'confirm', value: value}, 'keyboard'); break;
        case "backspace":  Maelstrom.Events.broadcastEvent(Maelstrom.Events.GLOBAL_INPUT_EVENT, {key: 'cancel', value: value}, 'keyboard'); break;
        default: Maelstrom.Events.broadcastEvent(Maelstrom.Events.GLOBAL_INPUT_EVENT, {key: key, value: value}, 'keyboard'); break;
    }
    Maelstrom.Events.broadcastEvent(value ? Maelstrom.Events.INPUT_DOWN : Maelstrom.Events.INPUT_UP, key, 'keyboard');
    if(value) keyDowns.add(key);
    else keyDowns.delete(key);
}

const MouseListener = event => {
    const rect = event.target.getBoundingClientRect( );
    mouseData.position.x = event.clientX - rect.x;
    mouseData.position.y = event.clientY - rect.y;

    if(event.type == 'mousedown' || event.type == "mouseup") {
        const value = event.type == 'mousedown';
        switch(event.button) {
            case 0: Maelstrom.Events.broadcastEvent(Maelstrom.Events.GLOBAL_INPUT_EVENT, {key: 'confirm', value: value, position: mouseData.position}, 'mouse'); break;
            case 2: Maelstrom.Events.broadcastEvent(Maelstrom.Events.GLOBAL_INPUT_EVENT, {key: 'cancel', value: value, position: mouseData.position}, 'mouse'); break;
        }
        Maelstrom.Events.broadcastEvent(value ? Maelstrom.Events.INPUT_DOWN : Maelstrom.Events.INPUT_UP, {button: event.button, position: mouseData.position}, 'mouse');
        if(value) mouseData.buttons.add(event.button);
        else mouseData.buttons.delete(event.button);
    }
    else {
        Maelstrom.Events.broadcastEvent(Maelstrom.Events.MOUSE_EVENT, {type: event.type, position: mouseData.position}, 'mouse');
    }
}

const onGamepadConnected = event => {
    setGamepad(event.detail.value, event.detail.src);
}

const onGamepadDisconnected = event => {
    delete gamepads[event.detail.value];
}

const pollGamepads = dt => {
    const query = navigator.getGamepads( );
    try {

        for(let i = 0; i < 4; i++ ) {
            if(query[i] && !gamepads[i]) {
                Maelstrom.Events.broadcastEvent(Maelstrom.Events.GAMEPAD_CONNECTED, i, query[i]);
                continue;
            }
            else if(!query[i] && gamepads[i]) {
                Maelstrom.Events.broadcastEvent(Maelstrom.Events.GAMEPAD_DISCONNECTED, i, null);
                continue;
            }
            else if(query[i] && gamepads[i]) {
                //console.log('resolving', gamepads[i].buttons[0], query[i].buttons[0].value);
                resolvePad(gamepads[i], query[i]);
            }
            else continue;
        }
    } catch (err) {
        throw err;
    }
}

const resolvePad = (gamepad, source) => {
    resolveButtons(gamepad, source);
    resolveAxes(gamepad, source);
    //setGamepad(gamepad, source);
}

const resolveButtons = (gamepad, source) => {
    for(let i = 0; i < source.buttons.length; i++) {
        if(gamepad.buttons[i] == source.buttons[i].value) continue;
        const value = source.buttons[i].value > 0;
        Maelstrom.Events.broadcastEvent(Maelstrom.Events.GLOBAL_INPUT_EVENT, {name: 'button.' + i, value: value}, 'gamepad.' + source.index);     
        Maelstrom.Events.broadcastEvent(Maelstrom.Events.INPUT_DOWN, {name: 'button.' + i, value: value}, 'gamepad.' + source.index);     
        gamepad.buttons[i] = source.buttons[i].value;
    }
}

const resolveAxes = (gamepad, source) => {
    for(let i = 0; i < source.axes.length; i++) {
        if(gamepad.axes[i].value == source.axes[i]) continue;
        Maelstrom.Events.broadcastEvent(Maelstrom.Events.GAMEPAD_AXIS, source.axes[i], 'gamepad.' + source.index);
        gamepad.axes[i] = source.axes[i];
    }
}

const setGamepad = (index, source) => {
    gamepads[index] = {
        buttons: source.buttons.slice( ).map( x => x.value),
        axes: source.axes.slice( )
    }
}


export default function init( ) {
    document.addEventListener('keydown', KeyboardListener);
    document.addEventListener('keyup', KeyboardListener);
    Maelstrom.GameScreen.applyListeners(MouseListener);
    Maelstrom.addEventListener(Maelstrom.Events.GAMEPAD_CONNECTED, onGamepadConnected);
    Maelstrom.addEventListener(Maelstrom.Events.GAMEPAD_DISCONNECTED, onGamepadDisconnected);
    Maelstrom.run('pollgamepads', pollGamepads);
}
