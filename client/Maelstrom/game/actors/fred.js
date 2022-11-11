import Actor from "../object/actor.js";

const configuration = {
    name: 'Fred',
    width: 96, height: 96
}

export default class Fred extends Actor {

    constructor(sprite) {
        super(configuration, sprite);
    }

}