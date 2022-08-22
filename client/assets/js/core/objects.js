/*
 *  Core library (version 0.1)
 *  #must be loaded as initial game script for subsequent classes
 *
*/

// ListenerObject (null)
// Servers as the basis for any object that will be bound to or emit events
// Keeps record of all listeners for proper removal

export class ListenerObject extends EventTarget {

    #listeners = new Map( );


    constructor() {
        super( );

    }

    bindEvent(eventname, func) {
        if(!this.#listeners.has(eventname)) this.#listeners.set(eventname, []);
        this.#listeners.get(eventname).push(func);
        this.addEventListener(eventname, func);
    }

    unbind(eventname, func) {
        this.removeEventListener(eventname, func);
    }

    unbindEvent(eventname = null) {
        const listeners = this.#listeners.get(eventname);
        for(const func of listeners) {
            this.unbind(eventname, func);
        }
    }

    unbindAll( ) {
        const it = this.#listeners.keys( );
        for(const key of it) this.unbindEvent(key);
    }

}

// State (name [String], parent [State], root [Object])
// Requires only a name, States are based of the HSM model.
// Expands of ListenerObjects to keep track of state transition events

export class State extends ListenerObject {

    #states = new Set( );
    #current;
    #root;
    #parent;
    #name;

    constructor(name, parent = null, root = null)  {
        super( );
        this.#name = name;
        this.#root = root == null ? this : root;
        this.#parent = parent;
    }

    get name( ) {return this.#name}
    get root( ) {return this.#root}
    get parent( ) {return this.#parent}

    get onUpdate( ) {return this.#onUpdate}
    set onUpdate(func) {this.#onUpdate = func}

    #onUpdate( ) {

    }

    #setTransition(name, stateConstructor) {
        const state = new stateConstructor(this, this.root);
        this.bindEvent(name, event => this.switchState(state));
        this.#states.add(state);
    }

    currentState(deep = false) {
        if(!deep) {
            return this.#current == this ? this : this.#current;
        }
        return this.#current == this ? this : this.#current.currentState(deep);
    }

    enterState(state) { };

    exitState(state) { };

    switchState(state) {
        if(!this.#current.transitions.has(state.id)) return;
        this.#current.exitState(state);
        this.state.enterState(this.#current);
        this.#current = state;
    }

    addTransition(...transitions) {
        for(const detail of transition) this.#setTransition(detail.name, detail.state);
    }

    signal(transition) {
        this.dispatchEvent(new Event(transition));
    }

    update(config) {
        this.#onUpdate(config);
        if(this.#current != this) this.#current.update(config);
    }

}

// GameObject( config [Object] )
// Takes an object detailing its configuration
// Preallocated bytes for use
// All GameObjects have a position and size buffer view 

export class GameObject extends State {

    static DEFAULT_ALLOCATION = 200;

    #data;
    #bufferOffset;
    #bytesLeft;

    constructor(config = { }) {
        super(config.name || 'gameobject');
        this.#data = new ArrayBuffer(config.alloc || GameObject.DEFAULT_ALLOCATION);
        this.assignToBuffer('position', Int16Array, 2);
        this.assignToBuffer('size', Int16Array, 2);
        this.width = config.width || 1;
        this.height = config.height || 1;
    }

    get unallocated( ) {
        return this.#data.length - this.#bufferOffset;
    }

    get x( ) {return this.position[0]}
    set x(n) {this.position[0] = n}

    get y( ) {return this.position[1]}
    set y(n) {this.position[1] = n}

    get width( ) {return this.size[0]} 
    get height( ) {return this.size[1]} 

    assignToBuffer(name, typedArray, length) {
        let array = Object.defineProperty(this, name, { value : 
            new typedArray(this.#data, this.#bufferOffset, length)
        });
        this.#bufferOffset = array.byteOffset + array.byteLength;
    }

}