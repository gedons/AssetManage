<template>
    <div class="min-h-screen bg-gray-100 p-6">
        <div class="container mx-auto bg-white p-8 rounded shadow-md">
          <h2 class="text-2xl font-bold mb-6">Asset Requests</h2>
          <div class="overflow-x-auto">
            <table class="min-w-full bg-white">
              <thead>
                <tr>
                  <th class="py-2 px-4 text-left font-medium">Requester</th>
                  <th class="py-2 px-4 text-left font-medium">Asset</th>
                  <th class="py-2 px-4 text-left font-medium">Status</th>
                  <th class="py-2 px-4 text-left font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="request in requests" :key="request._id" class="hover:bg-gray-100">
                  <td class="py-2 px-4 font-semibold border-b">
                    <span>Name:</span>  {{ request.user.name }}<br>
                    <span>Email:</span>  {{ request.user.email }}
                </td>
                  <td class="py-2 px-4 font-semibold border-b">
                    <span>Model:</span> {{ request.asset.model }}<br>
                    <span>Serial Number:</span> {{ request.asset.serialNumber }}
                  </td>
                  <td
                    class="py-2 px-4 font-semibold border-b"
                    :class="{
                      'text-green-500': request.status === 'approved',
                      'text-red-500': request.status === 'rejected',
                    }"
                  >
                    {{ request.status }}
                  </td>
                  <td class="py-2 px-4 font-semibold border-b">
                    <button
                      @click="updateRequestStatus(request._id, 'approved')"
                      class="bg-green-500 hover:bg-green-700 text-white font-semibold py-1 px-2 rounded mr-2"
                      :disabled="request.status === 'approved'"
                    >
                      Approve
                    </button>
                    <button
                      @click="updateRequestStatus(request._id, 'rejected')"
                      class="bg-red-500 hover:bg-red-700 text-white font-semibold md:mt-0 mt-2 py-1 px-2 rounded"
                    >
                      Reject
                    </button>
                   
                    <button
                      @click="deleteRequest(request._id)" 
                      class="text-red-500 underline font-semibold md:ml-2 md:mt-0 mt-2 py-1 px-2 rounded"
                    >
                      Delete
                    </button>
                  </td>
                  
                </tr>
                <p v-if="isLoading"
                @click="deleteRequest(request._id)" 
                class="text-red-500 underline font-semibold md:ml-2 md:mt-0 mt-2 py-1 px-2 rounded"
              >
                Deleting Request
              </p>
              </tbody>
            </table>
          </div>
        </div>
    </div>
</template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        requests: [],
        isLoading: false, 
      };
    },
    methods: {
      async fetchRequests() {
        try {
          const response = await axios.get('https://api-assetmange.onrender.com/api/requests', {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
          });
          this.requests = response.data;
        } catch (error) {
          console.error('Failed to fetch requests:', error);
        }
      },
      async updateRequestStatus(requestId, status) {
        try {
          this.isLoading = true;
          await axios.put(
            `https://api-assetmange.onrender.com/api/requests/${requestId}`,
            { status },
            { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
          );
          this.fetchRequests();
          this.$toast.success('Status Updated Successfully',{timeout :5000});
        } catch (error) {
          console.error(`Failed to update request status:`, error);
        }finally{
            this.isLoading = false;
        }
      },
      async deleteRequest(requestId) {
        try {
          this.isLoading = true;
          await axios.delete(`https://api-assetmange.onrender.com/api/requests/${requestId}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
          });
          this.requests = this.requests.filter(request => request._id !== requestId);
          this.$toast.success('Status Deleted Successfully',{timeout :5000});
        } catch (error) {
          console.error('Failed to delete request:', error);
        }finally{
          this.isLoading = false;
        }
      },
    },
    created() {
      this.fetchRequests();
    },
  };
  </script>
  
  <style>
  /* Add any additional styling here if needed */
  </style>
  