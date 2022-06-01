import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { EVERTEC_API } from '@/services'
import { useStore } from 'vuex'
import { useLocalStorage } from './useLocalStorage'

export function useCreateOrder() {
  const {
    addLocalStorage,
  } = useLocalStorage()
  const store = useStore()
  const router = useRouter()
  const errors = ref([])
  const createOrder = async (payload) => {
    try {
      store.dispatch('productsModule/setIsLoading', true)
      const response = await EVERTEC_API.post('/api/order/create', payload)
      addLocalStorage('requestId', response.data.requestId)
      addLocalStorage('processUrl', response.data.processUrl)
      store.dispatch('productsModule/setRequestId', response.data.requestId)
      store.dispatch('productsModule/setProcessUrl', response.data.processUrl)
      window.open(response.data.processUrl)
      router.push('/status')
      store.dispatch('productsModule/setIsLoading', false)
    } catch (error) {
      store.dispatch('productsModule/setIsLoading', false)
      errors.value.push(error.response)
    }
  }

  const getIsLoading = () => store.getters['productsModule/isLoading']

  const validateFields = (userData) => {
    errors.value = []
    if (userData.customer_identification_type === '') {
      errors.value.push('Debes seleccionar el tipo de documento')
    }
    if (userData.customer_identification === '') {
      errors.value.push('the field document is required')
    }
    if (Number.isNaN(userData.customer_identification)) {
      errors.value.push('el campo identification debe ser numerico')
    }
    if (userData.customer_name === '') {
      errors.value.push('the field name is required')
    }
    if (userData.customer_name.length > 80) {
      errors.value.push('el campo name no puede ser superior a 80 caracteres')
    }
    if (userData.customer_surname === '') {
      errors.value.push('the last name field is required')
    }
    if (userData.customer_email === '') {
      errors.value.push('the email field is required')
    }
    if (userData.customer_email.length > 120) {
      errors.value.push('el campo email no puede ser superior a 120 caracteres')
    }
    if (userData.customer_mobile === '') {
      errors.value.push('the mobile field is required')
    }
    if (Number.isNaN(userData.customer_mobile)) {
      errors.value.push('el campo mobile debe ser numerico')
    }
    if (userData.customer_mobile.length > 40) {
      errors.value.push('el campo name no puede ser superior a 40 caracteres')
    }
    if (userData.customer_country === '') {
      errors.value.push('the country field is required')
    }
    if (userData.customer_state === '') {
      errors.value.push('the state field is required')
    }
    if (userData.customer_city === '') {
      errors.value.push('the city field is required')
    }
    if (userData.customer_postal_code === '') {
      errors.value.push('the postal code field is required')
    }
    if (Number.isNaN(userData.customer_postal_code)) {
      errors.value.push('el campo postal code debe ser numerico')
    }
    if (userData.customer_street === '') {
      errors.value.push('the street code field is required')
    }
    if (!errors.value.length) {
      createOrder(userData)
    }
  }

  return {
    createOrder,
    validateFields,
    getIsLoading,
    errors,
  }
}
