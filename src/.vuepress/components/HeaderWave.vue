<template>
  <div :style="{ width, height }" :class="`bg-black ${className}`">
    <TroisCanvas>
      <TroisRenderer>
        <TroisScene>
          <TroisPerspectiveCamera :position="cameraPosition" :rotation="cameraRotation" />
          <VertexDotsObject
            :noiseScale1="controls.noiseScale1"
            :noiseScale2="controls.noiseScale2"
            :timeScale1="controls.timeScale1"
            :timeScale2="controls.timeScale2"
            :waveHeight1="controls.waveHeight1"
            :waveHeight2="controls.waveHeight2"
            :animationSpeed="controls.animationSpeed"
            :gradientAngle="controls.gradientAngle"
            :gradientPosition="controls.gradientPosition"
            :gradientSpread="controls.gradientSpread"
            :gradientCenterX="controls.gradientCenterX"
            :gradientCenterY="controls.gradientCenterY"
            :opacityCenter="controls.opacityCenter"
            :opacitySpread="controls.opacitySpread"
            :pointOpacity="controls.pointOpacity"
          />
          <TroisOrbitControls :dampingFactor="0.05" :enableDamping="true" @change="handleControlsChange" />
        </TroisScene>
      </TroisRenderer>
    </TroisCanvas>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { TroisCanvas, TroisRenderer, TroisScene, TroisPerspectiveCamera, TroisOrbitControls } from 'trois'
import { Vector2, Vector3 } from 'three'


export default defineComponent({
  name: 'VertexDots',
  components: {
    TroisCanvas,
    TroisRenderer,
    TroisScene,
    TroisPerspectiveCamera,
    TroisOrbitControls,
    VertexDotsObject
  },
  props: {
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '100vh'
    },
    className: {
      type: String,
      default: ''
    }
  },
  setup() {
    const controls = ref({
      noiseScale1: 0.8,
      noiseScale2: 1,
      timeScale1: 0.5,
      timeScale2: 0.3,
      waveHeight1: 0.15,
      waveHeight2: 0.05,
      animationSpeed: 0.0,
      gradientAngle: 0.6,
      gradientPosition: -0.8,
      gradientSpread: 4.9,
      gradientCenterX: -1,
      gradientCenterY: -0.8,
      opacityCenter: 0.5,
      opacitySpread: 1.9,
      pointOpacity: 0.1
    })

    const cameraPosition = new Vector3(-0.5903648502060375, 0.0002967409222046913, 1.3418267086872022)
    const cameraRotation = new Vector3(0.18199447226318785, -0.418235369534331, 0.0746051170159521)

    const handleControlsChange = (event: any) => {
      console.log('Camera position:', event.target.camera.position)
      console.log('Camera rotation:', event.target.camera.rotation)
    }

    return {
      controls,
      cameraPosition,
      cameraRotation,
      handleControlsChange
    }
  }
})
</script>

<template>
  <TroisPoints ref="pointsRef" :material="material" :geometry="geometry" :rotation="rotation">
  </TroisPoints>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watch } from 'vue'
import { TroisPoints } from 'trois'
import { ShaderMaterial, PlaneGeometry, Vector2, Vector3 } from 'three'

const vertexShader = `
  precision mediump float;
  
  uniform float uTime;
  uniform vec3 uColors[5];
  uniform float uGradientPosition;
  uniform float uGradientSpread;
  uniform float uGradientAngle;
  uniform vec2 uGradientCenter;
  uniform float uNoiseScale1;
  uniform float uNoiseScale2;
  uniform float uTimeScale1;
  uniform float uTimeScale2;
  uniform float uWaveHeight1;
  uniform float uWaveHeight2;
  uniform float uOpacityCenter;
  uniform float uOpacitySpread;
  
  varying vec3 vPosition;
  varying float vColorPosition;
  varying float vOpacity;

  // Simplex noise functions
  vec3 mod289(vec3 x) {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
  }
  
  vec2 mod289(vec2 x) {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
  }
  
  vec3 permute(vec3 x) {
    return mod289(((x*34.0)+1.0)*x);
  }
  
  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187,
                       0.366025403784439,
                      -0.577350269189626,
                       0.024390243902439);
    
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v -   i + dot(i, C.xx);
    
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
                     + i.x + vec3(0.0, i1.x, 1.0));
                     
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m;
    m = m*m;
    
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    
    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
    
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }
  
  void main() {
    vPosition = position;
    
    float noise1 = snoise(vec2(position.x * uNoiseScale1 + uTime * uTimeScale1, 
                              position.y * uNoiseScale1 + uTime * uTimeScale1));
    float noise2 = snoise(vec2(position.x * uNoiseScale2 - uTime * uTimeScale2, 
                              position.y * uNoiseScale2 + uTime * uTimeScale2));
    
    float wave = noise1 * uWaveHeight1 + noise2 * uWaveHeight2;
    
    vec3 newPosition = position;
    newPosition.z += wave;
    
    vec2 gradientDir = vec2(cos(uGradientAngle), sin(uGradientAngle));
    vec2 positionFromCenter = position.xy - uGradientCenter;
    float gradientPosition = dot(positionFromCenter, gradientDir) + 0.5;
    vColorPosition = clamp(
      (gradientPosition - uGradientPosition) / uGradientSpread,
      0.0,
      1.0
    );
    
    float yPosition = position.y + 0.5;
    float distanceFromCenter = abs(yPosition - uOpacityCenter);
    vOpacity = 1.0 - clamp(distanceFromCenter / uOpacitySpread, 0.0, 1.0);
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
    gl_PointSize = 4.0;
  }
`

const fragmentShader = `
  precision mediump float;
  
  uniform vec3 uColors[5];
  uniform float uPointOpacity;
  
  varying vec3 vPosition;
  varying float vColorPosition;
  varying float vOpacity;
  
  vec3 getGradientColor(float position) {
    float colorIndex = position * float(4);
    int index = int(floor(colorIndex));
    float t = fract(colorIndex);
    
    if (index >= 4) return uColors[4];
    if (index < 0) return uColors[0];
    
    return mix(uColors[index], uColors[index + 1], t);
  }
  
  void main() {
    vec2 center = gl_PointCoord - 0.5;
    float dist = length(center);
    if(dist > 0.5) discard;
    
    vec3 color = getGradientColor(vColorPosition);
    gl_FragColor = vec4(color, vOpacity * uPointOpacity);
  }
`

export default defineComponent({
  name: 'VertexDotsObject',
  components: {
    TroisPoints
  },
  props: {
    noiseScale1: Number,
    noiseScale2: Number,
    timeScale1: Number,
    timeScale2: Number,
    waveHeight1: Number,
    waveHeight2: Number,
    animationSpeed: Number,
    gradientAngle: Number,
    gradientPosition: Number,
    gradientSpread: Number,
    gradientCenterX: Number,
    gradientCenterY: Number,
    opacityCenter: Number,
    opacitySpread: Number,
    pointOpacity: Number
  },
  setup(props) {
    const pointsRef = ref(null)
    const time = ref(0)

    const geometry = new PlaneGeometry(5, 20, 100, 500)
    const material = new ShaderMaterial({
      vertexShader,
      fragmentShader,
      transparent: true,
      uniforms: {
        uTime: { value: 0 },
        uColors: { value: [
          new Vector3(1.0, 0.0, 0.0),
          new Vector3(1.0, 1.0, 0.0),
          new Vector3(0.0, 1.0, 0.0),
          new Vector3(0.0, 0.0, 1.0),
          new Vector3(1.0, 0.0, 1.0)
        ]},
        uGradientPosition: { value: props.gradientPosition },
        uGradientSpread: { value: props.gradientSpread },
        uGradientAngle: { value: props.gradientAngle },
        uGradientCenter: { value: new Vector2(props.gradientCenterX, props.gradientCenterY) },
        uOpacityCenter: { value: props.opacityCenter },
        uOpacitySpread: { value: props.opacitySpread },
        uPointOpacity: { value: props.pointOpacity },
        uNoiseScale1: { value: props.noiseScale1 },
        uNoiseScale2: { value: props.noiseScale2 },
        uTimeScale1: { value: props.timeScale1 },
        uTimeScale2: { value: props.timeScale2 },
        uWaveHeight1: { value: props.waveHeight1 },
        uWaveHeight2: { value: props.waveHeight2 }
      }
    })

    const rotation = new Vector3(2, 0, 0)

    // Watch for prop changes and update uniforms
    watch(() => props, (newProps) => {
      material.uniforms.uNoiseScale1.value = newProps.noiseScale1
      material.uniforms.uNoiseScale2.value = newProps.noiseScale2
      material.uniforms.uTimeScale1.value = newProps.timeScale1
      material.uniforms.uTimeScale2.value = newProps.timeScale2
      material.uniforms.uWaveHeight1.value = newProps.waveHeight1
      material.uniforms.uWaveHeight2.value = newProps.waveHeight2
      material.uniforms.uGradientAngle.value = newProps.gradientAngle
      material.uniforms.uGradientPosition.value = newProps.gradientPosition
      material.uniforms.uGradientSpread.value = newProps.gradientSpread
      material.uniforms.uGradientCenter.value.set(newProps.gradientCenterX, newProps.gradientCenterY)
      material.uniforms.uOpacityCenter.value = newProps.opacityCenter
      material.uniforms.uOpacitySpread.value = newProps.opacitySpread
      material.uniforms.uPointOpacity.value = newProps.pointOpacity
    }, { deep: true })

    // Animation loop
    const animate = () => {
      time.value += props.animationSpeed
      material.uniforms.uTime.value = time.value
      requestAnimationFrame(animate)
    }

    onMounted(() => {
      animate()
    })

    return {
      pointsRef,
      geometry,
      material,
      rotation
    }
  }
})
</script>