<template>
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg w-5/6 mx-auto">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" class="px-6 py-3">
            Identification
          </th>
          <th scope="col" class="px-6 py-3">
            First name
          </th>
          <th scope="col" class="px-6 py-3">
            Last name
          </th>
          <th scope="col" class="px-6 py-3">
            product
          </th>
          <th scope="col" class="px-6 py-3">
            reference
          </th>
          <th scope="col" class="px-6 py-3">
            status
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(order, key) in orders"
          :key="key"
          class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
        >
          <th
            scope="row"
            class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
          >
            {{ order.customer_identification }}
          </th>
          <td class="px-6 py-4">
            {{ order.customer_name }}
          </td>
          <td class="px-6 py-4">
            {{ order.customer_surname }}
          </td>
          <td class="px-6 py-4">
            {{ order.product?.name }}
          </td>
          <td class="px-6 py-4">
            {{ order.reference }}
          </td>
          <td class="px-6 py-4">
            {{ order.status }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { useFetchOrders } from '@/composables';

export default {
  name: 'OrderListView',
  setup() {
    const {
      orders,
    } = useFetchOrders();

    return {
      orders,
    }
  },
};
</script>
