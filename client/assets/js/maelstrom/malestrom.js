import Graphics from './lib/graphics.js';
import Camera from './objects/camera.js';
import Sprite from './objects/sprite.js';
import Cache from './lib/cache.js';
import EventListener from './objects/eventlistener.js';
import defineRunstack from './lib/runstack.js';
import InputSystem from './lib/input.js';
import * as Assets from './lib/assets.js';
import * as Matrices from './lib/workmatrices.js';
import * as Events from './lib/events.js'

Object.defineProperty(window, "Maelstrom", {
    value: new EventListener( )
})

Object.defineProperties(Maelstrom, {
    Assets: {value: Assets},
    Cache: {value: Cache},
    Camera: {value: Camera},
    Graphics: { value: Graphics },
    Sprite: {value: Sprite},
    Events: {value: Events},
    TILESIZE: {value: 16},
    init: {
        value: async function(canvas) {
            await Graphics.init(canvas);
            Cache.init( );
            Maelstrom.gameContainer = new EventListener(document.querySelector('.game'));
            defineRunstack( );
            InputSystem(Maelstrom.gameContainer);
            Maelstrom.play( );
        }
    }
})

Object.assign(Maelstrom, Matrices);