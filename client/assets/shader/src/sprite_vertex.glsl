attribute vec3 a_position;
attribute vec2 a_texCoord;

uniform mat4 u_projection;
uniform mat4 u_transform;
uniform mat4 u_texMatrix;

varying vec2 v_texCoord;

void main( ) {
    gl_Position = u_projection * u_transform * vec4(a_position, 1);
    v_texCoord = vec4(u_texMatrix * vec4(a_texCoord, 0, 1)).xy;
}