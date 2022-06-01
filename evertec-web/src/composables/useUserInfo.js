import { ref, onMounted } from 'vue'
import { useStore } from 'vuex'

export function useUserInfo() {
  const store = useStore()
  const userData = ref({
    customer_identification_type: '',
    customer_identification: '',
    customer_name: '',
    customer_surname: '',
    customer_email: '',
    customer_mobile: '',
    customer_country: '',
    customer_state: '',
    customer_city: '',
    customer_postal_code: '',
    customer_street: '',
    reference: '',
    price: 0,
    description: '',
  })
  const selectedProduct = ref({})

  const getSelectedProduct = () => {
    selectedProduct.value = typeof store.getters['productsModule/selectedProduct'] === 'object'
      ? store.getters['productsModule/selectedProduct']
      : JSON.parse(store.getters['productsModule/selectedProduct'])
  }

  const setMissingData = () => {
    userData.value.reference = selectedProduct.value.reference
    userData.value.price = selectedProduct.value.price
    userData.value.description = selectedProduct.value.name
  }

  onMounted(() => {
    getSelectedProduct()
    setMissingData()
  })

  return {
    userData,
    getSelectedProduct,
    selectedProduct,
    setMissingData,
  }
}
