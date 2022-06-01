import { mount } from '@vue/test-utils'
import { createStore } from 'vuex'
import { createRouter, createWebHistory } from 'vue-router'
import { TestComponent } from '../../utils/testComponent'
import { EVERTEC_API } from '@/services'
import { useOrderStatus } from '@/composables'
import { routes } from "@/router"


const store = createStore({
  modules: {
    productsModule: {
      namespaced: true,
      getters: {
        requestId: () => 123,
        processUrl: jest.fn()
      }
    }
  }
})
const router = createRouter({
  history: createWebHistory(),
  routes,
})

const Component = TestComponent(useOrderStatus)

describe('useOrderStatus composable', () => {
  it ('Should trigger fetchOrderStatus and get orderStatus APPROVED', async () => {
    jest.spyOn(EVERTEC_API, 'post').mockReturnValueOnce(Promise.resolve({ data: { status: { status: 'APPROVED' } } }))
    jest.spyOn(EVERTEC_API, 'put').mockReturnValueOnce(Promise.resolve())

    const wrapper = mount(Component, {
      global: {
        plugins: [store, router],
      }
    })
    
    await wrapper.vm.$nextTick()
    expect(EVERTEC_API.post).toHaveBeenCalled()
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.orderStatus).toEqual('APPROVED')
    expect(EVERTEC_API.put).toHaveBeenCalled()
  })

  it ('Should trigger fetchOrderStatus and get orderStatus REJECTED', async () => {
    jest.spyOn(EVERTEC_API, 'post').mockReturnValueOnce(Promise.resolve({ data: { status: { status: 'REJECTED' } } }))
    jest.spyOn(EVERTEC_API, 'put').mockReturnValueOnce(Promise.resolve())

    const wrapper = mount(Component, {
      global: {
        plugins: [store, router],
      }
    })
    
    await wrapper.vm.$nextTick()
    expect(EVERTEC_API.post).toHaveBeenCalled()
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.orderStatus).toEqual('REJECTED')
    expect(EVERTEC_API.put).toHaveBeenCalled()
  })
})