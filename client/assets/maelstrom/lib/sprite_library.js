import Sprite from "./sprite.js";

const spriteLibrary = new Map( );

const setSprite = (key, data) => {
    const sprite = new Sprite( );
    const texture = Maelstrom.Textures.getTexture('/assets/' + data.src);
    sprite.setTexture(texture, data.w, data.h, ...data.crop);
    spriteLibrary.set(key, sprite);
}

export function init(spriteData) {
    for(var key in spriteData) setSprite(key, spriteData[key]);
}

export function getSprite(key) {
    return spriteLibrary.get(key);
}