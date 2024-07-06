<template>
    <div class="min-h-screen bg-gray-100">
      <header class="bg-gray-900 text-white py-4 shadow ">
        <div class="container mx-auto flex justify-between items-center px-6">
          <h1 class="text-2xl font-semibold">Admin Dashboard</h1>
          <button 
            @click="logoutUser" 
            class="bg-white hover:bg-gray-200 text-gray-900 font-semibold py-2 px-4 rounded"
          >
            Logout
          </button>
        </div>
      </header>
  
      <nav class="bg-white shadow mt-4">
        <div class="container mx-auto flex justify-around py-4">
          <router-link 
            :to="{ name: 'UserManagement' }"
            class="text-white py-3 px-3 rounded-lg bg-gray-800  font-semibold"
          >
          Manage User 
          </router-link>
          <router-link 
            to="/admin/asset-management"
            class="text-white py-3 px-3 rounded-lg rounded-lm bg-gray-800  font-semibold"
          >
          Manage Asset 
          </router-link>
          <router-link 
            to="/admin/reports"
            class="text-white py-3 px-3 rounded-lg bg-gray-800  font-semibold"
          >
            Requests
          </router-link>
        </div>
      </nav>
  
      <main class="container mx-auto mt-6 px-6">
        <router-view></router-view>
      </main>
    </div>
</template>
  
  <script>
  import { mapActions } from 'vuex';
  
  export default {
    methods: {
      ...mapActions(['logout']),
      logoutUser() {
        this.logout();
        this.$router.push('/');
      },
    },
  };
  </script>
  