import './maelstrom/malestrom.js';

window.onload = async event => {
    await Maelstrom.init(document.getElementById('gameview'));

    const texture = await Maelstrom.Cache.loadTexture('characters/bo/bo.png');

    const sprite = new Maelstrom.Sprite(texture, 112, 122);

    const projection = Maelstrom.Camera.projection;

    let x = 0, y = 0, z = 0, i = 0;

    Maelstrom.Graphics.drawSprite(sprite, i, [x, y, z], Maelstrom.Camera.projection);

    Maelstrom.listenFor('m', Maelstrom.Events.GAMEPAD_CONNECTED, event => {
        console.log('gamepad connected', event.detail);
    })

    Maelstrom.listenFor('main_input', Maelstrom.Events.GLOBAL_INPUT_EVENT, event => {
        const key = event.detail.value.name
        if(event.detail.value.value) {
            if(key == 'button.15') x += 20;
            if(key == 'button.14') x -= 20;
            if(key == 'button.12') y -= 20;
            if(key == 'button.13') y += 20;
            if(key == 'left' && i > 0) i --;
            if(key == 'right' && i < 6) i ++;
            Maelstrom.Graphics.drawSprite(sprite, i, [x, y, z], Maelstrom.Camera.projection);
        }  

    })

}
