import * as Resources from './game/resource.js';
import * as Render from './game/render.js';
import * as Runner from './system/runner.js';
import * as InputManager from './game/input/manager.js';
import * as Physics from './system/physics.js';

let Graphics, GameConfig;

Runner.run( );

const initGraphics = async (canvas) => {
    Graphics = new Arachnid.GraphicsGL(canvas, {premultipliedAlpha: false});
    const shaderDetails = await fetch('/arachnid/shaders/config.json').then(response => response.json( ));
    await Graphics.compileShaders(shaderDetails);
    Maelstrom.setResolution(1280, 720);
};

const initRender = ( ) => {
    Render.init(Graphics);
    Maelstrom.Render = Render;
}

const Maelstrom = {
    Resources: Resources
};

Maelstrom.init = async(canvas) => {
    await initGraphics(canvas);
    initRender( );
    GameConfig = await fetch('/maelstrom/data/config.json').then(response => response.json( ));
    await Resources.preload(Graphics.gl, GameConfig);
}

Maelstrom.enableInput = ( ) => {
    Runner.add(InputManager.poll);
}

Maelstrom.disableInput = ( ) => {
    Runner.remove(InputManager.poll);
}

Maelstrom.gamepad = (i) => {
    return InputManager.getGamepad(i);
}

Maelstrom.keyboard = ( ) => {
    return InputManager.getKeyboard( );
}

Maelstrom.run = ( ) => {
    Runner.run( );
}

Maelstrom.stop = ( ) => {
    Runner.stop( );
}

Maelstrom.runMethod = method => {
    Runner.add(method);
}

Maelstrom.setResolution = (width, height) => {
    Graphics.gl.canvas.width = width;
    Graphics.gl.canvas.height = height;
}

Maelstrom.Physics = Physics;

export default Maelstrom;
