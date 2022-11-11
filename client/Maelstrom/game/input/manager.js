import Gamepad from "../../../Arachnid/input/gamepad.js";
import GPController from "./gp_controller.js";

const gamepads = new Array(4).fill(0).map(x => new Gamepad);

const gp_controllers = new Array(4).fill(0).map((x, i) => new GPController(gamepads[i]));

export function update(config) {
    poll(config.dt);
}

export function getGamepad(i) {
    return gp_controllers[i];
}

const poll = dt => {
    let gps = navigator.getGamepads( );
    for(let i = 0; i < gps.length; i++) gamepads[i].read(gps[i]);
}