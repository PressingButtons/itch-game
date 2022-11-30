let actor_data;
let current;

let html;
const url = '../client/Maelstrom/data/actors.json'
const post_config = {
    method: 'POST',
    mode: 'cors',
    headers: {
        'Content-Type': 'application/json'
    },
}

export default {
    get current( ) {
        return current;
    },
    init: async function( ) {
        actor_data = await fetch(url).then(res => res.json( ));
        html = document.getElementById('actor_workspace');
    },
    create: function(name) {
        actor_data[name] = createActorTemplate(name);
        current = actor_data[name];
    },
    save: function( ) {
        return fetch(url, post_config)
        .then(( ) => console.log('save successful'))
        .catch(err => console.err('save unsuccessful\n', err));
    },
    selectActor: function(name) {
        current = actor_data[name] || null;
        readCurrent( );
    },
    createFrame: function(animation, template) {
        if(template) animation.push(template);
        else animation.push(frameTemplate( ));
    }
}



/* internal functions */
//=================================================================//
const createActorTemplate = name => {
    return {
        name: name, 
        width: 1,
        height: 1,
        animations: { }
    }
}

const frameTemplate = ( ) => {
    return {
        index: 0,
        duration: 100,
        body_rect: {x: 0, y: 0, width: 1, height: 1},
        hit_zones: [],
        hurt_zones: []
    }
}

const readCurrent = ( ) => {

}