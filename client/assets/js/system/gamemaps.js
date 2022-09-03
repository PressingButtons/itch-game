import GameTexture from "./gametexture";
import { loadJSON } from "./loaders";

let mapTexture = new GameTexture( ), tileTexture = new GameTexture( );
let mapConfig;
let buffer;

export async function init(gl) {
    const data = await loadJSON('/assets/stage/data.json');
    mapConfig = data.mapData;
    await mapTexture.loadFromURL(data.mapURL);
    await tileTexture.loadFromURL('/assets/stage/tiles.webp');
    parseMap(m)
}

export function getMap( ) {
    return mapTexture;
}

export function getTiles( ) {
    return tileTexture
}

export function getTile(mapID, _x, _y) {
    const x = mapID * mapConfig.columns + _x;
    const y = _y;
    const pixel = mapTexture.src.getContext('2d').getImageData(x, y, 1, 1);

}