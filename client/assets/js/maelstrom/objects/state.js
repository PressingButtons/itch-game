export default class State extends EventTarget {

    #currentState;
    #name;
    #states = new Map( );
    #transitions = new Map( );

    constructor(name) {
        this.#name = name;
    }

    get name( ) {
        return this.#name;
    }

    get states( ) {
        return this.#states.keys( );
    }

    get transitions( ) {
        return this.#transitions.keys( );
    }

    addState(state) {
        this.#states.set(state.name);
    }

    enterState(options) {
    }

    exitState(options) {

    }

    onUpdate( ) {

    }

    setState(name, options) {
        if(!this.#states.has(name)) throw `Error - State[${this.name}] does not have substate[${name}].`;
        this.#currentState = this.#states.get(name);
        this.#currentState.enterState(options);
        this.#currentState.parent = this;
    }

    setTransistion(name, state, options = null) {
        if(!this.#states.has(state.name)) this.addState(state);
        this.#transitions.set(name, {state: state, options: options});
    }

    switchState(name) {
        const next = this.#transitions.get(name);
        if(!next) return;
        if(this.#currentState) this.#currentState.exitState( );
        this.setState(next.state, next.options);
    }

    update(config) {
        this.onUpdate(config);
        this.#currentState.update(config);
    }

}