import { EVERTEC_API } from '@/services'

export default {
  async getProducts({ commit }) {
    try {
      const response = await EVERTEC_API.get('/api/products')
      commit('setProducts', response.data)
      return response.data
    } catch (error) {
      console.log(error)
      throw error
    }
  },

  setSelectedProduct({ commit }, product) {
    commit('setSelectedProduct', product)
  },

  setRequestId({ commit }, requestId) {
    commit('setRequestId', requestId)
  },

  setProcessUrl({ commit }, processUrl) {
    commit('setProcessUrl', processUrl)
  },

  setIsLoadinig({ commit }, isLoading) {
    commit('setIsLoading', isLoading)
  },
}
