<template>
  <div class="relative bg-white border-b-2 mb-2">
    <div class="w-full mx-auto px-4 sm:px-6">
      <div
        class="flex justify-between items-center py-6 md:justify-start md:space-x-10"
      >
        <nav class="space-x-10 flex items-center uppercase text-yellow-500">
          <router-link to="/">
            <img
              class="h-8 w-auto sm:h-10"
              src="https://www.evertecinc.com/wp-content/uploads/2020/07/logo-evertec.png"
              alt="logo"
            />
          </router-link>
          <router-link to="/" class="text-xl font-bold">
            products
          </router-link>
          <router-link to="/order-list" class="text-xl font-bold">
            Order list
          </router-link>
        </nav>
      </div>
    </div>
  </div>
  <router-view/>
</template>
