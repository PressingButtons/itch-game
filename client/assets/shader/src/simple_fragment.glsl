precision mediump float;

varying vec2 v_textCoord;

uniform sampler2D u_texture;
uniform vec4 tint;

void main( ) {
    gl_FragColor = texture2D(u_texture, v_textCoord) * tint;
}