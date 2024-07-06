<template>
    <div>      
        <div class="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
            <div class="relative py-3 sm:max-w-xl sm:mx-auto">
                <div
                    class="absolute inset-0 bg-gradient-to-r from-gray-300 to-gray-900 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
                </div>
                <div class="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                    <div class="max-w-md mx-auto">
                        <div>
                            <h1 class="text-2xl font-semibold">Log In To Account Here!!!</h1>
                        </div>
                        <div class="divide-y divide-gray-200">
                            <form @submit.prevent="loginUser">
                            <div class="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">                               
                                <div class="relative">
                                    <input autocomplete="off" id="email" v-model="email" name="email" type="text" class="peer text-sm font-semibold placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Email address" />
                                    <!-- <label for="email" class="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Email Address</label> -->
                                </div>
                                <div class="relative">
                                    <input autocomplete="off" id="password" v-model="password" name="password" type="password" class="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Password" />
                                    <!-- <label for="password" class="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Password</label> -->
                                </div>
                                <div class="relative">
                                    <button type="submit" class="bg-gray-900 text-white text-sm flex font-semibold rounded-md px-3.5 py-3">
                                      <h1 v-if="loading" class="loader mr-2 mt-1"></h1>
                                      Login</button>  
                                      <router-link to="/register" class="text-gray-900  font-semibold mt-1 underline text-sm">click to register</router-link>                                  
                                </div>
                               
                            </div>
                        </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      email: '',
      password: '',
      loading: false,
    };
  },
  methods: {
    ...mapActions(['login']),
    async loginUser() {
      try{
        this.loading = true;
        await this.login({ email: this.email, password: this.password });
        if (this.$store.state.user.role === 'admin') {
          this.$router.push('/admin');
          this.$toast.success('Logged In Successfully',{timeout :5000});
        } else {
          this.$router.push('/user');
          this.$toast.success('Logged In Successfully',{timeout :5000});
        }
      }catch(error){
        console.error('Failed to log in:', error);
        this.$toast.info('Something Went Wrong. Try Again!', error,{timeout :5000});
      }finally{
        this.loading = false;
      }
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