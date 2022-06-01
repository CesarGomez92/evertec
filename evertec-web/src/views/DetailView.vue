<template>
  <div>
    <div class="modal modal-style" v-if="getIsLoading()">
      <div class="modal-overlay absolute w-full h-full bg-black opacity-50"></div>

      <div
        class="modal-container fixed w-full h-full z-50 overflow-y-auto flex items-center relative"
      >
        <div class="modal-content container mx-auto h-auto text-left p-4 text-center z-50 relative">
          <p class="text-3xl font-bold text-white">Loading...</p>
        </div>
      </div>
    </div>

    <div class="flex flex-wrap p-2 justify-center w-full">
      <UserForm></UserForm>
    </div>
  </div>
</template>

<script>
import { useCreateOrder } from '@/composables';
import UserForm from '@/components/UserForm.vue';

export default {
  name: 'DetailView',
  components: {
    UserForm,
  },
  setup() {
    const {
      getIsLoading,
    } = useCreateOrder();

    return {
      getIsLoading,
    }
  },
};
</script>
<style scoped>
  .modal {
    transition: opacity 0.25s ease;
  }
  .modal-style{
    @apply opacity-70 pointer-events-none fixed w-full h-full top-0 left-0;
    @apply flex items-center justify-center z-50 absolute;
  }
</style>
