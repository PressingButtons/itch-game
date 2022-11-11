import Texture from "../../Arachnid/arachnid_object/texture.js";
import Cache from "../../Arachnid/arachnid_system/cache.js";

const cache = new Cache( );
const keys = { };
let gl;

export function init(_gl) {
    gl = _gl;
    return preload( );
}

export async function loadTexture(url) {
    const name = url.substring(url.lastIndexOf('/') + 1).split('.')[0];
    let texture = new Texture(gl);
    let type = await texture.load(url);
    //console.log(type);
    keys[name] = cache.setItem(texture);
}

export async function preload( ) {
    let directory = await load_texture_directory( );
    for(const entry of directory) await loadTexture(entry.href);
}

export function getTexture(id) {
    return cache.getItem(id);
}

export function getTextureId(name) {
    return keys[name];
}

export function getTextureByName(name) {
    return cache.getItem(keys[name]);
}

async function load_texture_directory( ) {
    return await fetch('/assets/images')
    .then(res => res.text())
    .then(html_text => {
        let div = document.createElement('div');
        div.innerHTML = html_text;
        return [...div.querySelectorAll('a.file.webp')];
    });
}