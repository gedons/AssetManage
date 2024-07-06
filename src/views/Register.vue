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
                            <h1 class="text-2xl font-semibold">Create New Account Here!!!</h1>
                        </div>
                        <div class="divide-y divide-gray-200">
                            <form @submit.prevent="registerUser">
                            <div class="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                                <div class="relative">
                                    <input autocomplete="off" v-model="name" id="name" name="name" type="text" class="peer text-sm font-semibold placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Full name" />
                                    <label for="email" class="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Full name</label>
                                </div>
                                <div class="relative">
                                    <input autocomplete="off"  v-model="email" id="email" name="email" type="text" class="peer text-sm font-semibold placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Email address" />
                                    <label for="email" class="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Email Address</label>
                                </div>
                                <div class="relative">
                                    <input autocomplete="off" id="password" v-model="password" name="password" type="password" class="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Password" />
                                    <label for="password" class="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Password</label>
                                </div>
                                <div class="relative">
                                    <button type="submit" class="bg-gray-900 flex text-white text-sm font-semibold rounded-md px-3.5 py-3">
                                        <h1 v-if="loading" class="loader mr-2 mt-1"></h1>
                                        Register</button>
                                        <router-link to="/login" class="text-gray-900  font-semibold mt-1 underline text-sm">click to login</router-link>                                  
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
      name: '',
      email: '',
      password: '',
      role: 'user',
      loading: false,
    };
  },
  methods: {
    ...mapActions(['register']),
    async registerUser() {
        try{
            this.loading = true;
            await this.register({
            name: this.name,
            email: this.email,
            password: this.password,
            role: this.role,
        });
        if (this.$store.state.user.role === 'admin') {
            this.$router.push('/admin');
        } else {
            this.$router.push('/user');
        }
        }catch(error){
            console.error('Failed to register', error);
            this.$toast.info('Something Went Wrong. Try Again!', error,{timeout :5000});
        }finally{
            this.loading = false;
        }
    },
  },
};
</script>