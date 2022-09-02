export async function init( ) {
    Malestrom.Screen.init(document.getElementById('gameview'));
    Malestrom.Graphics.init(Malestrom.Screen.gl);   
    setConfig(await Malestrom.Methods.loadJSON('/config/init.json'));
}

function setConfig(config) {
    Object.defineProperty(Malestrom, 'Properties', {value: config.properties});
    Malestrom.Cache.preload(config.preload);

}