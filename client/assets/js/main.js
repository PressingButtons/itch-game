import './maelstrom/malestrom.js';

window.onload = async event => {
    await Maelstrom.init(document.getElementById('gameview'));

    const texture = await Maelstrom.Cache.loadTexture('characters/bo/bo.png');

    const sprite = new Maelstrom.Sprite(texture, 112, 122);

    const projection = Maelstrom.Camera.projection;

    Maelstrom.Graphics.drawSprite(sprite, 2, [200,100, 0], Maelstrom.Camera.projection);

    const loop = timestamp => {
        
    }

}
