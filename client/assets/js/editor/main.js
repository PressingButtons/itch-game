import './$namespace.js';
import TileSelector from './tileselector.js';
import preload from './preload.js';
import Plotter from './plotter.js';

window.onload = async event => {
    Malestrom.view = document.getElementById('view');
    Malestrom.gl = Malestrom.view.getContext('webgl', {premultipliedAlpha: false});
    Malestrom.tilesize = 16;
    await preload( );
    TileSelector( );
    Plotter( );
}