import { ref, onMounted } from 'vue'
import { EVERTEC_API } from '@/services'

export function useFetchOrders() {
  const orders = ref([])
  const fetchOrders = async () => {
    try {
      const response = await EVERTEC_API.get('/api/orders')
      orders.value = response.data
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  onMounted(() => fetchOrders())

  return {
    fetchOrders,
    orders,
  }
}
