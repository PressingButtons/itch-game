import './Arachnid/arachnid.js';
import Actor from './Maelstrom/game/characters/actor.js';
import Maelstrom from './Maelstrom/maelstrom.js';


window.onload = async event => {
   await Maelstrom.init(document.getElementById('gameview'), {premultipliedAlpha: false});
   const camera = new Arachnid.OrthoCamera(document.getElementById('gameview'));

   const phys_config = {
        gravity: 10,
        bound_right: 1000,
        bound_bottom: 250,
        bound_left: 100,
        bound_top: 0
   }

   Maelstrom.Physics.init(phys_config);

   const test_config = {
       name: "dusk wulv",
       sprite: Maelstrom.Resources.getSprite("dusker_wulv"),
       size: [64, 64],
       body: [24, 14, 16, 36]

   }
   const go = new Actor(test_config);
   go.x += 120;
   go.y += 120;


   addEventListener('keyup', event => {
        const key = event.key.toLowerCase( );
        if(key == 'z') {
            camera.scale += 0.25;
        }
        if(key == "x") {
            camera.scale -= 0.25;
        }
   })


   const renderTest = dt => {

        dt *= 0.001;

        const controls = Maelstrom.keyboard( );

        if(controls.Up) {
            if(go.collisionBottom) {
                go.velocity.y = -5.2;
            }
        }
        if(controls.Down) {}

        if(controls.Right) {
            go.velocity.x = 3;
            go.rotationY = 0;
        }
        if(controls.Left) {
            go.velocity.x = -3;
            go.rotationY = Math.PI;
        }

        Maelstrom.Render.gameObject(go, camera.projection);
   }

   Maelstrom.runMethod(Maelstrom.Physics.update)
   Maelstrom.runMethod(renderTest);

   Maelstrom.Physics.add(go);

}
