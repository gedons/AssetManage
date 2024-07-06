<template>
  <div class="min-h-screen bg-gray-100">
    <header class="bg-gray-900 text-white py-4 shadow ">
      <div class="container mx-auto flex justify-between items-center px-6">
        <h1 class="text-2xl font-semibold">User Dashboard</h1>
        <button 
          @click="logoutUser" 
          class="bg-white hover:bg-gray-200 text-gray-900 font-semibold py-2 px-4 rounded"
        >
          Logout
        </button>
      </div>
    </header>
    <div class="container mx-auto bg-white mt-8 p-8 rounded shadow-md">
      <h2 class="text-2xl font-bold mb-6">User Dashboard</h2>
      
      <!-- Display Asset List Component -->
      <AssetList />

      <!-- Request Asset Component -->
      <!-- <RequestAsset /> -->
    </div>
  </div>
</template>
  
  <script>
  import { mapActions } from 'vuex';
  import AssetList from '../components/User/AssetList.vue';
  import RequestAsset from '../components/User/RequestAsset.vue';
  
  export default {
    components: {
      AssetList,
      RequestAsset,
    },
    methods: {
      ...mapActions(['logout']),
      logoutUser() {
        this.logout();
        this.$router.push('/');
      },
    },
  };
  </script>
  