export function init( ) {
    GameSystem.Screen.init(document.getElementById('gameview'));
    GameSystem.Graphics.init(GameSystem.Screen.gl);   
}