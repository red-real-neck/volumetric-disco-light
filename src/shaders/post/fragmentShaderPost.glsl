precision mediump float;
uniform sampler2D uMap;
uniform float uLowFrequency;
uniform float uMidFrequency;
uniform float uHighFrequency;
varying vec2 vUv;
float PI = 3.1415926535;

float rand(vec2 co){
    return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453);
}

void main()
{
    vec4 original = texture2D(uMap, vUv);

    vec2 toCenter = vec2(0.5) - vUv;

    vec4 color = vec4(0.0);

    float total = 0.0;

    for(float i = 0.; i < 120.; i++) {
        float lerp = (i + rand(vec2(gl_FragColor.x * 0.2, gl_FragColor.y * 0.2))) / 100.;

        lerp *= uLowFrequency;

        float weight = sin(lerp * PI);
        vec4 mySample = texture2D(uMap, vUv + toCenter * lerp * 0.8);
        mySample.rgb *= mySample.a * 1.2;
        color += mySample * weight * uLowFrequency * 5.;
        total += weight;
    }
    color.a = 1.0;
    color.rgb /= total;

    vec4 finalColor = 1. - (1. - color) * (1. - original);

    gl_FragColor = vec4(finalColor.x * uMidFrequency, finalColor.y * uHighFrequency, finalColor.z * (uHighFrequency + uMidFrequency), finalColor.w);
}