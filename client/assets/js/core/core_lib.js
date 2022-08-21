import * as Objects from './objects.js';

//generate core namespace 
Object.defineProperty(window, 'Core', {value: { }});

Object.defineProperties(Core, {
    Objects: {value: Objects}
});