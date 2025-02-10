<template>
  <div class="scene-container" ref="container"></div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

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

export default {
  name: 'HeaderWave',
  setup() {
    let scene, camera, renderer, points, controls, frameId
    const container = ref(null)

    // Wave parameters
    const params = ref({
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

    const init = (container) => {
      scene = new THREE.Scene()
      camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000)
      renderer = new THREE.WebGLRenderer({ antialias: true })
      renderer.setSize(container.clientWidth, container.clientHeight)
      container.appendChild(renderer.domElement)

      const geometry = new THREE.PlaneGeometry(5, 20, 100, 500)
      const material = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        transparent: true,
        uniforms: {
          uTime: { value: 0 },
          uColors: { value: [
            new THREE.Vector3(1.0, 0.0, 0.0),
            new THREE.Vector3(1.0, 1.0, 0.0),
            new THREE.Vector3(0.0, 1.0, 0.0),
            new THREE.Vector3(0.0, 0.0, 1.0),
            new THREE.Vector3(1.0, 0.0, 1.0)
          ]},
          uGradientPosition: { value: params.value.gradientPosition },
          uGradientSpread: { value: params.value.gradientSpread },
          uGradientAngle: { value: params.value.gradientAngle },
          uGradientCenter: { value: new THREE.Vector2(params.value.gradientCenterX, params.value.gradientCenterY) },
          uOpacityCenter: { value: params.value.opacityCenter },
          uOpacitySpread: { value: params.value.opacitySpread },
          uPointOpacity: { value: params.value.pointOpacity },
          uNoiseScale1: { value: params.value.noiseScale1 },
          uNoiseScale2: { value: params.value.noiseScale2 },
          uTimeScale1: { value: params.value.timeScale1 },
          uTimeScale2: { value: params.value.timeScale2 },
          uWaveHeight1: { value: params.value.waveHeight1 },
          uWaveHeight2: { value: params.value.waveHeight2 }
        }
      })

      points = new THREE.Points(geometry, material)
      points.rotateX(2)
      scene.add(points)

      camera.position.set(-0.5903648502060375, 0.0002967409222046913, 1.3418267086872022)
      camera.rotation.set(0.18199447226318785, -0.418235369534331, 0.0746051170159521)

      controls = new OrbitControls(camera, renderer.domElement)
      controls.enableDamping = true
      controls.dampingFactor = 0.05
      controls.addEventListener('change', (e) => {
        console.log('Camera position:', camera.position)
        console.log('Camera rotation:', camera.rotation)
      })
    }

    const animate = () => {
      if (!points) return

      const material = points.material
      material.uniforms.uTime.value += params.value.animationSpeed

      // Update uniforms
      material.uniforms.uNoiseScale1.value = params.value.noiseScale1
      material.uniforms.uNoiseScale2.value = params.value.noiseScale2
      material.uniforms.uTimeScale1.value = params.value.timeScale1
      material.uniforms.uTimeScale2.value = params.value.timeScale2
      material.uniforms.uWaveHeight1.value = params.value.waveHeight1
      material.uniforms.uWaveHeight2.value = params.value.waveHeight2
      material.uniforms.uGradientAngle.value = params.value.gradientAngle
      material.uniforms.uGradientPosition.value = params.value.gradientPosition
      material.uniforms.uGradientSpread.value = params.value.gradientSpread
      material.uniforms.uGradientCenter.value.set(params.value.gradientCenterX, params.value.gradientCenterY)
      material.uniforms.uOpacityCenter.value = params.value.opacityCenter
      material.uniforms.uOpacitySpread.value = params.value.opacitySpread
      material.uniforms.uPointOpacity.value = params.value.pointOpacity

      controls.update()
      renderer.render(scene, camera)
      frameId = requestAnimationFrame(animate)
    }

    const handleResize = () => {
      if (!container.value || !renderer || !camera) return
      
      const width = container.value.clientWidth
      const height = container.value.clientHeight
      
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    }

    onMounted(() => {
      if (!container.value) return
      init(container.value)
      animate()
      window.addEventListener('resize', handleResize)
    })

    onBeforeUnmount(() => {
      window.removeEventListener('resize', handleResize)
      if (frameId) {
        cancelAnimationFrame(frameId)
      }
      if (points) {
        points.geometry.dispose()
        points.material.dispose()
      }
      if (renderer) {
        renderer.dispose()
      }
      if (controls) {
        controls.dispose()
      }
    })

    return {
      container,
      params
    }
  }
}
</script>

<style>
.scene-container {
  width: 100%;
  height: 400px;
  background: #020ECB;
}
</style>