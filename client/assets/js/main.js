import Camera from '../../Arachnid/arachnid_object/camera.js';
import '../maelstrom/maelstrom.js';
import { createSpriteDrawRequest, createTilemapDrawRequest } from '../maelstrom/utils.js';

window.onload = async event => {
    await Maelstrom.init(document.getElementById('gameview'));

    let test1 = new Maelstrom.Objects.Fred( );

    const tilemap = Maelstrom.Tilemap.getMap('Prototype');

    Maelstrom.Graphics.drawTilemap(tilemap, Maelstrom.Camera.projection( ));

    Maelstrom.Graphics.drawGameObject(test1, Maelstrom.Camera.projection( ));

    document.addEventListener('keydown', event => {
        const key = event.key.toLowerCase( );
        let draw = false;
        console.log(test1.rotation.y);
        if(key == 'arrowright') {
            test1.rotation.y = 0;
            test1.x += 5;
            draw = true;
        }
        if(key == 'arrowleft') {
            test1.rotation.y = -Math.PI / 2;
            test1.x -= 5;
            draw = true;
        }

        if(key == 'arrowdown') {
            test1.y += 5;
            draw = true;
        }

        if(key == 'arrowup') {
            test1.y -= 5; 
            draw = true;
        }

        if(draw) {
            Maelstrom.Graphics.drawTilemap(tilemap, Maelstrom.Camera.projection( ));
            Maelstrom.Graphics.drawGameObject(test1, Maelstrom.Camera.projection( ));
        }
    });

    const cam = new Camera(null, [1280, 360]);

}
