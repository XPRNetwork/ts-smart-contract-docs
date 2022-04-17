<template>
  <draggable
    v-bind="dragOptions"
    tag="div"
    class="item-container"
    :list="list"
    :value="value"
    @input="emitter"
  >
    <div class="item-group" :key="el.id" v-for="el in realValue">
      <div class="item" style="display: flex; justify-content: space-between;">
        <span>{{ el.type }}</span>
        <div>
          <span>{{ el.creationOrder }}</span> | 
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
    value: {
      required: false,
      type: Array,
      default: null
    },
    list: {
      required: false,
      type: Array,
      default: null
    }
  },
  methods: {
    emitter(value) {
      this.$emit("input", value);
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
    // this.value when input = v-model
    // this.list  when input != v-model
    realValue() {
      return this.value ? this.value : this.list;
    }
  }
};
</script>

<style scoped>
.item-container {
  max-width: 500px;
  margin: 0;
}
.item {
  padding: 1rem;
  border: solid black 1px;
}
.item-sub {
  margin: 0 0 0 1.5rem;
}
</style>
