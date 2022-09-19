import './maelstrom/malestrom.js';

window.onload = async event => {
    await Maelstrom.init(document.getElementById('gameview'));

    const texture = await Maelstrom.Cache.loadTexture('characters/bo/bo.png');

    Maelstrom.Tilemap.setMap(0);

    Maelstrom.Graphics.clear([0.5, 0.5, 0.5, 1.0])

    Maelstrom.Graphics.drawTilemap(Maelstrom.Camera.projection);

}
