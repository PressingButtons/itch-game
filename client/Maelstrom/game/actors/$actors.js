import Fred from "./fred.js";
import Vivian from "./vivian.js";

export function make(name) {
    switch(name.toLowerCase( )){
        case 'fred': 
            return new Fred(Maelstrom.Resources.getSprite('fred')); break;
        case 'vivian':
            return new Vivian(Maelstrom.Resources.getSprite('vivian')); break;
    }
}