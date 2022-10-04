import Sprite from '../objects/sprite.js';

export default async function loadConfig( ) {
    const config = await fetch('/assets/js/maelstrom/config.json').then(res => res.json( ));
    for(const url of config.textures) await Maelstrom.Cache.loadTexture(url);
    Maelstrom.Constants = config.Constants;
    allocateSprites(config.GameSprites);
    Maelstrom.Tilemap.init(config.tilemaps);

}

function allocateSprites(spriteData) {

    Maelstrom.SpriteLibrary = new Map( );

    for(const key in spriteData) {
        const data = spriteData[key];
        const texture = Maelstrom.Cache.getTexture(data.src);
        const sprite = new Sprite(texture, data.w, data.h, ...data.crop );
        Maelstrom.SpriteLibrary.set(key, sprite);
    }

}