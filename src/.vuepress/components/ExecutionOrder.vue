<template>
  <ExecutionOrderHelper v-model="myArray"/>
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

  watch: {
    myArray: {
      handler: function (currentValue) {
        // let executionOrder = 0
        // let creationOrder = 0

        // let childrenEnd = false

        // const queue = []

        // const handleAction = (action) => {
        //   action.creationOrder = ++creationOrder
        //   action.elements.forEach()
        //   hand
        //   if
        // }

        // currentValue.forEach(action => {
        //   action.creationOrder = ++creationOrder

        // })
      },
      immediate: true
    }
  },

  data () {
    return {
      myArray: [
        {
          type: 'Action',
          elements: [
            {
              type: 'Action',
              elements: [
                {
                  type: 'Notification',
                  elements: [],
                  isInline: false,
                  isNotification: false
                },
                {
                  type: 'Action',
                  elements: [],
                  isInline: false,
                  isNotification: false
                }
              ],
              isInline: false,
              isNotification: false
            },
            {
              type: 'Notification',
              elements: [
                {
                  type: 'Action',
                  elements: [],
                  isInline: false,
                  isNotification: false
                },
                {
                  type: 'Notification',
                  elements: [],
                  isInline: false,
                  isNotification: false
                }
              ],
              isInline: false,
              isNotification: false
            },
            {
              type: 'Notification',
              elements: [
                {
                  type: 'Action',
                  elements: [],
                  isInline: false,
                  isNotification: false
                },
                {
                  type: 'Notification',
                  elements: [],
                  isInline: false,
                  isNotification: false
                }
              ],
              isInline: false,
              isNotification: false
            },
            {
              type: 'Action',
              elements: [
                {
                  type: 'Action',
                  elements: [],
                  isInline: false,
                  isNotification: false
                },
                {
                  type: 'Notification',
                  elements: [],
                  isInline: false,
                  isNotification: false
                }
              ],
              isInline: false,
              isNotification: false
            }
          ],
          isInline: false,
          isNotification: false
        },
        {
          type: 'Action',
          elements: [
            {
              type: 'Action',
              elements: [],
              isInline: false,
              isNotification: false
            },
            {
              type: 'Notification',
              elements: [],
              isInline: false,
              isNotification: false
            }
          ],
          isInline: false,
          isNotification: false
        },
      ]
    }
  }
}
</script>