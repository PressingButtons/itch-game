import GPController from "./gp_controller.js";
import KeyboardController from './keyboard_controller.js';

const gamepads = new Array(4).fill(0).map(x => new Arachnid.Gamepad);

const gp_controllers = new Array(4).fill(0).map((x, i) => new GPController(gamepads[i]));

const keys = Arachnid.Keyboard( );

const keyboard_controller = new KeyboardController(keys);

export function update(config) {
    poll(config.dt);
}

export function getGamepad(i) {
    return gp_controllers[i];
}

export function getKeyboard( ) {
    return keyboard_controller;
}

export function poll(dt) {
    let gps = navigator.getGamepads( );
    for(let i = 0; i < gps.length; i++) gamepads[i].read(gps[i]);
}
