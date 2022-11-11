import './Maelstrom/malestrom.js';


window.onload = async event => {

    await Maelstrom.init( );

    let fred = Maelstrom.createActor('fred');

    let pc = Maelstrom.createActor('vivian');

    Maelstrom.createWorld( );

    Maelstrom.world.addObject(fred);
    Maelstrom.world.addObject(pc);

    Maelstrom.world.draw( );

    const FPS = 1/60;

    const gamepad = Maelstrom.getGamepad(0);

    //Maelstrom.debugMenu(true);

    const it = setInterval(( ) => {


        if(gamepad.Left) {
            pc.rotation.y = Math.PI;
            pc.x -= 3;
            pc.setCurrentFrame(1);
        } else if(gamepad.Right) {
            pc.rotation.y = 0;
            pc.x += 3;
            pc.setCurrentFrame(1);
        } else {
            pc.setCurrentFrame(0);
        }

        if(gamepad.Down) 
            pc.y += 3;

        if(gamepad.Up) 
            pc.y -= 3;

        Maelstrom.world.draw( );

    }, FPS)

}
