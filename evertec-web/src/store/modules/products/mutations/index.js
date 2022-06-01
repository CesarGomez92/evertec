export default {
  setProducts(state, products) {
    state.products = products
  },
  setSelectedProduct(state, product) {
    state.selectedProduct = product
  },
  setRequestId(state, requestId) {
    state.requestId = requestId
  },
  setProcessUrl(state, processUrl) {
    state.processUrl = processUrl
  },
  setIsLoading(state, isLoading) {
    state.isLoading = isLoading
  },
}
