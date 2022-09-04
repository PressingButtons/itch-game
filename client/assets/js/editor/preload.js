import GameTexture from "../system/gametexture.js";

export default async function preload( ) {
    Malestrom.tileTexture = new GameTexture(document.getElementById('tileset'));
    await Malestrom.tileTexture.loadFromFetch('/assets/stages/tiles.webp');
    const base = document.createElement('canvas');
    base.width = 80;
    base.height = 120;
    Malestrom.mapTexture = new GameTexture(base);
}
