import { mount } from '@vue/test-utils'
import { createStore } from 'vuex'
import { createRouter, createWebHistory } from 'vue-router'
import { TestComponent } from '../../utils/testComponent'
import { useFetchProducts } from '@/composables'
import { routes } from "@/router"

const productsMock = [{
  id: 1,
  name: 'Test',
  description: 'test',
  reference: '121544',
}]

const getProductsMock = jest.fn().mockReturnValueOnce(Promise.resolve(productsMock))
const store = createStore({
  modules: {
    productsModule: {
      namespaced: true,
      actions: {
        getProducts: getProductsMock
      }
    }
  }
})
const router = createRouter({
  history: createWebHistory(),
  routes,
})

const Component = TestComponent(useFetchProducts)

describe('useFetchProducts composable', () => {
  it ('Should fetch all products', async () => {
    const wrapper = mount(Component, {
      global: {
        plugins: [store, router],
      }
    })

    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()
    
    expect(getProductsMock).toHaveBeenCalled()
    expect(wrapper.vm.products).toEqual(productsMock)
  })
})