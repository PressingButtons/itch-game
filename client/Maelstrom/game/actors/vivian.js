import Actor from "../object/actor.js";

const configuration = {
    name: 'Vivian',
    width: 96, height: 96
}

export default class Vivian extends Actor {

    constructor(sprite) {
        super(configuration, sprite);
    }

}