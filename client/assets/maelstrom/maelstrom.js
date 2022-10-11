import * as Graphics from './lib/graphics.js';
import * as Textures from './lib/textures.js';
import * as Tilemap from './lib/tilemap.js'
import * as SpriteLibrary from './lib/sprite_library.js';
import * as Matrix from './lib/matrix_repo.js';
import * as Camera from './lib/camera.js'
import * as Objects from './objects/objects.js';
import preload from './lib/preload.js';
import GameObject from './lib/gameobject.js';

window.Maelstrom = {
    Graphics: Graphics,
    Textures: Textures,
    Tilemap: Tilemap,
    Matrix: Matrix,
    Camera: Camera,
    SpriteLibrary: SpriteLibrary,
    GameObject: GameObject,
    Objects: Objects
}

Maelstrom.init = async function(canvas) {
    Maelstrom.gl = canvas.getContext('webgl', {preMultipliedAlpha: false});
    Maelstrom.Graphics.init( );
    await preload( );
}