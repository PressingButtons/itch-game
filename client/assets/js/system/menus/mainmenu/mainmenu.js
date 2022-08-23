import Menu from '../menu.js';
import * as Screens from './screens.js';

export default class MainMenu extends Menu {

    constructor( ) {
        super('mainmenu');
        this.addTransition(
            {name: 'main', state: Screens.S1}
         );
    }

    #onSelection(event) {

    }

    enterState( ) {
        this.reset( );
        this.setCurrent(this.getState('main-menu'));
        document.getElementById('overlay').querySelector('.content').appendChild(this.html);
        this.bindEvent('selection', this.#onSelection.bind(this));
    }

}
