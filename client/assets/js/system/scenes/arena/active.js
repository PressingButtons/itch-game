export class Active extends Core.Objects.State {

    constructor(parent, root) {
        super('active', parent, root);
        this.onUpdate = this.#onUpdate.bind(this);
    } 

    #drawBackground(texture, transform, tint, repeat = false) {
        Malestrom.Graphics.drawTexture(texture, Malestrom.Graphics.SQR_TEXTURE_BUFFER, transform, Malestrom.Camera.projection, tint, repeat )
    }

    #drawArena(layer) {
        for(const layer of mapdata) {
            Malestrom.Graphics.drawTileLayer(
                layer.map_texture,
                layer.tile_texture,
                Malestrom.Graphics.SQR_TEXTURE_BUFFER,
                layer.transform,
                Malestrom.Camera.projection,
                layer.tint
            )
        }
    }

    #drawObject(object) {
        Malestrom.Graphics.drawSprite(
            object.source_texture, 
            object.color_texture,
            object.size, 
            object.position, 
            object.transform,
            Malestrom.Camera.projection, 
            object.tint
        )
    }

    #onUpdate(config) {
        this.#drawArena( );
        this.#updateObjects( );
    }

    #updateObjects( ) {
        for(const object in this.root.objects)  {
            object.update(config);
            this.#drawObject(object);
        }
    }

}