import Animator from "../../../Arachnid/arachnid_animator/animator.js";
import GameObject from "../../../Arachnid/arachnid_object/game-object.js";

const BASE_CONFIGURATION = {
    name: 'actor',
    views: {
        texture_id: [Uint8Array, ['texture_id']],
        velocity: [Float32Array, ['x', 'y', 'z']],
        tint: [Uint8Array, ['r', 'g', 'b', 'a']]
    }
}

export default class Actor extends GameObject {

    #sprite;
    #current_frame = 0;
    #animations;

    constructor(config, sprite) {
        super(Object.assign(BASE_CONFIGURATION, config));   
        this.bindParamter('texture_id', false);
        this.bindParamter('tint');
        this.setTint(255, 255, 255, 255);  
        this.#sprite = sprite;
        this.#animations = new Animator(config.animations);
    }

    get texture( ) {
        return this.#sprite.texture._texture
    }

    get currentFrame( ) {
        return this.getFrameTransform(this.#current_frame);
    }

    animate(name) {
        this.#animations.play(name);
    }

    setTint(r, g, b, a) {
        this.tint.r = r;
        this.tint.g = g;
        this.tint.b = b;
        this.tint.a = a;
    }

    getTint( ) {
        return [...this.data.views.tint.data].map(x => x / 255);
    }

    getFrameTransform(i) {
        return {
            position: this.#sprite.cells[i],
            scale: this.#sprite.scale
        }
    }

    setCurrentFrame(i) {
        this.#current_frame = i;
    }

    onUpdate(dt) {
        this.#animations.update(dt);
    }

}