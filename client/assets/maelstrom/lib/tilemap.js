let tilemap_configs;

const createMapObject = {
    
}

export function init(config) {
    tilemap_configs = config;
}

export function getMap(name) {
    const config = tilemap_configs[name];
    if(!config) throw `Error - invalid map request [${name}]`;
    return  createMapObject(config);
}