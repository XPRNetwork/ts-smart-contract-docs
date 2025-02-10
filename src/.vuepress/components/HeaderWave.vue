<template>
  <div class="scene-container">
    <TroisCanvas>
      <TroisRenderer>
        <TroisScene>
          <TroisPerspectiveCamera :position="{ z: 10 }" />
          <TroisAmbientLight :intensity="0.5" />
          <TroisDirectionalLight :position="{ x: 0, y: 1, z: 0 }" :intensity="1" />
          <TroisBox :rotation="boxRotation" :position="{ x: 0, y: 0, z: 0 }" :size="2" :material="material" />
          <TroisOrbitControls />
        </TroisScene>
      </TroisRenderer>
    </TroisCanvas>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { TroisCanvas, TroisRenderer, TroisScene, TroisPerspectiveCamera, TroisBox, TroisAmbientLight, TroisDirectionalLight, TroisOrbitControls } from 'trois'
import { MeshStandardMaterial } from 'three'

export default {
  name: 'HeaderWave',
  components: {
    TroisCanvas,
    TroisRenderer,
    TroisScene,
    TroisPerspectiveCamera,
    TroisBox,
    TroisAmbientLight,
    TroisDirectionalLight,
    TroisOrbitControls
  },
  setup() {
    const boxRotation = ref({ x: 0, y: 0, z: 0 })
    const material = new MeshStandardMaterial({ 
      color: 0x2196f3,
      metalness: 0.5,
      roughness: 0.5
    })

    const animate = () => {
      boxRotation.value.y += 0.01
      boxRotation.value.x += 0.005
      requestAnimationFrame(animate)
    }

    onMounted(() => {
      animate()
    })

    return {
      boxRotation,
      material
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