import { mount } from '@vue/test-utils'
import { createStore } from 'vuex'
import { createRouter, createWebHistory } from 'vue-router'
import { TestComponent } from '../../utils/testComponent'
import { EVERTEC_API } from '@/services'
import { useCreateOrder, useLocalStorage } from '@/composables'
import { routes } from "@/router"


const setIsloadingMock = jest.fn()
const setRequestIdMock = jest.fn()
const setProcessUrlMock = jest.fn()
const store = createStore({
  modules: {
    productsModule: {
      namespaced: true,
      actions: {
        setIsLoading: setIsloadingMock,
        setRequestId: setRequestIdMock,
        setProcessUrl: setProcessUrlMock,
      }
    }
  }
})
const router = createRouter({
  history: createWebHistory(),
  routes,
})

const dataMock = {
  data: {
    requestId: 123,
    processUrl: 'https://myurl.com'
  }
}

const Component = TestComponent(useCreateOrder)
const localStorage = useLocalStorage()
localStorage.addLocalStorage = jest.fn()

describe('useCreateOrder composable', () => {
  it ('Should create an order successfully', async () => {
    jest.spyOn(localStorage, 'addLocalStorage')
    jest.spyOn(EVERTEC_API, 'post').mockReturnValue(Promise.resolve(dataMock))
    jest.spyOn(window, 'open').mockImplementation(() => null)
    const wrapper = mount(Component, {
      global: {
        plugins: [store, router],
      }
    })

    await wrapper.vm.createOrder({})


    expect(setIsloadingMock).toHaveBeenCalled()
    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()
    expect(EVERTEC_API.post).toHaveBeenCalled()
    expect(setRequestIdMock).toHaveBeenCalled()
    expect(setProcessUrlMock).toHaveBeenCalled()
  })
})