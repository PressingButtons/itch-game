attribute vec3 a_position;
attribute vec2 a_textCoord;

uniform mat4 u_projection;
uniform mat4 u_transform;

varying vec2 v_textCoord;

void main( ) {
    gl_Position = u_projection * u_transform * vec4(a_position, 1);
    v_textCoord = a_textCoord;
}