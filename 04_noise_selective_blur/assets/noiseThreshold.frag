
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 iResolution;
uniform int iFrame;
uniform vec2 iMouse;
uniform float iTime;
uniform sampler2D tex0;
uniform sampler2D tex1;
uniform sampler2D texNoise;
uniform float threshold;



void main()
{
	// Normalized pixel coordinates (from 0 to 1)
	vec2 uv = gl_FragCoord.xy/iResolution.xy;

	uv.y = 1.0 - uv.y;

	// sample texture and output to screen
	vec4 channel0FragColor = texture2D(tex0, uv);
	vec4 channel1FragColor = texture2D(tex1, uv);

	vec4 noiseColor = texture2D(texNoise, uv);

	float value = noiseColor.r;

	float gray = 0.05;
	vec3 bgColor = vec3(gray,gray,gray);

	if(value > threshold) {
		if(channel0FragColor.a < 0.9){
			gl_FragColor = vec4(bgColor, 1.0);
			}else{
				gl_FragColor = channel0FragColor;
			}
			} else {
				gl_FragColor = channel1FragColor;
			}
		}
