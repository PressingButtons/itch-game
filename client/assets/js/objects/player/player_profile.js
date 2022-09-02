let profiles = new Map( );

export async function init( ) {
    let source = await Malestrom.System.loadJSON('../../data/profiles.json');
    for(const key in source) Map.set(key, source[key]);
}

export function create(name) {
    if(profiles.has(name) && !confirm(`Profile[${name}] already exists, do you wish to overrite it?`)) return; 
    profiles.set(name, new PlayerProfile( ))
}


class PlayerProfile {

    static DEFAULT_KEYBOARD = {
        up: "w",
        left: "a",
        down: "s"
        right: "d",
        block: "q",
    }

    static GENERIC_GAMEPAD = {
        up: [12, -0.2],
        left: [14, -0.2],
        down: [13, 0.2],
        right: [15, 0.2],
        block: 4,
        attack1: 5,
        attack2: 7
    }

    #keyboard;
    #gamepads = new Map( );
    #current = {type: null, config: null}

    constructor(gamepad) {
        this.#keyboard = Object.create(DEFAULT_KEYBOARD);
        if(gamepad) this.assignGamepad(gamepad);
        else this.assignKM;
    }



    assignGamepad(gamepad) {
        const id = gamepad.id.split('-')[0];
        if(this.#gamepads.has(id)) this.#current = this.#gamepads.get(id);
        else this.#gamepads.set(id, PlayerProfile.GENERIC_GAMEPAD);
        this.#current.type = "gamepad";
        this.#current.config = this.#gamepads.get(id);
    }

    assignKM( ) {
        this.#current.type = "keyboard";
        this.#current.config = this.#keyboard;

    }

    packageData( ) {
        let pkg = {keyboard: this.#keyboard, gamepads: { }};
        for(const key of this.#gamepads.keys( )) pkg.gamepads[key] = this.#gamepads.get(key);
        return pkg;
    }

}