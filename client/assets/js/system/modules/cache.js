const static_cache = new Map( );

const dynamic_cache = new Map( );

export async function preload(data) {
    for(const key in data) loadItem(key, data[key], static_cache);
}

async function loadItem(key, src, cache) {
    if(src.type == 'image') cache.set(key, await Malestrom.Methods.loadImageFromURL(src.url, true));
}

//
// Either from blob or from localStorage
export async function loadCustomMaps(src) {
    if(src instanceof Blob) dynamic_cache.set('custom_maps', await Malestrom.Methods.loadImageFromBlob(src, true));
    else dynamic_cache.set('custom_maps', await Malestrom.Methods.loadImageFromURL(window.localStorage.getItem('malestrom-custom-maps')));
}
