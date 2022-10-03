import Animator from "../maelstrom/objects/animator";
import RigidBody from "./rigidbody/rigidbody";

export default class GameObject extends RigidBody {

    #sprite;
    #animator = new Animator( );

    constructor(config) {
        this.#sprite = config.sprite;
        this.#animator.setAnimations(config.animations);
    }

}