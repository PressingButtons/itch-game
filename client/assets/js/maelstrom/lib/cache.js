import Graphics from './graphics.js';
const NUM_TEXTURES = 20
const openTex = []
const usedTex = [];
const map = { };

const assignTexture = async (texture, url) => {
    try {
        map[url] = texture;
        await texture.load(url);
        usedTex.push(texture);
        return texture;
    } catch (err) {
        throw err;
    }
}

//I FEEL THE OBTUSNESS 
const nextAvailable = ( ) => {
    if(openTex.length == 0) throw 'No open texture slots';
    return openTex.pop( ); 
}

const exportObject = {

    init: function( ) {
        while(openTex.length < 20) openTex.push(new Maelstrom.Graphics.GameTexture( ));
    },

    loadTexture: async function(url) {
        url = url.toLowerCase( );
        if(url == 'length') throw 'Invalid texture name [length]';
        if(map[url]) return map[url];
        return assignTexture(nextAvailable( ), url);
    },

    freeTexture: function(texture) {
        const index = usedTex.indexOf(texture);
        if(index == -1) throw 'Invalid texture, not a part of cache!';
        usedTex.splice(index, 1);
        openTex.push(texture);
        const url = texture.url.substring(texture.url.indexOf('assets/'));
        delete map[url];
        texture.clear( );
    },

    getTexture: function(name) {
        return map[name];
    },

    clearTextures: function( ) {
        while(usedTex.length > 0) {
            this.freeTexture(usedTex[usedTex.length - 1]);
        }
    },

    get unusedTextures( ) {
        return openTex.length;
    },

    get textureLength( ) {
        return NUM_TEXTURES;
    }

}


export default exportObject;