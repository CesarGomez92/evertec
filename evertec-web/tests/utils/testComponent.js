import { defineComponent } from 'vue'

export const TestComponent = (composable) => {
  return defineComponent({
    setup() {
      const composableProperties = composable()
      return {
        ...composableProperties
      }
    }
  })
}