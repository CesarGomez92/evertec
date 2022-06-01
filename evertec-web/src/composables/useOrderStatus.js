import { ref, onMounted, computed } from 'vue'
import { EVERTEC_API } from '@/services'
import { useStore } from 'vuex'

export function useOrderStatus() {
  const store = useStore()
  const orderStatus = ref('CREATED')
  const orderTimeout = ref('')
  const isProcessFinished = computed(() => (
    orderStatus.value === 'REJECTED' || orderStatus.value === 'APPROVED'
  ))
  const fetchOrderStatus = () => {
    const requestId = store.getters['productsModule/requestId']
    EVERTEC_API.post(`/api/order/${requestId}`).then((response) => {
      orderStatus.value = response.data.status.status
      if (orderStatus.value === 'REJECTED' || orderStatus.value === 'APPROVED') {
        clearTimeout(orderTimeout.value)
        EVERTEC_API.put(`/api/orders/${requestId}`, {
          status: orderStatus.value,
        }).then()
      } else {
        orderTimeout.value = setTimeout(() => fetchOrderStatus(), 2000)
      }
    }).catch((error) => console.log(error))
  }

  const continuePayment = () => {
    const processUrl = store.getters['productsModule/processUrl']
    window.open(processUrl)
  }

  onMounted(() => fetchOrderStatus())

  return {
    orderStatus,
    continuePayment,
    isProcessFinished,
  }
}
