<template>
    <div class="mt-8">
      <h3 class="text-xl font-semibold mb-4">Request an Asset</h3>
      <form @submit.prevent="requestAsset">
        <select v-model="selectedAsset" class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600">
          <option disabled value="">Select an asset</option>
          <option v-for="asset in assets" :key="asset._id" :value="asset._id">{{ asset.name }}</option>
        </select>
        <button 
          type="submit" 
          class="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Request
        </button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        selectedAsset: '',
        assets: [],
      };
    },
    methods: {
      async fetchAssets() {
        try {
          const response = await axios.get('http://localhost:5000/api/assets');
          this.assets = response.data;
        } catch (error) {
          console.error('Failed to fetch assets:', error);
        }
      },
      async requestAsset() {
        try {
          await axios.post(
            'http://localhost:5000/api/requests',
            { assetId: this.selectedAsset },
            { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
          );
          // Optionally, notify the user or update UI after successful request
        } catch (error) {
          console.error('Failed to request asset:', error);
        }
      },
    },
    created() {
      this.fetchAssets();
    },
  };
  </script>
  
  <style>
  /* Add any additional styling here if needed */
  </style>
  