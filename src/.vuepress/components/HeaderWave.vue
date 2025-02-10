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

<script>
import { ref } from 'vue'
import { TroisCanvas, TroisRenderer, TroisScene, TroisPerspectiveCamera, TroisOrbitControls } from 'trois'
import { Vector3 } from 'three'
import VertexDotsObject from './VertexDotsObject.vue'

export default {
  name: 'HeaderWave',
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

    const handleControlsChange = (event) => {
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
}
</script>