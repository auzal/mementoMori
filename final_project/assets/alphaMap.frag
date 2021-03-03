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

    vec4 color = texture2D(iChannel0, posPixel).rgba;
//
    if(color.a > 0.0){
      gl_FragColor = vec4(color.r, color.b, color.g, 1.0);
    }else{
      float gray = 0.15;
      gl_FragColor = vec4(vec3(gray), 0.0);
    }


//gl_FragColor = vec4(1.0,1.0,0.0,1.0);

}
