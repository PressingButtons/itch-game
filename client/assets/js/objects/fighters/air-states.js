import State from "../../maelstrom/objects/state.js";

export default class FighterAir extends State {

    constructor( ) {

    }

    onUpdate(config) {
        this.parent.velocity.y += Maelstrom.Constants.Gravity * config.dt;
    }

}