import Sprite from '../../Arachnid/arachnid_object/sprite.js';
import * as textures from './texture_cache.js';

const sprites = new Map( );

export async function preload(gl) {
   await textures.init(gl);
   createSprites( );
}

export function getSprite(key) {
    return sprites.get(key);
}

export function getTexture(id) {
    if(!isNaN(id)) return textures.getTexture(id)
    else return textures.getTextureByName(id);
}

export function getTextureId(name) {
    return textures.getTextureId(name);
}

/* internal methods */
const createSprite = (name, width, height, rect) => {
    const texture = textures.getTextureByName(name);
    const sprite = new Sprite(texture, width, height, rect);
    sprites.set(name, sprite);
}

const createSprites = ( ) => {
    createSprite('fred', 96, 96, {x: 0, y: 0, width: 96, height: 96});
    createSprite('vivian', 96, 96);
}
