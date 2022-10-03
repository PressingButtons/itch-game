import State from "../../maelstrom/objects/state";
import { Point, Velocity } from "../objects.js";

export default class RigidBody extends State {

    #velocity = new Velocity( );
    #position = new Point( );
    #dimension = new Uint16Array(2);
    #onFloor = false;

    constructor(config) {
        super(config.name);
        this.#dimension.set(config.dimension || [0, 0, 1, 1]);
        this.setTransistion('to-air', new Aerial( ));
        this.setTransistion('to-ground', new Grounded( ));
    }

    get velocity( ) {
        return this.#velocity;
    }

    get position( ) {
        return this.#position;
    }

    get width( ) {
        return this.#dimension[0];
    }

    get height( ) {
        return this.#dimension[1];
    }

    setDimension(ar) {
        this.#dimension.set(ar);
    }

    onUpdate(config) {
        this.#position.x += this.velocity.x;
        config.tilemap.resolveX(this);
        this.#position.y += this.velocity.y;
        config.tilemap.resolveY(this);
    }

}


class Aerial extends State {

    constructor( ) {
        super('aerial');
    }

    onUpdate(config) {
        this.parent.velocity.y += Maelstrom.Constants.Gravity * config.dt;
        if(this.#onFloor) this.parent.switchState('to-ground');
    }

}

class Grounded extends State {

    constructor( ) {
        super('grounded');
    }

    onUpdate(config) {
        if(!this.#onFloor) this.parent.switchState('to-air');
    }

}