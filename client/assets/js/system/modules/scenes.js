import MainMenu from '../menus/mainmenu/mainmenu.js'

export {MainMenu};

let transition;

export function init( ) {
    transition = document.getElementById('overlay').querySelector('.transition');
}

export async function goto(scene) {
    await fade(0);
    //execute scene enterstate
    scene.enterState( ); 
    await fade(1);
}

function fade( direction = 0) {
    transition.addEventListener('animationend', event => onFadeComplete(resolve));
    return new Promise((resolve, reject) => {
        if(direction == 0) transition.classList.add('fadeOutWhite');
        else transition.classList.add('fadeInWhite');
    })
}

function onFadeComplete(resolve) {
    resolve( );
    console.log('fired');
    transition.removeEventListener('animationend');
}
