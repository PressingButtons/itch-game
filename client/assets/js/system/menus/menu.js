export default class Menu extends Core.Objects.State {

    #option = 0;
    #options = new Map( );
    #html;

    constructor(name, parent = null, root = null) {
        super(name, parent, root);
        this.#setHTML( );
    }

    get title( ) {
        return this.#html.querySelector('header').innerHTML;
    }

    set title(n) {
        this.#html.querySelector('header').innerHTML = n;
    }

    get html( ) {
        return this.#html;
    }

    #broadcastSelection(value) {
        this.dispatchEvent(new CustomEvent('selection', {detail: value}));
    }

    #inputListener(event) {

    }

    #setHTML ( ) {
        this.#html = document.createElement('div');
        this.#html.classList.add('mainmenu', 'body');
        this.#html.innerHTML =  `<section class="container mainmenu"><header>Undefined</header><div class="options"> </div><footer></footer></section>`
    }

    
    init( ) {
        this.#setHTML( );
        this.bindEvent(Malestrom.Events.INPUT_KEY_EVENT, this.#inputListener.bind(this));
    }

    clear( ) {
        this.#html.querySelector('.options').innerHTML = '';
        this.#options.clear( );
    }

    enterState( ) {
        this.reset( );
    }

    exitState( ) {
        this.reset( );
    }

    setOptions(options) {
        this.clear( );
        for(const option in options) {
            const entry = document.createElement('p');
            entry.onclick = event => this.#broadcastSelection(option);
            entry.innerHTML = option;
            this.#html.querySelector('.options').appendChild(entry);
            this.#options.set(option, options[option]);
        }
    }

    reset( ) {
        this.#option = 0;
    }

}