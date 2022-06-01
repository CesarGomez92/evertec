<template>
  <div class="flex justify-between w-1/2">
    <div class="w-full max-w-lg bg-white shadow-lg p-4 rounded-lg">
      <div v-if="errors.length" class="w-full max-w-lg bg-red-200 shadow-lg p-4 rounded-lg mb-4">
        <ul class="pl-4 list-disc">
          <li v-for="(error, key) in errors" :key="key" class="text-red-600">{{ error }}</li>
        </ul>
      </div>
      <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label class="label-form" for="document-type">
            Document type
          </label>
          <div class="relative">
            <select
              v-model="userData.customer_identification_type"
              class="input-form cursor-pointer"
              id="document-type"
            >
              <option value="cc">CC</option>
            </select>
          </div>
        </div>
        <div class="w-full md:w-1/2 px-3">
          <label for="last-document" class="label-form">
            Document
          </label>
          <input
            class="input-form"
            v-model="userData.customer_identification"
            id="document"
            type="text"
            placeholder="123456789"
          />
        </div>
      </div>
      <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label class="label-form" for="first-name">
            First Name
          </label>
          <input
            class="input-form"
            v-model="userData.customer_name"
            id="first-name"
            type="text"
            placeholder="Jane"
          />
        </div>
        <div class="w-full md:w-1/2 px-3">
          <label for="last-name" class="label-form">
            Last Name
          </label>
          <input
            v-model="userData.customer_surname"
            class="input-form"
            id="last-name"
            type="text"
            placeholder="Doe"
          />
        </div>
      </div>
      <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full px-3">
          <label class="label-form" for="email">
            email
          </label>
          <input
            v-model="userData.customer_email"
            class="input-form"
            id="email"
            type="text"
            placeholder="example@example.com"
          />
        </div>
      </div>
      <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label class="label-form" for="mobile">
            mobile
          </label>
          <input
            v-model="userData.customer_mobile"
            class="input-form"
            id="mobile"
            type="text"
            placeholder="322 266 2244"
          />
        </div>
        <div class="w-full md:w-1/2 px-3">
          <label for="country" class="label-form">
            country
          </label>
          <input
            v-model="userData.customer_country"
            class="input-form"
            id="country"
            type="text"
            placeholder="Colombia"
          />
        </div>
      </div>
      <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label class="label-form" for="state">
            state
          </label>
          <input
            v-model="userData.customer_state"
            class="input-form"
            id="state"
            type="text"
            placeholder="Antioquía"
          />
        </div>
        <div class="w-full md:w-1/2 px-3">
          <label for="city" class="label-form">
            city
          </label>
          <input
            v-model="userData.customer_city"
            class="input-form"
            id="city"
            type="text"
            placeholder="Medellín"
          />
        </div>
      </div>
      <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label class="label-form" for="postal-code">
            Postal code
          </label>
          <input
            v-model="userData.customer_postal_code"
            class="input-form"
            id="postal-code"
            type="text"
            placeholder="002400"
          />
        </div>
        <div class="w-full md:w-1/2 px-3">
          <label for="address" class="label-form">
            Address
          </label>
          <input
            v-model="userData.customer_street"
            class="input-form"
            id="address"
            type="text"
            placeholder="Calle falsa 123"
          />
        </div>
      </div>
      <button
        @click="validateFields(userData)"
        class="button-style"
      >
        Buy
      </button>
    </div>
    <div>
      <product-item
        class="m-2"
        :product="selectedProduct"
        :showButton="false"
      />
    </div>
  </div>
</template>
<script>
import { useUserInfo, useCreateOrder } from '@/composables'
import ProductItem from './ProductItem.vue'

export default {
  components: {
    ProductItem,
  },
  setup() {
    const {
      userData,
      selectedProduct,
    } = useUserInfo()
    const {
      createOrder,
      validateFields,
      errors,
    } = useCreateOrder()

    return {
      userData,
      selectedProduct,
      createOrder,
      validateFields,
      errors,
    }
  },
}
</script>
<style scoped>
  .input-form{
    @apply appearance-none block w-full bg-gray-100 text-gray-700 border;
    @apply rounded py-3 px-4 mb-3 leading-tight;
    @apply focus:outline-none focus:bg-white;
  }
  .label-form{
    @apply block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2;
  }
  .button-style {
    @apply bg-blue-500 hover:bg-blue-700 text-white px-3 py-1 w-full;
    @aplly font-bold py-2 px-4 border border-blue-700 rounded-lg;
  }
</style>
