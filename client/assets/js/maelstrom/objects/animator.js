export default class Animator extends EventTarget {

    #animations = { };
    #currentAnimation;
    #currentFrame;
    #currentIndex;
    #elapsedTime;
    #frames;
    #funcs;

    constructor( ) {
        this.showFrame(0);
    }

    #onAnimationComplete( ) {
        this.#currentIndex = 0;
        this.dispatchEvent(new Event('animation-complete'));
    }

    #onNextFrame( ) {
        this.#currentIndex ++;
        if(this.#currentIndex >= this.#frames.length) this.#onAnimationComplete( );
        else this.dispatchEvent(new Event('animation-next-frame'));
        this.#currentFrame = this.#frames[this.#currentIndex];
        if(this.#funcs[this.#currentIndex]) this.#funcs[this.#currentIndex]( );
        this.#elapsedTime = 0;
    }

    #setAnimation(animation) {
        if(!animation) return null;
        this.#frames = animation.frames;
        this.#funcs = animations.funcs;
        this.#currentAnimation = animation
        this.#currentIndex = -1;
        this.#onNextFrame( );
    }

    animate(name) {
        if(this.#currentAnimation != this.#animations[name]) this.#setAnimation(this.#animations[name]);
        if(!this.#currentAnimation) return;
    }

    getState( ) {
        return {
            animation: this.#currentAnimation.name,
            frames: this.#frames,
            index: this.#currentIndex,
            et: this.#elapsedTime
        }
    }

    setAnimations(object) {
        for(const key in object) this.#animations[key] = object[key];
    }

    setState(state) {
        this.#currentAnimation = state.animation.name;
        this.#currentIndex = state.index;
        this.#elapsedTime = state.time;
        this.#frames = state.frames;
        if(this.#funcs[this.#currentIndex]) this.#funcs[this.#currentIndex]( );
    }

    showFrame(i) {
        this.#frames = [i];
        this.#funcs = { };
        this.#currentAnimation = {name: null}
    }

    update(dt) {
        this.#elapsedTime += dt;
        if(this.#elapsedTime > this.#currentFrame.time) this.#onNextFrame( );
    }

}