import { ref, onMounted } from 'vue'
import { useStore } from 'vuex'

export function useFetchProducts() {
  const store = useStore()
  const products = ref([])
  const fetchProducts = async () => {
    const result = await store.dispatch('productsModule/getProducts')
    products.value = result
  }

  onMounted(() => fetchProducts())

  return {
    fetchProducts,
    products,
  }
}
