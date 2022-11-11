import State from "../Arachnid/arachnid_object/state.js";
import DataBuffer from "../Arachnid/arachnid_system/data_buffer.js";

const REQUIRED_BODY_DEFINITIONS = {
    position: [Int16Array, ['x', 'y', 'z']],
    velocity: [Float32Array, ['x', 'y', 'z']],
    size: [Uint16Array, ['width', 'height']]
}

export default class Rigid_Body {

    #hsm = new State('state_machine', this);
    #data = new DataBuffer( );

    constructor(details = { }) {
        this.#init(details);
        this.#hsm.setTransition('deactivate', new Inactive(this));
        this.#hsm.setTransition('activate', new Active(this));
        this.transition('deactivate');
    }

    get hsm( ) {
        return this.#hsm;
    }

    #init(details) {
        Object.assign(details, REQUIRED_BODY_DEFINITIONS);
        this.#data.configure(details);
        this.bindParameter('position', true);
        this.bindParameter('velocity', true);
        this.bindParameter('size', false);
    }

    addView(name, type, parameters, prefixed = false) {
        this.#data.addView(name, type, parameters);
        if(prefixed) prefixed = name;
        this.bindParameter(this.#data[name], prefixed);
        return this.#data.bytesUnallocated;
    }

    bindParameter(name, prefixed = false) {
        if(!this.#data.views[name]) return;
        if(prefixed) Object.defineProperty(this, name, {value: this.#data.views[name].components});
        else {
            const components = this.#data.views[name].components;
            let names = { };
            for(const property in components) {
                names[property] = property;
            }
            console.log(names);
        }
    }

    transition(signal) {
        this.#hsm.transition(signal);
    }

}

class Inactive extends State {

    constructor(src) {
        super('rigid_body_inactive', src);
    }

}

class Active extends State {

    constructor(src) {
        super('rigid_body_active', src);
    }

    #move(delta_time) {
        this.src.velocity.y += this.src.world.gravity * delta_time;
        this.src.position.x += this.src.velocity.x * delta_time;
        this.src.position.y += this.src.velocity.y * delta_time;
    }

    onUpdate(config) {
        this.#move(config.dt);
    }

}