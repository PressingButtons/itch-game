export default class Particle extends Arachnid.RigidBody {

    #sprite;
    #life_time;
    #animation;

    constructor(sprite, life_time) {
        super( );
        Object.defineProperty(this, "NO_COLLISION", {value: true});
    }

    onUpdate(config) {
        this.#life_time -= config.dt;
        if(this.#life_time <= 0) this.dispatchEvent(new Event('end-of-life'));
    }

}