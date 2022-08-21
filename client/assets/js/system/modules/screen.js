const Screen = { };

Object.defineProperties(Screen, {

    init : {value: function(canvasElement) {
        Object.defineProperty(Screen, 'view', {value: canvasElement});
        Object.defineProperty(Screen, 'gl', {value: canvasElement.getContext('webgl', {preMultipliedAlpha: false})});
    }},

});


export default Screen;