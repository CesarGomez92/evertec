import { mount } from '@vue/test-utils'
import { createStore } from 'vuex'
import { createRouter, createWebHistory } from 'vue-router'
import { TestComponent } from '../../utils/testComponent'
import { useSelectProduct, useLocalStorage } from '@/composables'
import { routes } from "@/router"


const setSelectedProductMock = jest.fn()
const store = createStore({
  modules: {
    productsModule: {
      namespaced: true,
      actions: {
        setSelectedProduct: setSelectedProductMock
      }
    }
  }
})
const router = createRouter({
  history: createWebHistory(),
  routes,
})

const Component = TestComponent(useSelectProduct)
const productMock = {
  id: 1,
  name: 'Test',
  description: 'test',
  reference: '121544',
}
const localStorage = useLocalStorage()
localStorage.addLocalStorage = jest.fn()

describe('useSelectProduct composable', () => {
  it ('Should trigger selectProduct function and save it in localStorage and vuex', async () => {
    const wrapper = mount(Component, {
      global: {
        plugins: [store, router],
      }
    })

    wrapper.vm.selectProduct(productMock)
    localStorage.addLocalStorage('selectedProduct', JSON.stringify(productMock))

    expect(setSelectedProductMock).toHaveBeenCalled()
    expect(localStorage.addLocalStorage).toHaveBeenCalledWith('selectedProduct', JSON.stringify(productMock))
  })
})