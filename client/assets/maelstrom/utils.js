export function converToCanvas(image) {
    const ctx = document.createElement('canvas').getContext('2d');
    ctx.canvas.width = image.width;
    ctx.canvas.height = image.height;
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(image, 0, 0);
    return ctx;  
}

export function createDrawRequest(texture, x, y, z, w, h, texMatrix, projection, tint = [1, 1, 1, 1], repeat = false) {
    return {
        texture: texture,
        matrices: {
            u_texMatrix: texMatrix, 
            u_projection: projection,
            u_transform: glMatrix.mat4.fromRotationTranslationScale(Maelstrom.Matrix.getMatrix( ), [0, 0, 0, 0], [x, y, z], [w, h, 1])
        },
        tint: tint,
        repeat: repeat
    }
}

export function createSpriteDrawRequest(sprite, r, c, x, y, z, projection, tint = [1, 1, 1, 1]) {
    return createDrawRequest(
        sprite.texture, 
        x ,y, z, 
        sprite.width, sprite.height, 
        sprite.cellMatrix(r, c),
        projection,
        tint,
        false
    );
}


export function createTilemapDrawRequest(map, projection) {
    
}

export function loadImage(url) {
    return new Promise(function(resolve, reject) {
        const image = new Image( );
        image.onload = event => resolve(converToCanvas(image));
        image.onerror = event => reject(event);
        image.src = url;
    });
}

