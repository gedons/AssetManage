<template>
    <div class="min-h-screen bg-gray-100 p-6">
      <div class="container mx-auto p-8 rounded shadow-md">
        <h2 class="text-2xl font-bold mb-6">Asset Management</h2>
        <div class="overflow-x-auto bg-white p-8">
          <table class="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th class="py-2 px-4 text-left font-medium">Serial Number</th>
                <th class="py-2 px-4 text-left font-medium">Image</th>
                <th class="py-2 px-4 text-left font-medium">Model</th>
                <th class="py-2 px-4 text-left font-medium">Location</th>
                <th class="py-2 px-4 text-left font-medium">Date</th>
                <th class="py-2 px-4 text-left font-medium">Qty</th>
                <th class="py-2 px-4 text-left font-medium">In Stock</th>
                <th class="py-2 px-4 text-left font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              <h1 v-if="isLoading" class="loader mr-2"></h1>
              <tr v-else v-for="asset in assets" :key="asset._id" class="hover:bg-gray-100">
                <td class="py-2 px-4 font-semibold">{{ asset.serialNumber }}</td>
                <td class="py-2 px-4 font-semibold">
                  <img v-if="asset.imageUrl" :src="asset.imageUrl" class="w-20 h-20 rounded-full object-cover mr-4" alt="Asset Image" />
                </td>
                <td class="py-2 px-4 font-semibold">{{ asset.model }}</td>
                <td class="py-2 px-4 font-semibold">{{ asset.location }}</td>
                <td class="py-2 px-4 font-semibold">
                  <span>Purchased Date:</span>
                  {{ formatDate(asset.purchaseDate) }}
                  <br>
                  <span>Warranty Date:</span>
                  {{ formatDate(asset.warranty) }}
                </td>
                <td class="py-2 px-4 font-semibold">{{ asset.quantity }}</td>
                <td class="py-2 px-4 font-semibold">{{ asset.inStock ? 'Yes' : 'No' }}</td>
                <td class="py-2 px-4 font-semibold">
                  <button class="text-black font-semibold underline" @click="setEditAsset(asset)">Edit</button>
                  <button class="text-red-600 font-semibold underline md:ml-1" @click="deleteAsset(asset._id)">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
  
        <!-- Added a gap between the table and the form -->
        <div class="mt-10 bg-white p-8 rounded shadow-md">
          <form @submit.prevent="addAsset" class="mt-8 flex flex-col gap-4">
            <div class="flex flex-col">
              <label for="serialNumber">Serial Number</label>
              <input
                v-model="newAsset.serialNumber"
                type="text"
                placeholder="Serial Number"
                required
                class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                id="serialNumber"
              />
            </div>
            <div class="flex flex-col">
              <label for="model">Model</label>
              <input
                v-model="newAsset.model"
                type="text"
                placeholder="Model"
                required
                class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                id="model"
              />
            </div>
            <div class="flex flex-col">
              <label for="purchaseDate">Purchase Date</label>
              <input
                v-model="newAsset.purchaseDate"
                type="date"
                placeholder="Purchase Date"
                required
                class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                id="purchaseDate"
              />
            </div>
            <div class="flex flex-col">
              <label for="warranty">Warranty</label>
              <input
                v-model="newAsset.warranty"
                type="date"
                placeholder="Warranty"
                required
                class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                id="warranty"
              />
            </div>
            <div class="flex flex-col">
              <label for="location">Location</label>
              <input
                v-model="newAsset.location"
                type="text"
                placeholder="Location"
                required
                class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                id="location"
              />
            </div>
            <div class="flex flex-col">
              <label for="quantity">Quantity</label>
              <input
                v-model="newAsset.quantity"
                type="number"
                placeholder="Quantity"
                required
                class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                id="quantity"
              />
            </div>
            <div class="flex flex-col">
              <label for="inStock">In Stock</label>
              <select v-model="newAsset.inStock" class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600" id="inStock">
                <option value="true">In Stock</option>
                <option value="false">Out of Stock</option>
              </select>
            </div>
            <div class="flex flex-col">
              <label for="assetImage">Asset Image</label>
              <input type="file" @change="onFileChange"  class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600" id="assetImage" />
            </div>
            <div>
              <button 
                  type="submit" 
                  class="w-full bg-gray-800 hover:bg-gray-900 text-white font-semibold py-2 px-4 rounded flex items-center justify-center"
                >
                <span v-if="isLoading" class="loader mr-2"></span>
                {{ editMode ? 'Update Asset' : 'Add Asset' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  
  <script>
  import axios from 'axios';
  import store from '../../store';
  import moment from 'moment';
  
  export default {
    data() {
      return {
        assets: [],
        newAsset: {
          serialNumber: '',
          model: '',
          purchaseDate: '',
          warranty: '',
          location: '',
          quantity: 1,
          inStock: true,
          image: null,
        },
        editMode: false,
        editingAssetId: null,
        isLoading: false, 
      };
    },
    created() {
      this.fetchAssets();
    },    
    methods: {
      async fetchAssets() {
        this.isLoading = true;
        try {
          const response = await axios.get('https://api-assetmange.onrender.com/api/assets', {
            headers: { Authorization: `Bearer ${store.state.token}` }
          });
          this.assets = response.data;
        } catch (error) {
          console.error('Error fetching assets:', error);
        }finally{
          this.isLoading = false;
        }
      },
      onFileChange(e) {
        this.newAsset.image = e.target.files[0];
      },
      async addAsset() {
        try {
          this.isLoading = true;
          const formData = new FormData();
          for (const key in this.newAsset) {
            formData.append(key, this.newAsset[key]);
          }
          if (this.editMode) {
            await axios.put(`https://api-assetmange.onrender.com/api/assets/${this.editingAssetId}`, formData, {
              headers: { Authorization: `Bearer ${store.state.token}` }
            });
            this.editMode = false;
            this.editingAssetId = null;
            this.$toast.success('Asset Updated Successfully',{timeout :5000});
          } else {
            this.isLoading = true;
            const response = await axios.post('https://api-assetmange.onrender.com/api/assets', formData, {
              headers: { Authorization: `Bearer ${store.state.token}` }
            });
            this.$toast.success('Asset Added Successfully',{timeout :5000});
            this.assets.push(response.data);
          }
          this.newAsset = {
            serialNumber: '',
            model: '',
            purchaseDate: '',
            warranty: '',
            location: '',
            quantity: 1,
            inStock: true,
            image: null,
          };
          this.fetchAssets();
        } catch (error) {
          console.error('Error adding/updating asset:', error);
        }finally{
          this.isLoading = false;
        }
      },
      async deleteAsset(assetId) {
        try {
          await axios.delete(`https://api-assetmange.onrender.com/api/assets/${assetId}`, {
            headers: { Authorization: `Bearer ${store.state.token}` }
          });
          this.assets = this.assets.filter(asset => asset._id !== assetId);
          this.$toast.info('Asset Deleted Successfully',{timeout :5000});
        } catch (error) {
          console.error('Error deleting asset:', error);
        }
      },
      setEditAsset(asset) {
        this.editMode = true;
        this.editingAssetId = asset._id;
        this.newAsset = {
          serialNumber: asset.serialNumber,
          model: asset.model,
          purchaseDate: asset.purchaseDate,
          warranty: asset.warranty,
          location: asset.location,
          quantity: asset.quantity,
          inStock: asset.inStock,
          image: null,
        };
      },
      formatDate(date){
        const options = {year: 'numeric', month : 'long', day: 'numeric'};
        return new Date(date).toLocaleDateString('en-US', options);
      }
    },
  };
  </script>
  <style>
  .loader {
    border: 2px solid #f3f3f3;
    border-top: 2px solid #3498db;
    border-radius: 50%;
    width: 14px;
    height: 14px;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  </style>