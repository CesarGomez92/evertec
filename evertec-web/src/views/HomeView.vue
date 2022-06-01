<template>
  <div class="flex flex-wrap p-2 justify-center w-full">
    <product-item
      class="m-2"
      v-for="(product, key) in products"
      :key="key"
      :product="product" />
  </div>
</template>

<script>
import { useFetchProducts } from '@/composables';
import ProductItem from '@/components/ProductItem.vue';

export default {
  name: 'HomeView',
  components: {
    ProductItem,
  },
  setup() {
    const {
      products,
    } = useFetchProducts();

    return {
      products,
    }
  },
};
</script>
