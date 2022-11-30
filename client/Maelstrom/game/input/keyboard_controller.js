export default class KeyboardController extends Arachnid.State {

    static DEFAULT_LAYOUT = {
        up: ["w", "arrowup"],
        down: ["s", "arrowdown"],
        left: ["a", "arrowleft"],
        right: ["d", "arrowright"],
    }

    #keys;
    #config;

    constructor(keys, config) {
        super('keyboard_controller');
        this.#keys = keys;
        this.setConfig(config)
    }

    #checkKey(key) {
        for(const param of this.#config[key]) {
            if(this.#keys.values[param]) return true;
        }
        return false;
    }

    get Up( ) {return this.#checkKey('up')}    
    get Down( ) {return this.#checkKey('down')}    
    get Left( ) {return this.#checkKey('left')}    
    get Right( ) {return this.#checkKey('right')}    

    setConfig(config) {
        if(config) this.#config = config;
        else this.#config = KeyboardController.DEFAULT_LAYOUT;
    }

}