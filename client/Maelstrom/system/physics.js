const config = { };

const objects = new Map( );

const checkBoundaries = (object, dt) => {
    checkLeft(object);
    checkRight(object);
    checkBottom(object, dt);
    checkTop(object);
}
/**
 * 
 * @param {Arachnid.RigidBody} object 
 * @returns 
 */
const checkLeft = object => {
    if(object.left > config.bound_left) return object.collisionLeft = false;
    if(!object.collisionLeft) object.signal('collide-left');
    object.collisionLeft = true;
}

const checkRight = object => {
    if(object.right < config.bound_right) return object.collisionRight = false;
    if(!object.collisionRight) object.signal('collide-right');
    object.collisionRight = true;
}

const checkTop = object => {
    if(object.top > config.bound_top) return object.collisionTop = false;
    if(!object.collisionTop) object.signal('collide-top');
    object.collisionTop = true;
}


const checkBottom = (object, dt) => {
    if(object.bottom < config.bound_bottom) return object.collisionBottom = false;
    object.signal('collide-bottom', {gravity: config.gravity, y: config.bound_bottom, dt: dt});
    object.collisionBottom = true;
}


const moveObject = (object, dt) => {
    if(object.gravity && !object.collisionBottom) object.velocity.y += config.gravity * dt;
    object.x += object.velocity.x;
    object.y += object.velocity.y;
}

export function init(data) {
    Object.assign(config, data);
}

export function add(object) {
    objects.set(object.id, object);
}

export function remove(object) {
    objects.delete(object.id);
}

/**
 * 
 * @param  {..float} steps 
 */

export function update(dt) {
    dt = dt * 0.001; //convert to milliseconds
    for(const object of objects.values( )) {
        moveObject(object, dt);
        checkBoundaries(object, dt);
    }
}

