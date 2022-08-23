export async function init( ) {
    Malestrom.Screen.init(document.getElementById('gameview'));
    Malestrom.Graphics.init(Malestrom.Screen.gl);   
}