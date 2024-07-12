<template>
  <div class="p-6 max-w-4xl mx-auto bg-white rounded-xl shadow-md space-y-4">
    <h2 class="text-2xl font-bold text-gray-800">Assembler</h2>
    
    <div class="flex justify-between">
      <router-link to="/" class="btn btn-secondary">Home</router-link>
      <router-link to="/simulator" class="btn btn-secondary">Simulator</router-link>
    </div>

    <div class="mb-4">
      <h3 class="text-lg font-semibold text-gray-700">Example Assembly Codes</h3>
      <div class="space-y-2">
        <button @click="setExampleCode(example1)" class="btn btn-primary mr-2">Example 1</button>
        <button @click="setExampleCode(example2)" class="btn btn-primary mr-2">Example 2</button>
        <button @click="setExampleCode(example3)" class="btn btn-primary mr-2">Example 3</button>
      </div>
    </div>


    <textarea v-model="assemblyCode" placeholder="Enter assembly code here..." class="w-full h-40 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"></textarea>
    <button @click="assembleCode" class="w-full py-2 px-4 bg-gray-800 text-white font-semibold rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-75">Assemble</button>

    <div v-if="machineCode.length" class="mt-4">
      <h3 class="text-xl font-semibold text-gray-700">Machine Code</h3>
      <ul class="mt-2">
        <li v-for="(code, index) in machineCode" :key="index" class="bg-gray-100 p-2 rounded-md mb-2">{{ code }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      assemblyCode: '',
      machineCode: [],
      example1: 'ADD R1 R2 R3\nLOAD R1 10\nSTORE R1 20',
      example2: 'SUB R2 R3 R4\nLOAD R2 15\nSTORE R2 25',
      example3: 'JUMP 5\nLOAD R3 20\nADD R1 R2 R3'
    };
  },
  methods: {
    async assembleCode() {
      try {
        const response = await axios.post('http://127.0.0.1:5000/assemble', {
          assembly_code: this.assemblyCode
        });
        this.machineCode = response.data.machine_code;
        this.$toast.success('Code Coverted Successfully!!!',{timeout :5000});
      } catch (error) {
        console.error('Error assembling code:', error);
        this.$toast.error('Assemble Code Not Found',{timeout :5000});
      }
    },
    setExampleCode(example) {
      this.assemblyCode = example;
    }
  }
};
</script>

<style scoped>
.btn {
  @apply py-2 px-4 font-semibold rounded-md border transition ease-in-out duration-150;
}
.btn-secondary {
  @apply bg-gray-800 text-white font-semibold text-sm hover:bg-gray-700 focus:ring-gray-500;
}
</style>
