<template>
  <ExecutionOrderHelper v-model="rootActions"/>
</template>

<script>
import draggable from 'vuedraggable'
import ExecutionOrderHelper from './ExecutionOrderHelper.vue'

export default {
  components: {
    draggable,
    ExecutionOrderHelper
  },
  name: 'Editor',

  props: ['rootActions'],

  watch: {
    rootActions: {
      handler: function (rootActions, oldRootActions) {
        console.log('handler')
        for (const rootAction of rootActions) {
          rootAction.isRoot = true
          if (rootAction.type === 'Notification') {
            this.rootActions = oldRootActions
            return
          }
        }

        const handleContext = (context) => {
          return {
            NewIA: context.elements.filter(_ => _.type === 'Action'),
            NewN: context.elements.filter(_ => _.type === 'Notification'),
          }
        }

        let executionOrder = 0

        for (const rootAction of rootActions) {
          let RootN = []
          let RootIA = [rootAction]

          while (RootN.length || RootIA.length) {
            const action = RootN.shift() || RootIA.shift()
            action.executionOrder = ++executionOrder
            
            const { NewIA, NewN } = handleContext(action)

            // Concat Notifications
            RootN = RootN.concat(NewN)

            // Concat Inline Actions
            if (action.type === 'Notification') {
              RootIA = RootIA.concat(NewIA)
            } else {
              RootIA = NewIA.concat(RootIA)
            }
          }
        }
      },
      deep: true,
      immediate: true
    }
  }
}
</script>