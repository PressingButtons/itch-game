import '../maelstrom/maelstrom.js';
import { createSpriteDrawRequest, createTilemapDrawRequest } from '../maelstrom/utils.js';

window.onload = async event => {
    await Maelstrom.init(document.getElementById('gameview'));

    const sprite = Maelstrom.SpriteLibrary.getSprite('fred');

    const tilemap = Maelstrom.Tilemap.getMap('Prototype');

    Maelstrom.Graphics.drawTilemap(tilemap, Maelstrom.Camera.projection( ));

    const data = createSpriteDrawRequest(sprite, 0, 0, 16, 16, 0, Maelstrom.Camera.projection( ), [2, 1, 1, 1])

    Maelstrom.Graphics.drawTexture(data);

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