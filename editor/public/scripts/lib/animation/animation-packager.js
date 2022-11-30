export default class AnimatonPackager extends EventTarget {

    #current;
    #animations;
    #name;
    #index;

    constructor(name) {
        super( );
        this.#name = name;
    }

    get currentFrame( ) {
        return this.#animations[this.#current][this.#index];
    }

    //Frame stuff

    addFrame( ) {
        this.#animations.push({duration: 100, callback: null, index: 0});
        this.#index = this.#animations.length - 1;
        this.dispatchEvent(new Event('update'));
    }

    removeFrame(i) {
        this.#animations.splice(i, 1);
    }

    selectFrame(i) {
        if(!this.#animations[this.#current][i]) return;
        this.#index = i;
        this.dispatchEvent(new Event('update'));
    }

    setDuration(time) {
        this.currentFrame.duration = time;
        this.dispatchEvent(new Event('update'));
    }

    setCallback(name, ...params) {
        this.currentFrame.callback.name = name;
        this.currentFrame.callback.params = params;
        this.dispatchEvent(new Event('update'));
    }

    setIndex(i) {
        this.currentFrame.index = i;
        this.dispatchEvent(new Event('update'));
    }

    //Animation Stuff

    createAnimation(name) {
        this.#animations[name] = [];
        this.#current = name;
        this.addFrame( );
    }

    selectAnimation(name) {
        if(!this.#animations[name]) return; 
        this.#current = name;
        this.dispatchEvent(new Event('update'));
    }

    packageAnimation( ) {
        return JSON.stringify({
            name: this.#name,
            animations: this.#animations
        });
    }

}