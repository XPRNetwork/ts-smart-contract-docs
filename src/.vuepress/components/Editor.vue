<template>
    <div class="editor-container">
        <iframe
            class="iframe-container"
            title="Editor"
            src="https://ts-sc-editor.netlify.app/"
            sandbox="allow-scripts allow-pointer-lock"
            ref="editorFrame"
        ></iframe>
    </div>
</template>

<script>
export default {
  name: 'Editor',
  data () {
      return {

      }
  }
}
</script>

<style scoped>
.editor-container {
    width: 100%;
}

.iframe-container {
    width: 100%;
    height: 650px;
    position: relative;
    background-color: #1e1e1e
}
</style>
