import preload from "./preload.js";
import '/assets/js/maelstrom/maelstrom.js';
import './gui/gui.js';

window.onload = async event => {
    await Maelstrom.init(document.createElement('canvas'));
    const data = await preload( );
    GUI.init(data);
}