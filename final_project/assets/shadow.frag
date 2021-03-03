#ifdef GL_ES
precision mediump float;
#endif

uniform float time;
uniform vec2 iMouse;
uniform sampler2D rock;
uniform sampler2D iChannel0;
uniform vec2 iResolution;


void main()
{
    float width = iResolution.x;
    float height = iResolution.y;
    vec2 posPixel = gl_FragCoord.xy/iResolution.xy;
    posPixel.y = 1.0 - posPixel.y;

    vec3 rockColor = texture2D(rock, posPixel*0.4 + vec2(sin(0.01) * 0.05, 0.0) ).rgb;

    posPixel.x += rockColor.r * 4.0/width  - 10.0/width;
    posPixel.y += rockColor.g * 4.0/height - 10.0/height;

    vec4 color = texture2D(iChannel0, posPixel).rgba;
//
    if(color.a > 0.0){
      gl_FragColor = vec4(0.0,0.0,0.0,color.a*0.4);
    }else{
      gl_FragColor = vec4(0.0,0.0,0.0,0.0);
    }


//gl_FragColor = vec4(1.0,1.0,0.0,1.0);

}
