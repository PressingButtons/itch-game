import './Arachnid/arachnid.js';
import Maelstrom from './Maelstrom/maelstrom.js';


window.onload = async event => {
   await Maelstrom.init(document.getElementById('gameview'), {premultipliedAlpha: false});
   const ortho = glMatrix.mat4.ortho(glMatrix.mat4.create( ), 0, 1280, 720, 0, 1, -1);
   const config = {
       name: "dusk wulv",
       sprite: Maelstrom.Resources.getSprite("dusker_wulv"),
       size: [64, 64],
   }
   const go = new Arachnid.GameObject(config);
   go.x += 120;
   go.y += 120;


   const renderTest = dt => {
        const controls = Maelstrom.keyboard( );

        if(controls.Up) go.y -= 5;
        if(controls.Down) go.y += 5;

        if(controls.Right) go.x += 5;
        if(controls.Left) go.x -= 5;

        Maelstrom.Render.gameObject(go, ortho);
   }

   Maelstrom.runMethod(renderTest);

}
