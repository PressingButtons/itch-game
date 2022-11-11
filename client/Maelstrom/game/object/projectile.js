import Actor from "./actor.js";

const BASE_CONFIGURATION = {
    name: 'projectile', 
    views: {
        heading: [Float32Array, ['heading']]
    }
}

export default class Projectile extends Actor {

    constructor(config) {
        super(Object.assign(BASE_CONFIGURATION, config));
        this.bindParamter('heading', false);
    }

}