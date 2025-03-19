<template>
  <draggable tag="div" class="item-container" :list="list" v-bind="dragOptions">
    <div class="item-group" v-for="(el, i) in list"
      :key="el.executionOrder + `${i}`">
      <div class="item" style="display: flex; justify-content: space-between;">
        <span>
          <span v-if="el.type === 'Action'">{{
            el.isRoot ? 'Root' : 'Inline'
          }}</span> {{ el.type }}
        </span>
        <div>
          <span>{{ el.executionOrder }}</span>
        </div>
      </div>
      <nested-test class="item-sub" :list="el.elements" />
    </div>
  </draggable>
</template>

<script>
import draggable from 'vuedraggable'

export default {
  name: "nested-test",
  props: {
    list: {
      required: false,
      type: Array,
      default: null,
    }
  },
  components: {
    draggable
  },
  computed: {
    dragOptions() {
      return {
        animation: 0,
        group: "description",
        disabled: false,
        ghostClass: "ghost"
      };
    },
  }
};
</script>

<style scoped>
.item-container {

  margin: 0;
}

.item {
  padding: 1rem;
  border: 1px solid #333333;
  margin-bottom:-1px;
}

.item-sub {
  margin: 0 0 0 1.5rem;
}
</style>
