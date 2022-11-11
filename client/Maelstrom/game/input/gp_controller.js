import State from "../../../Arachnid/arachnid_object/state.js";

export default class GPController extends State {

    static DEFAULT_LAYOUT = {
        up: 12,
        down: 13,
        left: 14,
        right: 15,
        left_deadzone: 0.4
    }

    #src;
    #config;

    constructor(src, config) {
        super('gamepad_controller');
        this.setGamepad(src);
        this.setConfig(config);
    }

    get Up( ) {
        return (this.#src.buttons[this.#config.up].value > this.#config.left_deadzone || this.#src.axes[1] < -this.#config.left_deadzone);
    }

    get Down( ) {
        return (this.#src.buttons[this.#config.down].value > this.#config.left_deadzone || this.#src.axes[1] > this.#config.left_deadzone);
    }

    get Left( ) {
        return (this.#src.buttons[this.#config.left].value > this.#config.left_deadzone || this.#src.axes[0] < -this.#config.left_deadzone);
    }

    get Right( ) {
        return (this.#src.buttons[this.#config.right].value > this.#config.left_deadzone|| this.#src.axes[0] > this.#config.left_deadzone);

    }


    setConfig(config) {
        if(config) this.#config = config;
        else this.#config = GPController.DEFAULT_LAYOUT;
    }

    setGamepad(src) {
        this.#src = src;
    }

}