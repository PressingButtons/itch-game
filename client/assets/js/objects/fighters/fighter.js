import RigidBody from "../rigidbody/rigidbody.js";
import FighterAir from "./air-states.js";
import FighterGround from "./ground-states.js";

export default class Fighter extends RigidBody {

    #stats = new Uint16Array(7);

    constructor(config) {
        super(config.name);
        this.#setStats(config);
        this.setTransistion('to-ground', new FighterGround( ));
        this.setTransistion('to-air', new FighterAir( ));
    }

    #setStats(config) {
        this.#stats[0] = config.health;
        this.#stats[1] = config.health;
        this.#stats[2] = config.energy;
        this.#stats[3] = config.energy;
        this.#stats[4] = config.walkspeed;
        this.#stats[5] = config.runspeed;
        this.#stats[6] = config.jumpforce;
    }

    onUpdate(config) {
        RigidBody.onUpdate.call(this, config);
    }

}