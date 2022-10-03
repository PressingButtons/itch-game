export default async function preload( ) {
    const data = await fetch('/assets/data.json').then(result => result.json( ));
    await loadTextures(data.textures);
    return data;
}

const loadTextures = async (textureURLs) => {
    for(const url of textureURLs) {
      await Maelstrom.Cache.loadTexture(url);  
    }
}