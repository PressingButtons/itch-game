const MAP_COLUMNS = 80;
const MAP_ROWS = 45;
const TILESIZE = 16;
const LAYER_SIZE = [MAP_COLUMNS * TILESIZE, MAP_ROWS * TILESIZE, 1];

let skyTexture;
let tileTexture;

let currentMap;

let config;
let mapSprite;

const layers = new Float32Array(6);



/*
 Exports 
*/

export async function init(data) {
    config = data;
    mapSprite = Maelstrom.SpriteLibrary.get('tilemap');
    tileTexture = Maelstrom.Cache.getTexture('images/tiles.webp');
}


export function getLayerMatrix(i) {
    return {
        u_texMatrix: mapSprite.getCellMatrix(i, currentMap),
        u_transform: glMatrix.mat4.fromRotationTranslationScale(Maelstrom.getMatrix( ), [0, 0, 0, 0], layers.subarray(i * 3, i * 3 + 3), LAYER_SIZE)
    }    
}

export function getTextures( ) {
    return {map: mapSprite.texture, tile: tileTexture};
}


export function moveLayer(i, movement) {
    layers.set(movement, i * 3);
}


export function setMap(name) {
    currentMap = config[name].id;
}

export function draw(camera) {

}
