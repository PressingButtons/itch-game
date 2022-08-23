import Screen from './modules/screen.js';
import * as Graphics from './modules/graphics.js';
import * as Methods from './methods/methods.js'
import MainMenu from './menus/mainmenu/mainmenu.js';


class GameSystem extends Core.Objects.State {

    constructor( ) {
        super('malestrom');
        Object.defineProperties(this, {
            //modules
            Graphics: {value: Graphics},
            Screen: {value: Screen},
           // Scenes: {value: Scenes},
            //methods
            Methods: {value: Methods},
            //constants
            VIEW_PORT: {value: [0, 0, 1280, 720]},
            TILESIZE: {value: 16}
        })
        this.addTransition(
            {name: 'main', state: MainMenu }
        );

        this.setCurrent(this.getState('mainmenu'));
    }

}

Object.defineProperty(window, "Malestrom", {value: new GameSystem}); //game namespace 

