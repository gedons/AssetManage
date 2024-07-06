<template>
    <div class="min-h-screen p-6 bg-gray-100">
        <div class="container mx-auto p-8 rounded shadow-md">
          <h2 class="text-2xl font-semibold mb-6">Available Users</h2>
    
          <div class="overflow-x-auto bg-white p-10 rounded-lg">
            <table class="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th class="py-2 px-4 text-left font-semibold">Name</th>
                  <th class="py-2 px-4 text-left font-semibold">Email</th>
                  <th class="py-2 px-4 text-left font-semibold">Role</th>
                  <th class="py-2 px-4 text-left font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>              
                <h1 v-if="isLoading" class="loader mr-2"></h1>
                <tr v-else v-for="user in users" :key="user._id" class="hover:bg-gray-100">
                  <td class="py-2 px-4 font-semibold">{{ user.name }}</td>
                  <td class="py-2 px-4 font-semibold">{{ user.email }}</td>
                  <td class="py-2 px-4 font-semibold">{{ user.role }}</td>
                  <td class="py-2 px-4 font-semibold">
                    <button 
                      @click="setEditUser(user)" 
                      class="text-black font-semibold underline mr-2"
                    >
                      Edit
                    </button>
                    <button 
                      @click="deleteUser(user._id)" 
                      class="text-red-600 font-semibold underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
    
          <!-- Added a gap between the table and the form -->
          <div class="bg-white p-9 mt-10 rounded-lg">
            <h2 class="text-2xl font-semibold mb-6">Edit User Details</h2>
            <form @submit.prevent="addUser" class="mt-8 flex flex-col gap-4">
              <h2 class="text-2xl font-semibold mb-6">{{ editMode ? 'Edit User' : '' }}</h2>
              <div class="flex flex-col">
                <label for="name">Name</label>
                <input 
                  v-model="newUser.name" 
                  type="text" 
                  placeholder="Name" 
                  required 
                  class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-gray-600"
                  id="name"
                />
              </div>
              <div class="flex flex-col">
                <label for="email">Email</label>
                <input 
                  v-model="newUser.email" 
                  type="email" 
                  placeholder="Email" 
                  required 
                  class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-gray-600"
                  id="email"
                />
              </div>
              <div class="flex flex-col">
                <label for="role">Role</label>
                <select 
                  v-model="newUser.role" 
                  required 
                  class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-gray-600"
                  id="role"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div>
                <button 
                  type="submit" 
                  class="w-full bg-gray-800 hover:bg-gray-900 text-white font-semibold py-2 px-4 rounded flex items-center justify-center"
                >
                <span v-if="isLoading" class="loader mr-2"></span>
                {{ editMode ? 'Update User' : '' }}
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
  
  export default {
    data() {
      return {
        users: [],
        newUser: {
          name: '',
          email: '',
          role: 'user',
        },
        editMode: false,
        editingUserId: null,
        isLoading: false, 
      };
    },
    created() {
      this.fetchUsers();
    },
    methods: {
      async fetchUsers() {
        this.isLoading = true;
        try {
          const response = await axios.get('https://api-assetmange.onrender.com/api/users', {
            headers: { Authorization: `Bearer ${store.state.token}` }
          });
          this.users = response.data;
        //   this.$toast.success('Users Fetched Successfully',{timeout :5000});
        } catch (error) {
          console.error('Error fetching users:', error);
          this.$toast.error('Error Fetching Users',error,{timeout :5000});
        }
        finally{
          this.isLoading = false;
        }
      },
      async addUser() {
        try {
          
          if (this.editMode) {
            this.isLoading = true;
            await axios.put(`https://api-assetmange.onrender.com/api/users/${this.editingUserId}`, this.newUser, {
              headers: { Authorization: `Bearer ${store.state.token}` }
            });
            this.editMode = false;
            this.editingUserId = null;
            this.$toast.success('Users Updated Successfully',{timeout :5000});
          } else {
            const response = await axios.post('https://api-assetmange.onrender.com/api/users', this.newUser, {
              headers: { Authorization: `Bearer ${store.state.token}` }
            });
            this.users.push(response.data);
            this.$toast.success('Users Added Successfully',{timeout :5000});
          }
          this.newUser = { name: '', email: '', role: 'user' };
          this.fetchUsers();
        } catch (error) {
          console.error('Error adding/updating user:', error);
        }finally{
          this.isLoading = false;
        }
      },
      async deleteUser(userId) {
        try {
          await axios.delete(`https://api-assetmange.onrender.com/api/users/${userId}`, {
            headers: { Authorization: `Bearer ${store.state.token}` }
          });
          this.users = this.users.filter(user => user._id !== userId);
          this.$toast.info('Users Deleted Successfully',{timeout :5000});
        } catch (error) {
          console.error('Error deleting user:', error);
        }
      },
      setEditUser(user) {
        this.editMode = true;
        this.editingUserId = user._id;
        this.newUser = { name: user.name, email: user.email, role: user.role };
      },
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
  