import { Lerp } from "../../system/calc.js";

export default class Actor extends Arachnid.RigidBody {

    constructor(config) {
        super(config);
        this.#initCollisionListeners( );
    }

    get gravity( ) {return true}

    #initCollisionListeners( ) {
        this.addEventListener('collide-bottom', this.#onCollideBottom);
    }

    #friction(dt) {
        this.velocity.x = Lerp(this.velocity.x, 0, 0.9);
        if(Math.abs(this.velocity.x) < 0.1) this.velocity.x = 0;
    }

    #onCollideBottom(event) {
        this.bottom = event.detail.y;
        if(this.velocity.y > 0) this.velocity.y = -event.detail.gravity * event.detail.dt;
        if(this.velocity.x != 0) this.#friction(event.detail.dt);
    }

}