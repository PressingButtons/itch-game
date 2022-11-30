import Actor from "../object/actor.js";

const configuration = {
    name: 'Vivian',
    width: 96, height: 96,
    animations: {
        idle: {
            frames: [[0, 0, null]],
            onComplete: null
        },
        walk: {
            frames: [
                [1, 0, null]
            ],
            onComplete: null
        }
    }
}

export default class Vivian extends Actor {

    constructor(sprite) {
        super(configuration, sprite);
    }

}