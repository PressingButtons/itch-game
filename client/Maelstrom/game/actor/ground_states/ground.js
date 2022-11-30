import GroundState from "./ground_state.js";
import IdleState from "./idle.js";
import WalkState from "./walk.js";

export default class Ground extends GroundState {

    constructor(src) {
        super('ground', src);
        this.setTransitions({
            idle: new IdleState(src),
            walk: new WalkState(src)
        });
    }

    #friction(dt) {
        if(Math.abs(this.src.velocity.x > 1)) this.src.velocity.x /= 3;
        else this.src.velocity.x = 0;
    }

    onEnter( ) {

    }

    onUpdate(config) {
        this.#friction(config.dt);
    }

}