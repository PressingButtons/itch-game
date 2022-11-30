import GroundState from "./ground_state.js";

export default class WalkState extends GroundState {

    constructor(src) {
        super('walk', src);
        
    }

    #backwardWalk(dt) {
        this.src.animate('back_walk');
    }

    #forwardWalk(dt) {
        this.src.animate('forward_walk');
    }

    #goLeft(dt) {
        if(this.src.rotation == Math.PI) this.#forwardWalk(-this.src.walk_speed);
        else this.#backwardWalk(-this.src.backward_walk_speed);
    }


    #goRight(dt) {
        if(this.src.rotation == 0) this.#forwardWalk(this.src.walk_speed);
        else this.#backwardWalk(this.src.backward_walk_speed);
    }
  

    onEnter( ) {

    }
    
    onUpdate(config) {
        if(config.directional_input[2] && config.directional_input[3]) return;
        else if(config.directional_input[3]) this.#goRight(config.dt);
        else if(config.directional_input[2]) this.#goLeft(config.dt);
    }

}