export default class PlayerTemplate {

    #inputs = [ ];
    #fighter;
    #profile;

    constructor(profile) {
        this.#profile = profile;
    }

    setProfile(profile) {
        this.#profile = profile;
    }

    

}