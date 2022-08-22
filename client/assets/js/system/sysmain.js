import Screen from './modules/screen.js';
import * as Graphics from './modules/graphics.js';
import * as Methods from './methods/methods.js'

Object.defineProperty(window, "GameSystem", {value: {}}); //game namespace 

Object.defineProperties(GameSystem, {
    //modules
    Screen: {value: Screen},
    Graphics: {value: Graphics},
    //methods
    Methods: {value: Methods},
    //constants
    VIEW_PORT: {value: [0, 0, 1280, 720]},
    TILESIZE: {value: 16}
})