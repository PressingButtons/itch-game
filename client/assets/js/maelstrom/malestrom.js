import Graphics from './lib/graphics.js';
import Camera from './objects/camera.js';
import Sprite from './objects/sprite.js';
import Cache from './lib/cache.js';
//import InputSystem from './lib/input.js';
import * as Assets from './lib/assets.js';
import * as Matrices from './lib/workmatrices.js';

Object.defineProperty(window, "Maelstrom", {
    value: new EventTarget( )
})

Object.defineProperties(Maelstrom, {
    Assets: {value: Assets},
    Cache: {value: Cache},
    Camera: {value: Camera},
    Graphics: { value: Graphics },
    Sprite: {value: Sprite},
    TILESIZE: {value: 16},
    init: {
        value: async function(canvas) {
            await Graphics.init(canvas);
            Cache.init( );
           // InputSystem( );
        }
    }
})

Object.assign(Maelstrom, Matrices);