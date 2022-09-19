precision mediump float;

varying vec2 v_texCoord;

uniform sampler2D u_map_texture;
uniform sampler2D u_tile_texture;
uniform vec2 u_map_size;
uniform vec2 u_range;

void main( ) {
    vec2 texCoord = v_texCoord / u_range;
    vec2 index = texture2D(u_map_texture, v_texCoord).xy * 256.0;
    vec2 start = index * 16.0;
    vec2 offset = mod(texCoord * u_map_size, 16.0);
    vec2 position = (start + offset) / 256.0;
    gl_FragColor = texture2D(u_tile_texture, position);
}