const CLOSE_ICON = '&#x25CF';
const OPEN_ICON = '&cir;';

export default class Folder {

    #name;
    #body;
    #entries = new Map( );

    constructor(name) {
        this.#init( );
        this.name = name;
    }

    get name( ) {
        return this.#body.querySelector('header .name').innerHTML;
    }

    set name(n) {
        this.#body.querySelector('header .name').innerHTML = n;
    }

    get content( ) {
        return this.#body.querySelector('ul');
    }

    #init( ) {
        this.#body = document.createElement('div');
        this.#body.classList.add('folder');
        this.#body.innerHTML = `<header class="flex"><p class='icon'></p><p class='name'></p></header><ul></ul>`
        this.#body.querySelector('header').onclick = this.#onToggle.bind(this);
        this.close( );
    }

    #onSelectItem(entry) {
        document.dispatchEvent(new CustomEvent('folder_item_selected', {
            detail: {
                folder: this.name,
                entry: entry
            }
        }));
    }

    #onToggle(event) {
        if(this.content.classList.contains('open')) this.close( );
        else this.open( );
    }

    anchor(queryOrElement) {
        if(typeof queryOrElement == 'string')
            document.querySelector(queryOrElement).appendChild(this.#body);
        else
            queryOrElement.appendChild(this.#body);
    }

    close( ) {
        this.#body.querySelector('header .icon').innerHTML = CLOSE_ICON;
        this.content.classList.remove('open');
    }

    open( ) {
        this.#body.querySelector('header .icon').innerHTML = OPEN_ICON;
        this.content.classList.add('open');
    }

    addItem(key, object) {
        const entry = {html: document.createElement('li'), object: object};
        this.#entries.set(key, entry);
        this.content.appendChild(entry.html);
        entry.html.innerHTML = key;
        entry.html.onclick = event => this.#onSelectItem(entry);
    }

}