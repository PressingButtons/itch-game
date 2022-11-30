import { GraphicsLibrary } from "../Arachnid/arachnid_gl/$gl-main.js";
import * as Resources from './system/resource_cache.js';
import * as Actors from './game/actors/$actors.js';
import * as InputManager from './game/input/manager.js';
import * as Debug from './system/debug.js';
import World from "../Arachnid/arachnid_object/world.js";
import StepLoop from "../Arachnid/arachnid_system/step_loop.js";

let gl;

const updater = new StepLoop( );

updater.run( );
Debug.init(updater);

window.Maelstrom = { }

Maelstrom.init = async( ) => {
    gl = new GraphicsLibrary(document.getElementById('gameview'));
    await gl.compileShaders( );
    await Resources.preload(gl.gl);
    gl.createBuffer('texture_buffer', new Float32Array([
        0.0, 0.0, 0.0, 0.0, 
        1.0, 0.0, 1.0, 0.0,
        0.0, 1.0, 0.0, 1.0,
        1.0, 1.0, 1.0, 1.0])
    );
    
}

Maelstrom.createActor = name => {
    return Actors.make(name);
}

Maelstrom.createWorld = (config = { }) => {
    config.camera = {
        width: gl.gl.canvas.width / 2.5,
        height: gl.gl.canvas.height / 2.5
    }
    const world = new World(config);
    world.draw = ( ) => gl.drawWorld(world, Resources);
    Maelstrom.world = world;
}

Maelstrom.Resources = Resources;

Maelstrom.getGamepad = i => {
    return InputManager.getGamepad(i);
}

Maelstrom.debugMenu = (bool = true) => {
    if(bool) Debug.activateLog( );
    else Debug.deactivateLog( );
}

Maelstrom.stop = ( ) => {
    updater.stop( );
}

Maelstrom.resume = ( ) => {
    updater.run( );
}

updater.add(InputManager.update);
