<template>
  <Layout>
    <div slot="page-bottom" class="footer">
      <p>
        <span class="item">Copyright © {{ new Date().getFullYear() }}</span> 
        <span class="item">XPR Network</span>
      </p>
    </div>
  </Layout>
</template>

<script>
import Layout from '@vuepress/theme-default/layouts/Layout.vue'

export default {
  components: {
    Layout
  }
}
</script>

<style scoped>
.footer {
  text-align: center;
  color: #4e6e8e;
  padding: 0 2rem;
}
.footer .item {
  white-space: nowrap;
}
</style>
