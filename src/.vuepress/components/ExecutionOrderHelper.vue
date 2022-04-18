<template>
  <draggable
    v-bind="dragOptions"
    tag="div"
    class="item-container"
    :value="realValue"
    @input="onInput"
  >
    <div class="item-group" :key="el.executionOrder + `${i}`" v-for="(el, i) in realValue">
      <div class="item" style="display: flex; justify-content: space-between;">
        <span>
          <span v-if="el.type === 'Action'">{{ el.isRoot ? 'Root' : 'Inline' }}</span> {{ el.type }}
        </span>
        <div>
          <span>{{ el.executionOrder }}</span>
        </div>
      </div>
      <nested-test class="item-sub" @input="onInputChild" :value="JSON.parse(JSON.stringify(el.elements))" />
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
      default: null,
    }
  },
  methods: {
    onInputChild (value) {
      console.log('child', value)
    },
    onInput (value) {
      console.log('parent', value)
      this.$emit('input', value)
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
    realValue: {
      set(value) {
        this.$emit('input', value)
      },
      get () {
        return this.value
      }
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
