import Screen from './modules/screen.js';


Object.defineProperty(window, "GameSystem", {value: {}}); //game namespace 

Object.defineProperties(System, [
    Screen: {value: Screen},
    //constants
    VIEW_PORT: {value: [0, 0, 1280, 720]},
    TILESIZE: {value: 16}
])