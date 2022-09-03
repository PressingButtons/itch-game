import { State } from "../core/objects";

export default class Active extends State {

    constructor(world) {
        super('world_active', world, world);
    }


    #resolveHorizontalCollision(dt, object, map) {
        object.x += object.velocity.x * dt;
        object.left = resolveLeft(object, object.bottom, map);
        object.left = resolveLeft(object, object.top, map);
        object.right = resolveRight(object, object.bottom, map);
        object.right = resolveRight(object, object.top, map);
    }

    #resolveVerticalCollision(dt, object, map) {
        object.velocity.y += this.root.gravity;
        object.y += object.velocity.y * dt;
        object.bottom = resolveBottom(object, object.left, map);
        object.bottom = resolveBottom(object, object.right, map);
        object.top = resolveTop(object, object.left, map);
        object.top = resolveTop(object, object.right, map);
    }

    #resolveObject(dt, object) {
        this.#resolveHorizontalCollision(dt, object, map);
        this.#resolveVerticalCollision(dt, object, map);
    }

    onUpdate(dt) {
        const map = Malestrom.getMap(this.#mapID);
        for(const object of this.root.objects) {
            object.update(dt, this.root);
            this.#resolveObject(dt, object, map);
        }
    }

}

const resolveLeft = (object, orientation, map) => {
    const tile = map.getTile(object.left, orientation, map);
    object.flags.left = false;
    if(!tile) {
        return object.left;
    }
    switch(tile.value) {
        case 1: object.flags.left = true; return tile.right;
    }
}

const resolveRight = (object, orientation, map) => {
    const tile = map.getTile(object.right, orientation, map);
    object.flags.right = false;
    if(!tile) return object.right);
    switch(tile.value) {
        case 1: object.flags.right = true; return tile.left - 1;
    }
}

const resolveTop = (object, orientation, map) => {
    const tile = map.getTile(orientation, object.top, map);
    object.flags.top = false;
    if(!tile) return object.top;
    switch(tile.value) {
        case 1: object.flags.top = true; return tile.bottom;
    }
}

cconst resolveBottom = (object, orientation, map) => {
    const tile = map.getTile(orientation, object.bottom, map);
    object.flags.bottom = false;
    if(!tile) return object.bottom);
    switch(tile.value) {
        case 1: object.flags.bottom = true; return tile.top;
    }
}