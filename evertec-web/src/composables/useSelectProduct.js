import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { useLocalStorage } from './useLocalStorage'

export function useSelectProduct() {
  const store = useStore()
  const router = useRouter()
  const {
    addLocalStorage,
  } = useLocalStorage()

  const selectProduct = (product) => {
    store.dispatch('productsModule/setSelectedProduct', product)
    addLocalStorage('selectedProduct', JSON.stringify(product))
    router.push('/detail')
  }

  return {
    selectProduct,
  }
}
