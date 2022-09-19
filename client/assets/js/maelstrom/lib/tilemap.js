const MAP_COLUMNS = 80;
const MAP_ROWS = 45;
const TILESIZE = 16;
const LAYER_SIZE = [MAP_COLUMNS * TILESIZE, MAP_ROWS * TILESIZE, 1];

let mapTexture;
let skyTexture;
let tileTexture;

const layers = new Float32Array(6);

let crop, currentMap = 0;

const getHex = number => {
    return ('' + parseInt(number, 16)).padStart(2, '0');
}

const getTiles = data => {
    const collisionMap = { };
    for(let i = 0; i < data.length; i += 4) {
        if(data[i + 3] == 0) continue;  
        const value = getValue(data.subarray(i, i + 2));
        const column = (i / 4) % MAP_COLUMNS;
        const row = Math.floor((i / 4) / MAP_COLUMNS);
        if(!collisionMap[row]) collisionMap[row] = { };
        collisionMap[row][column] = value;
    }

    return collisionMap;
}

const getValue = data => {
    const row = getHex(data[0]);
    const col = getHex(data[1]);
    return row + col;
}

const setCollisionMap = i => {
    const data = mapTexture.canvas.getContext('2d').getImageData(i * MAP_COLUMNS, 0, MAP_COLUMNS, MAP_ROWS).data;
    return getTiles(data);
}

/*
 Exports 
*/

export async function init( ) {
    mapTexture = await Maelstrom.Cache.loadTexture('stages/maps.webp');
    tileTexture = await Maelstrom.Cache.loadTexture('stages/tiles.webp');
    crop = new Maelstrom.Sprite(mapTexture, MAP_COLUMNS, MAP_ROWS);
}

export function getCollisionMap( ) {
    return collisionMap;
}

export function getLayerMatrix(i) {
    return {
        u_texMatrix: crop.getCellMatrix(i, currentMap),
        u_transform: glMatrix.mat4.fromRotationTranslationScale(Maelstrom.getMatrix( ), [0, 0, 0, 0], layers.subarray(i * 3, i * 3 + 3), LAYER_SIZE)
    }    
}

export function getTextures( ) {
    return {map: mapTexture, tile: tileTexture};
}


export function moveLayer(i, movement) {
    layers.set(movement, i * 3);
}


export function setMap(i, s) {
    currentMap = i;
    layers.set([0, 0, 0, 0, 0, 0]);
    setCollisionMap(i);
}

