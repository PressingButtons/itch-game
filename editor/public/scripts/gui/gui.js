import * as Methods from './methods.js';

const init = data => {
    for(const key in data) {
        if(data.key == 'textures')
            Methods.setFolders(key, Maelstrom.Cache.getTextures);
        else 
            Methods.setFolders(key, data[key]);
    }
}

window.GUI = {
    init: init,
    Folders: new Map( ),
    Methods: Methods
}
