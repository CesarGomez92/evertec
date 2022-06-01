<template>
  <div class="flex flex-col items-center p-2 justify-center w-full">
    <p v-if="orderStatus === 'REJECTED'" class="text-2xl">Your payment has been rejected</p>
    <p
      v-if="orderStatus === 'APPROVED'"
      class="text-2xl"
    >
      Your payment has been made successfully
    </p>
    <p v-else class="text-2xl">Your payment is being processed</p>
    <product-item
      class="m-2"
      :product="selectedProduct"
      :showButton="false"
    />
    <h1 class="text-2xl mt-4">Status</h1>
    <div class="mb-2">
      <p v-if="orderStatus === 'REJECTED'" class="text-3xl text-red-500">
        {{ orderStatus }}
      </p>
      <p v-if="orderStatus === 'APPROVED'" class="text-3xl text-orange-400">
        {{ orderStatus }}
      </p>
      <p v-else class="text-3xl text-orange-400">{{ orderStatus }}</p>
    </div>
    <button
      class="button-style"
      v-if="!isProcessFinished"
      @click="continuePayment"
    >
      Continue payment
    </button>
  </div>
</template>

<script>
import { useUserInfo, useOrderStatus } from '@/composables';
import ProductItem from '@/components/ProductItem.vue'

export default {
  name: 'OrderStatusView',
  components: {
    ProductItem,
  },
  setup() {
    const {
      selectedProduct,
    } = useUserInfo()
    const {
      orderStatus,
      isProcessFinished,
      continuePayment,
    } = useOrderStatus()

    return {
      selectedProduct,
      orderStatus,
      continuePayment,
      isProcessFinished,
    }
  },
};
</script>
<style scoped>
  .button-style{
    @apply bg-blue-500 hover:bg-blue-700 text-white font-bold;
    @apply py-2 px-4 border border-blue-700 rounded;
  }
</style>
