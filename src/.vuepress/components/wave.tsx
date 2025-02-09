import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { useControls, folder } from 'leva';

interface ShaderUniforms {
  uTime: { value: number };
  uColors: { value: THREE.Vector3[] };
  uGradientPosition: { value: number };
  uGradientSpread: { value: number };
  uGradientAngle: { value: number };
  uGradientCenter: { value: THREE.Vector2 };
  uNoiseScale1: { value: number };
  uNoiseScale2: { value: number };
  uTimeScale1: { value: number };
  uTimeScale2: { value: number };
  uWaveHeight1: { value: number };
  uWaveHeight2: { value: number };
  uOpacityCenter: { value: number };
  uOpacitySpread: { value: number };
}

interface SceneRefs {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  points: THREE.Points<THREE.PlaneGeometry, THREE.ShaderMaterial>;
  controls: OrbitControls;
}

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
    
    // Create multiple waves using noise
    float noise1 = snoise(vec2(position.x * uNoiseScale1 + uTime * uTimeScale1, 
                              position.y * uNoiseScale1 + uTime * uTimeScale1));
    float noise2 = snoise(vec2(position.x * uNoiseScale2 - uTime * uTimeScale2, 
                              position.y * uNoiseScale2 + uTime * uTimeScale2));
    
    // Combine noises for more natural movement
    float wave = noise1 * uWaveHeight1 + noise2 * uWaveHeight2;
    
    vec3 newPosition = position;
    newPosition.z += wave;
    
    // Calculate color gradient
    vec2 gradientDir = vec2(cos(uGradientAngle), sin(uGradientAngle));
    vec2 positionFromCenter = position.xy - uGradientCenter;
    float gradientPosition = dot(positionFromCenter, gradientDir) + 0.5;
    vColorPosition = clamp(
      (gradientPosition - uGradientPosition) / uGradientSpread,
      0.0,
      1.0
    );
    
    // Calculate opacity based on Y position with mirror effect
    float yPosition = position.y + 0.5; // Normalize from [-0.5, 0.5] to [0, 1]
    float distanceFromCenter = abs(yPosition - uOpacityCenter);
    vOpacity = 1.0 - clamp(distanceFromCenter / uOpacitySpread, 0.0, 1.0);
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
    gl_PointSize = 4.0;
  }
`;

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
`;

interface VertexDotsProps {
  width?: string;
  height?: string;
  className?: string;
}

const VertexDots: React.FC<VertexDotsProps> = ({ 
  width = "100%",
  height = "100vh",
  className = ""
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<SceneRefs | null>(null);
  const frameId = useRef<number | null>(null);

  // Leva controls for wave parameters
  const {
    noiseScale1,
    noiseScale2,
    timeScale1,
    timeScale2,
    waveHeight1,
    waveHeight2,
    animationSpeed,
    gradientAngle,
    gradientPosition,
    gradientSpread,
    gradientCenterX,
    gradientCenterY,
    opacityCenter,
    opacitySpread,
    pointOpacity,
  } = useControls({
    
    'Wave Controls': folder({
      noiseScale1: { value: 0.8, min: 0.1, max: 10.0, step: 0.1 },
      noiseScale2: { value: 1, min: 0.1, max: 10.0, step: 0.1 },
      timeScale1: { value: 0.5, min: 0.1, max: 2.0, step: 0.1 },
      timeScale2: { value: 0.3, min: 0.1, max: 2.0, step: 0.1 },
      waveHeight1: { value: 0.15, min: 0.0, max: 0.5, step: 0.01 },
      waveHeight2: { value: 0.05, min: 0.0, max: 0.5, step: 0.01 },
      animationSpeed: { value: 0.00, min: 0.001, max: 0.1, step: 0.001 }
    }),
    'Gradient Controls': folder({
      gradientAngle: { value: 0.6, min: 0, max: Math.PI * 2, step: 0.1, label: 'Angle' },
      gradientPosition: { value: -0.8, min: -1, max: 1, step: 0.1, label: 'Position' },
      gradientSpread: { value: 4.9, min: 0.1, max: 5.0, step: 0.1, label: 'Spread' },
      gradientCenterX: { value: -1, min: -1, max: 1, step: 0.1, label: 'Center X' },
      gradientCenterY: { value: -0.8, min: -1, max: 1, step: 0.1, label: 'Center Y' },
    }),
    'Opacity Gradient': folder({
      opacityCenter: { value: 0.5, min: 0, max: 1, step: 0.01, label: 'Center' },
      opacitySpread: { value: 1.9, min: 0.1, max: 2.0, step: 0.01, label: 'Spread' },
      pointOpacity: { value: 0.1, min: 0, max: 1, step: 0.01, label: 'Global Opacity' }
    })
  });

  useEffect(() => {
    if (!containerRef.current) return;

    // Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    containerRef.current.appendChild(renderer.domElement);

    // Create geometry and material
    const geometry = new THREE.PlaneGeometry(5, 20, 100, 500);
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      transparent: true,
      uniforms: {
        "uTime": { value: 0 },
        "uColors": { value: [
          new THREE.Vector3(1.0, 0.0, 0.0),
          new THREE.Vector3(1.0, 1.0, 0.0),
          new THREE.Vector3(0.0, 1.0, 0.0),
          new THREE.Vector3(0.0, 0.0, 1.0),
          new THREE.Vector3(1.0, 0.0, 1.0)
        ]},
        uGradientPosition: { value: gradientPosition },
        uGradientSpread: { value: gradientSpread },
        uGradientAngle: { value: gradientAngle },
        uGradientCenter: { value: new THREE.Vector2(gradientCenterX, gradientCenterY) },
        uOpacityCenter: { value: opacityCenter },
        uOpacitySpread: { value: opacitySpread },
        uPointOpacity: { value: pointOpacity },
        uNoiseScale1: { value: noiseScale1 },
        uNoiseScale2: { value: noiseScale2 },
        uTimeScale1: { value: timeScale1 },
        uTimeScale2: { value: timeScale2 },
        uWaveHeight1: { value: waveHeight1 },
        uWaveHeight2: { value: waveHeight2 }
      } 
    });

    const points = new THREE.Points(geometry, material);
    points.rotateX(2)
    scene.add(points);
    camera.position.set(
    
     -0.5903648502060375,
     0.0002967409222046913,
     1.3418267086872022
    
    );
    camera.rotation.set(
    
     0.18199447226318785,
     -0.418235369534331,
     0.0746051170159521,
    
    )

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.addEventListener('change', (e) => {
      console.log(camera.position)
      console.log(camera.rotation)
    })
    
    sceneRef.current = { scene, camera, renderer, points, controls };

    const animate = () => {
      if (!sceneRef.current) return;
      
      const { points, scene, camera, renderer, controls } = sceneRef.current;
      const material = points.material as THREE.ShaderMaterial;
      
      material.uniforms.uTime.value += animationSpeed;
      // Update noise uniforms
      material.uniforms.uNoiseScale1.value = noiseScale1;
      material.uniforms.uNoiseScale2.value = noiseScale2;
      material.uniforms.uTimeScale1.value = timeScale1;
      material.uniforms.uTimeScale2.value = timeScale2;
      material.uniforms.uWaveHeight1.value = waveHeight1;
      material.uniforms.uWaveHeight2.value = waveHeight2;
      
      // Update gradient uniforms
      material.uniforms.uGradientAngle.value = gradientAngle;
      material.uniforms.uGradientPosition.value = gradientPosition;
      material.uniforms.uGradientSpread.value = gradientSpread;
      material.uniforms.uGradientCenter.value.set(gradientCenterX, gradientCenterY);
      
      // Update opacity uniforms
      material.uniforms.uOpacityCenter.value = opacityCenter;
      material.uniforms.uOpacitySpread.value = opacitySpread;
      material.uniforms.uPointOpacity.value = pointOpacity;
      
      controls.update();
      renderer.render(scene, camera);
      frameId.current = requestAnimationFrame(animate);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current || !sceneRef.current) return;
      
      const { camera, renderer } = sceneRef.current;
      
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      
      if (frameId.current) {
        cancelAnimationFrame(frameId.current);
      }
      
      if (containerRef.current && sceneRef.current) {
        containerRef.current.removeChild(sceneRef.current.renderer.domElement);
      }
      
      if (sceneRef.current) {
        geometry.dispose();
        material.dispose();
      }
    };
  }, [
    noiseScale1, 
    noiseScale2, 
    timeScale1, 
    timeScale2, 
    waveHeight1, 
    waveHeight2, 
    animationSpeed,
    gradientAngle,
    gradientPosition,
    gradientSpread,
    gradientCenterX,
    gradientCenterY,
    opacityCenter,
    opacitySpread,
    pointOpacity
  ]);

  return (
    <div 
      ref={containerRef} 
      style={{ width, height }}
      className={`bg-black ${className}`}
    />
  );
};

export default VertexDots;