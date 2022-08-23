export class S1 extends Core.Objects.State {

    #options = {
        "Arcade": "Begin a new campaign against a gauntlet of AI controlled rivals.", 
        "Versus": "Go head to head against a friend or an AI controlled opponent", 
        "Practice": "Learn how to play the game or refine techniques", 
        "Options": "Change various configuration settings", 
        "Special": "View unlocked content or create custom levels"
    }

    constructor(main) {
        super('main-menu', main, main);
    }

    #onSelection(event) {
        console.log(`${this.#options[event.detail]} selected`);
    }

    enterState( ) {
        this.parent.reset( );
        this.parent.setOptions(this.#options);
        this.parent.bindEvent('selection', this.#onSelection.bind(this));
        this.parent.title = "Main Menu";
    }

    exitState( ) {
        this.parent.reset( );
    }

}