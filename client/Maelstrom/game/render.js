let Graphics;

const matrices = {
    m0 : new Float32Array(new Array(16)),
    m1 : new Float32Array(new Array(16)),
    m2 : new Float32Array(new Array(16)),
    m3 : new Float32Array(new Array(16))
}

const defineBuffers = ( ) => {
    Graphics.defineBuffer('texture', new Float32Array([
        0, 0, 0, 0,
        1, 0, 1, 0,
        0, 1, 0, 1,
        1, 1, 1, 1
    ]));
}

const onDrawError = event => {
    console.error('Error - Graphics Render:')
    console.log(Graphics.dumpErrors(-1)[0]);
}

export function init(graphics_library) {
    Graphics = graphics_library;
    defineBuffers( );
    Graphics.addEventListener('draw_error', onDrawError);
}

export function clear(r, g, b, a) {
    Graphics.clear([r, g, b, a]);
}

export function texture(texture, transform,  projection, u_tint = [1, 1, 1, 1]) {

    const details = {
        program: "standard_texture",
        buffer_name: "texture",
        attributes: {
            a_position: {length: 2, stride: 4, offset: 0},
            a_texCoord: {length: 2, stride: 4, offset: 2}
        },
        uniforms: {
            u_projection: {method: "uniformMatrix4fv", parameters: [false, projection]},
            u_transform: {method: "uniformMatrix4fv", parameters: [false, transform]},
            u_tint: {method: "uniform4f", parameters: u_tint}
        },
        textures: {u_texture: texture},
        num_indices: 4,
        first_array: 0,
        draw_mode: "TRIANGLE_STRIP"
    }

    Graphics.draw(details);
}

export function sprite(sprite, cell, transform, projection, u_tint = [1, 1, 1, 1]) {
    texture(sprite.getCell(cell), transform, projection, u_tint);
}

export function gameObject(gameobject, projection) {
    texture(gameobject.currentCell, gameobject.getTransform(matrices.m0), projection);
}