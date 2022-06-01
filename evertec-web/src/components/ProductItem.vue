<template>
  <div class="max-w-sm rounded overflow-hidden shadow-lg bg-white">
    <img class="w-full" :src="product.image" alt="Sunset in the mountains">
    <div class="px-6 py-4 h-32">
      <div class="font-bold text-xl mb-2">{{ product.name }}</div>
      <p class="text-gray-700 text-base">
        {{ product.description }}
      </p>
    </div>
    <div class="px-6 pt-4 pb-2 flex justify-between items-center">
      <span class="text-green-500">${{ product.price }}</span>
      <button
        v-if="showButton"
        class="button-style"
        @click="selectProduct(product)"
      >
        Comprar
      </button>
    </div>
  </div>
</template>
<script>
import { useSelectProduct } from '@/composables/useSelectProduct'

export default {
  props: {
    product: {
      default: {},
    },
    showButton: {
      default: true,
    },
  },
  setup() {
    const {
      selectProduct,
    } = useSelectProduct();

    return {
      selectProduct,
    }
  },
}
</script>
<style scoped>
  .button-style {
    @apply bg-blue-500 hover:bg-blue-700 text-white px-3 py-1;
    @aplly font-bold py-2 px-4 border border-blue-700 rounded-lg;
  }
</style>
