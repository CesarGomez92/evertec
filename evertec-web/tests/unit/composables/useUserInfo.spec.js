import { mount } from '@vue/test-utils'
import { createStore } from 'vuex'
import { createRouter, createWebHistory } from 'vue-router'
import { TestComponent } from '../../utils/testComponent'
import { useUserInfo } from '@/composables'
import { routes } from "@/router"


const selectedProductMock = jest.fn()

function setupStore(mock) {
  return createStore({
    modules: {
      productsModule: {
        namespaced: true,
        getters: {
          selectedProduct: mock
        }
      }
    }
  })
}

const router = createRouter({
  history: createWebHistory(),
  routes,
})
const productMock = {
  id: 1,
  name: 'Test',
  description: 'test',
  reference: '121544',
  price: 0
}
const Component = TestComponent(useUserInfo)

describe('useUserInfo composable', () => {
  it ('Should trigger getSelectedProduct and setMissingData and perform actions', async () => {
    selectedProductMock.mockImplementation(() => productMock)
    const store = setupStore(selectedProductMock)
    const wrapper = mount(Component, {
      global: {
        plugins: [store, router],
      }
    })

    wrapper.vm.getSelectedProduct()
    wrapper.vm.setMissingData()

    expect(wrapper.vm.selectedProduct).toEqual(productMock)
    expect(wrapper.vm.userData.reference).toEqual(productMock.reference)
    expect(wrapper.vm.userData.price).toEqual(productMock.price)
    expect(wrapper.vm.userData.description).toEqual(productMock.name)
  })

  it ('Should trigger getSelectedProduct and setMissingData and perform actions with stringified JSON', async () => {
    selectedProductMock.mockImplementation(() => JSON.stringify(productMock))
    const store = setupStore(selectedProductMock)
    const wrapper = mount(Component, {
      global: {
        plugins: [store, router],
      }
    })

    wrapper.vm.getSelectedProduct()
    wrapper.vm.setMissingData()

    expect(wrapper.vm.selectedProduct).toEqual(productMock)
    expect(wrapper.vm.userData.reference).toEqual(productMock.reference)
    expect(wrapper.vm.userData.price).toEqual(productMock.price)
    expect(wrapper.vm.userData.description).toEqual(productMock.name)
  })
})