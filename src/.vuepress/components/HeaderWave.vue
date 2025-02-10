<template>
  <div class="scene-container" ref="container"></div>
</template>

<script>
import { onMounted, onBeforeUnmount } from 'vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export default {
  name: 'HeaderWave',
  setup() {
    let scene, camera, renderer, cube, controls

    const init = (container) => {
      // Scene setup
      scene = new THREE.Scene()
      camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000)
      renderer = new THREE.WebGLRenderer({ antialias: true })
      renderer.setSize(container.clientWidth, container.clientHeight)
      container.appendChild(renderer.domElement)

      // Add cube
      const geometry = new THREE.BoxGeometry(2, 2, 2)
      const material = new THREE.MeshPhongMaterial({ 
        color: 0x2196f3,
        shininess: 60
      })
      cube = new THREE.Mesh(geometry, material)
      scene.add(cube)

      // Add lights
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
      scene.add(ambientLight)

      const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
      directionalLight.position.set(0, 1, 0)
      scene.add(directionalLight)

      // Camera position
      camera.position.z = 5

      // Add controls
      controls = new OrbitControls(camera, renderer.domElement)
      controls.enableDamping = true
      controls.dampingFactor = 0.05
    }

    const animate = () => {
      requestAnimationFrame(animate)
      cube.rotation.x += 0.005
      cube.rotation.y += 0.01
      controls.update()
      renderer.render(scene, camera)
    }

    const handleResize = () => {
      const container = renderer.domElement.parentElement
      camera.aspect = container.clientWidth / container.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(container.clientWidth, container.clientHeight)
    }

    onMounted(() => {
      const container = document.querySelector('.scene-container')
      init(container)
      animate()
      window.addEventListener('resize', handleResize)
    })

    onBeforeUnmount(() => {
      window.removeEventListener('resize', handleResize)
      if (renderer) {
        renderer.dispose()
      }
      if (controls) {
        controls.dispose()
      }
    })
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