
export class Arena extends Core.Objects.State {

    #objects = [ ];
    #characters = [ ];
    
    constructor(parent, root) {
        super('arena', parent, root);
    }

    #deleteObjects( ) {
        while(this.#objects.length > 0 ) {
            const object = this.#objects.pop( );
            object.unbindAll( );
        }
    }

    async enterState(config) {
        //console.log('in arena state');
        //await MapReader.readMap(config.map);
    }

    exitState( ) {
        this.#deleteObjects( );
        
    }

}