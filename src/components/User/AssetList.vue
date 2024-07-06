<template>
    <div>
      <h3 class="text-xl font-semibold mb-4">Available Assets</h3>
      <ul class="divide-y divide-gray-200">        
        <li v-for="asset in assets" :key="asset._id" class="py-2">
          <div class="flex items-center justify-between">            
            <div class="flex items-center">
                <img :src="asset.imageUrl" alt="Asset Image" class="h-12 w-12 object-contain mr-4">
                <div>
                  <h4 class="font-semibold">{{ asset.model }}</h4>
                  <p class="text-sm text-gray-500">{{ asset.serialNumber }}</p>
                  <p class="text-sm text-gray-500">{{ asset.inStock ? 'Yes' : 'No' }}</p>
                  <p class="text-sm text-gray-500">Quanity: x {{ asset.quantity }}</p>
                </div>
            </div>
            <button 
              @click="requestAsset(asset._id)" 
              :class="['text-white font-semibold py-1 px-2 rounded', {
                'bg-gray-800 hover:bg-gray-900 cursor-pointer': asset.inStock,
                'bg-gray-400 cursor-not-allowed': !asset.inStock
              }]"
              :disabled="!asset.inStock"
            >
              Request
            </button>
          </div>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import store from '../../store';
  
  export default {
    data() {
      return {
        assets: [],
      };
    },
    methods: {
      async fetchAssets() {
        try {
         const response = await axios.get('https://api-assetmange.onrender.com/api/assets', {
            headers: { Authorization: `Bearer ${store.state.token}` }
          });
          this.assets = response.data;
        } catch (error) {
          console.error('Failed to fetch assets:', error);
        }
      },
      async requestAsset(assetId) {
        try {
          await axios.post(
            'https://api-assetmange.onrender.com/api/requests',
            { assetId },
            { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
          );
          this.$toast.success('Request Made Successfully',{timeout :5000});
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
  