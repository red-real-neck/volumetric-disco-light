precision mediump float;

uniform sampler2D uMap;

varying vec2 vUv;

void main()
{
    vec4 color = texture2D(uMap, fract(vUv * 8.0));
    // gl_FragColor = vec4(vec3(1.0 - color.r), 1);
    gl_FragColor = color;
}