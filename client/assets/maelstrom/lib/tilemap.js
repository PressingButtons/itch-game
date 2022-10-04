let tilemap_configs;

const createMapObject = config => {
    return {
        collision: null,
        map: {
            sprite: Maelstrom.SpriteLibrary.getSprite('tilemap'),
            id: config.id
        },
        tile: Maelstrom.Textures.getTexture('/assets/images/tiles.webp').texture,
        background: {
            repeat: config.background.pattern,
            texture: Maelstrom.Textures.getTexture('/assets/' + config.background.src)
        }
    }
}

export function init(config) {
    tilemap_configs = config;
}

export function getMap(name) {
    const config = tilemap_configs[name];
    if(!config) throw `Error - invalid map request [${name}]`;
    return createMapObject(config);a
}