const cache = new Arachnid.Cache( );
const textures = { };
const sprites = { };

const loadTexture = async (gl, key, url) => {
    const texture = new Arachnid.Texture(gl);
    await texture.load(url);
    textures[key] = cache.setItem(texture);
}

const loadTextures = async(gl, config) => {
    for(const key in config) await loadTexture(gl, key, config[key]);
}

const loadSprite = async (gl, key, config) => {
    const sprite = new Arachnid.SpriteGroup(gl);
    await sprite.load(config.texture, config.width, config.height);
    sprites[key] = cache.setItem(sprite);
}

const loadSprites = async (gl, config) => {
    for(const key in config) await loadSprite(gl, key, config[key])
}

export async function preload(gl, config) {
    await loadTextures(gl, config.textures);
    await loadSprites(gl, config.sprites);
    return {
        textures: Object.keys(textures),
        sprites: Object.keys(sprites)
    }
}

export function getTexture(name) {
    return cache.getItem(textures[name]);
}

export function getSprite(name) {
    return cache.getItem(sprites[name]);
}