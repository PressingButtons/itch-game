Malestrom.GameScreen = {
    get view ( ) {
        return document.getElementById('gameview')
    },

    get overlay( ) {
        return document.getElementById('overlay');
    }
};

Malestrom.GameScreen.applyListeners = func => {

    const view = Malestrom.GameScreen.overlay;
    view.addEventListener('contextmenu', onContext);
    view.addEventListener('mousedown', func);
    view.addEventListener('mousemove', func);
    view.addEventListener('mouseup', func);
    view.addEventListener('mouseout', func);

}

function onContext(event) {
    event.preventDefault( );
}