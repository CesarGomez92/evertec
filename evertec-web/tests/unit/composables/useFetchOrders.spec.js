import { mount } from '@vue/test-utils'
import { EVERTEC_API } from '@/services'
import { createRouter, createWebHistory } from 'vue-router'
import { TestComponent } from '../../utils/testComponent'
import { useFetchOrders } from '@/composables'
import { routes } from "@/router"

const ordersMock = {
  data: [{
    id: 1,
    customer_name: 'Test',
    customer_lastname: 'test',
    reference: '121544',
    requestId: 123
  }]
}

const router = createRouter({
  history: createWebHistory(),
  routes,
})

const Component = TestComponent(useFetchOrders)

describe('useFetchOrders composable', () => {
  it ('Should fetch all orders', async () => {
    jest.spyOn(EVERTEC_API, 'get').mockReturnValueOnce(Promise.resolve(ordersMock))
    const wrapper = mount(Component, {
      global: {
        plugins: [router],
      }
    })

    await wrapper.vm.$nextTick()
    
    expect(EVERTEC_API.get).toHaveBeenCalled()
    expect(wrapper.vm.orders).toEqual(ordersMock.data)
  })
})