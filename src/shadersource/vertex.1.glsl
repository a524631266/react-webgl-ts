attribute vec2 a_position;
// uniform vec2 u_resolution;
attribute vec3 a_color
varying vec4 v_color;

void main() {
  // vec2 real_poistion = a_position / u_resolution * 2.0 - 1.0;
  // gl_Position = vec4(real_poistion * vec2(1, -1), 0, 1);
  gl_Position = a_position
  v_color = vec4(a_color, 1);
}