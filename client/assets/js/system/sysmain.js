import './namespace.js';
import * as Events from './events.js';
import * as runStack from './runstack.js';
import './screen.js';
import inputInitializer from './input.js';

Malestrom.init = async function( ) {
    //Malestrom.Sceen.init( );
    Malestrom.Events = Events;
    Object.assign(Malestrom, runStack);
    inputInitializer( );
    Malestrom.resume( );
}
