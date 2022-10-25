import Sprite from "./sprite.js";
import State from "./state.js";

export default class GameObject extends State {

    static ID = 0;
    #data = new ArrayBuffer(1024); //every gameobject gets 1kb of space for data
    #dataoffset = 0;
    #views = { };
    #id;
    #sprite = null;

    constructor(data) {
        super(data.name || 'gameobject');
        this.addDataView('velocity', {type: Float32Array, properties: ["x", "y", "z"]}, true);
        this.addDataView('rotation', {type: Float32Array, properties: ['x', 'y', 'z', 'w']}, true);
        this.addDataView('size', {type: Uint16Array, properties: ["width", 'height']});
        this.addDataView('position', {type: Int16Array, properties: ['x', 'y', 'z']});
        this.addDataView('currentCell', {type: Uint16Array, properties: ['row', 'column']}, true);
        this.#sprite = data.sprite;
        this.#views.size.set(data.size);
        this.velocity.x = 0;
        this.velocity.y = 0;
        this.#id = GameObject.ID;
        GameObject.ID ++;
    }

    get id( ) {
        return this.#id;
    }

    get bytesUsed( ) {
        return this.#dataoffset;
    }

    get sprite( ) {
        return Maelstrom.SpriteLibrary.getSprite(this.#sprite);
    }

    get animation_index( ) {
        return [this.index_row, this.index_column];
    }

    set animation_index(n) {
        this.animation_index.set(n);
    }

    //
    #defineViewProperties(view, properties, name) {
        let t;
        if(name) t = Object.defineProperty(this, name, {value: {value: view}})[name];
        else t = this;
        for(let i = 0; i < properties.length; i++) {
            Object.defineProperty(t, properties[i], {
                get ( ) {return view[i]},
                set (n) {view[i] = n}
            });
        }
    }
    //

    addDataView(name, config, useName = false) {
        const offset = this.#dataoffset + config.type.BYTES_PER_ELEMENT * config.properties.length;
        if(offset > this.#data.byteLength) throw 'Error - cannot add view to gameobject, not enough space: ' + offset;
        this.#views[name] = new config.type(this.#data, this.#dataoffset, config.properties.length);
        this.#defineViewProperties(this.#views[name], config.properties, useName ? name : false);
        this.#dataoffset += this.#views[name].byteLength;
    }

    setSprite(key) {
        this.#sprite = key;
    }

}

