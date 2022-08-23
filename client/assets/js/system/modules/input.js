let gamepads = { };
export const INPUT_KEYDOWN = 'input_keydown';

export function init( ) {
    setGamePad( );
    setMouseListeners( );
    setKeyListeners( );
}

//Gamepad 

//KEYBOARD 

function setKeyListeners( ) {
    document.addEventListener('keydown', onKeyboard);
    document.addEventListener('keyup', onKeyboard);
}

const onKeyboard = function(event) {
    Malestrom.dispatchEvent(
        new CustomEvent(INPUT_KEYDOWN, {
            detail: {
                key: event.key.toLowerCase( ),
                state: Number(event.type == 'keydown')
            }
        })
    )  
}


//MOUSE 

function setMouseListeners( ) {
    document.getElementById('overlay').addEventListener('mouseout', mouseListener);
    document.getElementById('overlay').addEventListener('mousemove', mouseListener);
    document.getElementById('overlay').addEventListener('mousedown', mouseListener);
    document.getElementById('overlay').addEventListener('mouseup', mouseListener);
}

function mouseListener(event) {
    let rect = event.target.getClientBoundingRect( );
    let pos = {x: event.clientX - rect.x, y: event.clientY - rect.y};
    onMouseEvent[event.type](pos);
}


const onMouseEvent = { };

onMouseEvent.mouseout = function(pos) {

}

onMouseEvent.mousemove = function(pos) {

}

onMouseEvent.mousedown = function(pos) {

}

onMouseEvent.mouseup = function(pos) {

}