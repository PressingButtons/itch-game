export default class EventListener extends EventTarget {

    #listenerMethods = new Map( );
    #source;

    constructor(source) {
        super( );
        this.#source = source || this;
    }

    #removeListener(name) {
        const detail = this.#listenerMethods.get(name);
        this.removeEventListener(detail.eventname, detail.func);
        this.#source.#listenerMethods.delete(name);
    }

    listenFor(name, eventname, func) {
        if(this.#listenerMethods.has(name)) this.#removeListener(name);
        this.#source.addEventListener(eventname, func);
        this.#listenerMethods.set(name, {eventname: eventname, func: func});
    }

}