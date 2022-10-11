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
        if(key == 'arrowright') {
            test1.x += 5; draw = true;
        }
        if(key == 'arrowleft') {
            test1.x -= 5; draw = true;
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

    /*

    const texture = await Maelstrom.Cache.loadTexture('characters/bo/bo.png');

    Maelstrom.Tilemap.setMap("Prototype");

    Maelstrom.Graphics.clear([0.5, 0.5, 0.5, 1.0])

    Maelstrom.Graphics.drawTilemap(Maelstrom.Camera.projection);

    Maelstrom.addEventListener(Maelstrom.Events.GLOBAL_INPUT_EVENT, onInput);

}

function onInput(event) {
    if(!event.detail.value.value) return;
    const key = event.detail.value.key;
    if(key == 'right') Maelstrom.Camera.x -= 5;
    if(key == 'left') Maelstrom.Camera.x += 5;
    if(key == 'up') Maelstrom.Camera.y += 5;43
    if(key == 'down') Maelstrom.Camera.y -= 5;
    Maelstrom.Graphics.clear([0.5, 0.5, 0.5, 1.0])
    Maelstrom.Graphics.drawTilemap(Maelstrom.Camera.projection);
}

*/

}