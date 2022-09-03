import { State } from "../core/objects";

export default class World extends State {

    #mapID;
    #objects;
    #activeObjects;
    #gravity = 10;

    constructor(mapData) {
        super(mapData.name);    
        this.#mapID = mapID;
    }

    load( ) {

    }

    exportState( ) {

    }

    run( ) {
        Malestrom.run('world', this.update);
    }

    stop( ) {
        Malestrom.stop('world');
    }

}