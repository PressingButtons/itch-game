export default class State extends EventTarget {
    
    #parent = null;
    #states = { };
    #substate;
    #transitions = { };

    constructor(name, parent) {
        super( );
        this.name = name;
        if(parent) this.setParent(parent);
    }

    #appendStatePackage(pkg) {
        pkg.map += '.' + this.name;
        pkg.state = this;
    }

    //

    addState(state) {
        this.#states[state.name] = state;
        state.setParent(this);
    }

    addTransition(name, state) {
        let self = this;
        this.#transitions[name] = event => this.switchState(state, event.detail);
        this.addEventListener(name, transition[name]);
        if(!this.states[state.name]) this.addState(state);
    }

    breakTransition(name) {
        this.removeEventListener(name, this.#transitions[name]);
        delete this.#transitions[name];
    }

    currentState(pkg) {
        if(!pkg) pkg = {map: this.name, state: this};
        else this.#appendStatePackage(pkg);
        if(!this.#substate) return pkg;
        else return this.#substate.currentState(pkg);
    }

    setParent(state) {
        if(!state instanceof State) throw 'Error - invalid object can not become parent of state ' + this.name;
        this.#parent = state;
    }

    signal(eventname, detail = { }) {
        this.dispatchEvent(new CustomEvent(eventname, {detail: detail}));
    }

    switchState(state, detail) {
        if(!this.#states[state.name]) throw 'Error - state not defined to instance.';
        if(this.#substate) this.#substate.exitState( );
        state.enterState(detail);
        this.#substate = state;
    }

    ///
    onUpdate(data) {

    }

    update(data) {
        this.onUpdate(data); //update self
        if(this.#substate) this.#substate.update(data); //update substate
    }

}