import GroundState from "./ground_state.js";

export default class IdleState extends GroundState {

    constructor(src) {
        super('idle', src);
    }

    onUpdate( ) {
        this.src.animate('idle');
    }

}