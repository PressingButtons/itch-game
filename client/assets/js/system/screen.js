Malestrom.GameScreen = {
    get view ( ) {
        return document.getElementById('gameview')
    },

    get overlay( ) {
        return document.getElementById('overlay');
    }
};

Object.defineProperty(Malestrom, 'VIEW_PORT', {
    get( ) {
        return [0, 0, Malestrom.GameScreen.view.width, Malestrom.GameScreen.view.height];
    }
})

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