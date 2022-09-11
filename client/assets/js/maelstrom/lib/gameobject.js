// GameObject( config [Object] )
// Takes an object detailing its configuration
// Preallocated bytes for use
// All GameObjects have a position and size buffer view 

class Fighter extends Maelstrom.State {

    #data = new ArrayBuffer(200);

}


export class GameObject extends Maelstrom.State {

    static DEFAULT_ALLOCATION = 200;

    #data;
    #bufferOffset = 0;

    constructor(config = { }) {
        super(config.name || 'gameobject', config.parent, config.root);
        this.#data = new ArrayBuffer(config.alloc || GameObject.DEFAULT_ALLOCATION);
        this.assignToBuffer('position', Int16Array,3);
        this.assignToBuffer('size', Int16Array, 2);
        this.size[0] = config.width || 1;
        this.size[1] = config.height || 1;
    }

    get unallocated( ) {
        return this.#data.byteLength - this.#bufferOffset;
    }

    get x( ) {return this.position[0]}
    set x(n) {this.position[0] = n}

    get y( ) {return this.position[1]}
    set y(n) {this.position[1] = n}

    get z( ) {return this.position[2]}
    set z(n) {this.position[2] = n}

    get width( ) {return this.size[0]} 
    get height( ) {return this.size[1]} 

    get left( ) {return this.x}
    set left(n) {this.x = n}
    
    get right( ) {return this.x + this.width}
    set right(n) {this.x = n - this.width}

    get top( ) {return this.y}
    set top(n) {this.y = n}

    get bottom( ) {return this.y + this.height}
    set bottom(n) {this.y = n - this.height}

    assignToBuffer(name, typedArray, length) {
        if(typedArray == Float32Array && this.#bufferOffset % 4 != 0 ) {
            this.#bufferOffset += this.#bufferOffset % 4;
        }
        Object.defineProperty(this, name, { value : 
            new typedArray(this.#data, this.#bufferOffset, length)
        });
        this.#bufferOffset = this[name].byteOffset + this[name].byteLength;
    }

}
