import Screen from './modules/screen.js';
import Camera from './objects/camera.js';
import * as Graphics from './modules/graphics.js';
import * as Methods from './methods/methods.js'
import * as Scenes from './scenes/scenes.js';
import * as Cache from './modules/cache.js';

class GameSystem extends Core.Objects.State {

    constructor( ) {
        super('malestrom');
        Object.defineProperties(this, {
            //objects 
            Camera : {value: Camera},
            //modules
            Graphics: {value: Graphics},
            Screen: {value: Screen},
            Cache: {value: Cache},
            //methods
            Methods: {value: Methods},
            //constants
            VIEW_PORT: {value: [0, 0, 1280, 720]},
            TILESIZE: {value: 16}
        })
        this.addTransition(
            {name: 'arena', state: Scenes.Arena}
        );

        this.setCurrent(this.getState('arena'));
    }

}

Object.defineProperty(window, "Malestrom", {value: new GameSystem}); //game namespace 

