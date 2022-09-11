Object.defineProperties(Maelstrom, {

    // ListenerObject (null)
    // Servers as the basis for any object that will be bound to or emit events
    // Keeps record of all listeners for proper removal

    ListenerObject: {
        value: class extends EventTarget {
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
    },

    // State (name [String], parent [State], root [Object])
    // Requires only a name, States are based of the HSM model.
    // Expands of ListenerObjects to keep track of state transition events

    State : {
        value: class extends Maelstrom.ListenerObject {
            #states = new Map( );
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

            #setTransition(name, stateConstructor) {
                const state = new stateConstructor(this, this.root);
                this.bindEvent(name, event => this.switchState(state));
                this.#states.set(state.name, state);
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
                if(!this.#current.transitions.has(state.name)) return;
                this.#current.exitState(state);
                this.state.enterState(this.#current);
                this.#current = state;
            }

            addTransition(...transitions) {
                for(const detail of transitions) this.#setTransition(detail.name, detail.state);
            }

            getState(name) {
                return this.#states.get(name);
            }

            onUpdate( );


            //force transition to avaiable state 
            setCurrent(state) {
                if(!this.#states.has(state.name)) throw `Error, provided state(${state.name}) is not applicable to state(${this.name})`;     
                if(this.#current) this.#current.exitState( );
                this.#current = state;
                this.#current.enterState( );
            }

            signal(transition) {
                this.dispatchEvent(new Event(transition));
            }

            update(config) {
                this.onUpdate(config);
                if(this.#current != this) this.#current.update(config);
            }
        }
    }
    

});