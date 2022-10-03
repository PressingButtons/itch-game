import './maelstrom/maelstrom.js';

window.onload = async event => {
    await Maelstrom.init(document.getElementById('gameview'));

    const texture = await Maelstrom.Cache.loadTexture('characters/bo/bo.png');

    Maelstrom.Tilemap.setMap(0);

    Maelstrom.Graphics.clear([0.5, 0.5, 0.5, 1.0])

    Maelstrom.Graphics.drawTilemap(Maelstrom.Camera.projection);

    Maelstrom.addEventListener(Maelstrom.Events.GLOBAL_INPUT_EVENT, onInput);

}

function onInput(event) {
    if(!event.detail.value.value) return;
    const key = event.detail.value.key;
    if(key == 'right') Maelstrom.Camera.x -= 5;
    if(key == 'left') Maelstrom.Camera.x += 5;
    if(key == 'up') Maelstrom.Camera.y += 5;
    if(key == 'down') Maelstrom.Camera.y -= 5;
    Maelstrom.Graphics.clear([0.5, 0.5, 0.5, 1.0])
    Maelstrom.Graphics.drawTilemap(Maelstrom.Camera.projection);
}
