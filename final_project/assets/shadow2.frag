#ifdef GL_ES
precision mediump float;
#endif


uniform vec3      iResolution;           // viewport resolution (in pixels)
uniform float     iTime;                 // shader playback time (in seconds)
uniform float     iTimeDelta;            // render time (in seconds)
uniform int       iFrame;                // shader playback frame
uniform float     iChannelTime[4];       // channel playback time (in seconds)
uniform vec3      iChannelResolution[4]; // channel resolution (in pixels)
uniform vec4      iMouse;                // mouse pixel coords. xy: current (if MLB down), zw: click
uniform sampler2D iChannel0;          // input channel. XX = 2D/Cube
uniform vec4      iDate;                 // (year, month, day, time in seconds)
uniform float     iSampleRate;           // sound sample rate (i.e., 44100)

const int   SAMPLES = 24;
const float POWER   = 1.0/float(SAMPLES);
const float DECAY   = 0.5;
const vec3  SHADOW_COL = vec3(0.0);

float rand(vec2 seed) { return fract(sin(dot(seed.xy ,vec2(12.9898, 78.233)))*43758.5453); }

void main( )
{
  vec2 uv = gl_FragCoord.xy/iResolution.xy;

  uv.y = 1.0 - uv.y;

  vec4 texc = texture2D(iChannel0, uv);

  float shadoww = 0.0;
  vec2 lightp = iMouse.xy/iResolution.xy;
  vec2 pc = (lightp-uv)*(1.0+(rand(uv+fract(iTime))*2.0-1.0)*0.1);
  for(int i = 0; i < SAMPLES; ++i)
  {
    shadoww += texture2D(iChannel0, uv+float(i)*DECAY/float(SAMPLES)*pc).a*POWER;
  }

  float mask = 1.0-texc.a;
  vec3 col = mix(texc.rgb, SHADOW_COL, shadoww*mask);

  float light = 1.0-length(uv-lightp);
  col *= light;

  gl_FragColor = vec4(col,1.0);
}
