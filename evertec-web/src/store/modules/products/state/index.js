import { useLocalStorage } from '@/composables/useLocalStorage'

const {
  getLocalStorage,
} = useLocalStorage()
export default {
  products: [],
  selectedProduct: getLocalStorage('selectedProduct') || {},
  requestId: getLocalStorage('requestId') || 0,
  processUrl: getLocalStorage('processUrl') || '',
  isLoading: false,
}
