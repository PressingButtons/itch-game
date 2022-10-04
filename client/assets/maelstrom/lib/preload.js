const handleConfig = async config => {
    Maelstrom.Constants = config.Constants;
    Maelstrom.Tilemap.init(config.tilemaps);
    await loadTextures(config.textures);
    Maelstrom.SpriteLibrary.init(config.sprites);
}

const loadTextures = async textureList => {
    for(const url of textureList) {
        await Maelstrom.Textures.loadTexture('/assets/' + url);
    }
}

export default function preload( ) {
    return fetch('/assets/maelstrom/config.json').then(res => res.json( )).then(handleConfig);
}
