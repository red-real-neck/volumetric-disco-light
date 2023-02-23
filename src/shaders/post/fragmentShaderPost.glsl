precision mediump float;

uniform sampler2D uMap;

varying vec2 vUv;

void main()
{
    vec4 color = texture2D(uMap, fract(vUv * 5.0));
    // gl_FragColor = vec4(vUv.x, vUv.y, 0.3, 1.0);
    gl_FragColor = color;
}