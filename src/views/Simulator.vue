<template>
  <div class="p-6 max-w-4xl mx-auto bg-white rounded-xl shadow-md space-y-4">
    <h2 class="text-2xl font-bold text-gray-800">Simulator</h2>

    <div class="flex justify-between mb-4">
      <router-link to="/" class="btn btn-secondary">Home</router-link>
      <router-link to="/assembler" class="btn btn-secondary">Assembler</router-link>
    </div>

    <div class="mb-4">
      <h3 class="text-lg font-semibold text-gray-700">Example Machine Codes</h3>
      <div class="space-y-2">
        <button @click="setExampleCode(example1)" class="btn btn-primary mr-2">Example 1</button>
        <button @click="setExampleCode(example2)" class="btn btn-primary mr-2">Example 2</button>
        <button @click="setExampleCode(example3)" class="btn btn-primary mr-2">Example 3</button>
      </div>
    </div>

    <textarea v-model="machineCode" placeholder="Enter machine code here..." class="w-full h-40 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"></textarea>
    <button @click="simulateCode" class="w-full py-2 px-4 bg-gray-800 text-white font-semibold rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-75">Simulate</button>

    <div v-if="registers.length" class="mt-4">
      <h3 class="text-xl font-semibold text-gray-700">Registers</h3>
      <ul class="mt-2">
        <li v-for="(value, index) in registers" :key="index" class="bg-gray-100 p-2 rounded-md mb-2">R{{ index }}: {{ value }}</li>
      </ul>
    </div>
    <div v-if="memory.length" class="mt-4">
      <h3 class="text-xl font-semibold text-gray-700">Memory</h3>
      <ul class="mt-2">
        <li v-for="(value, index) in memory" :key="index" class="bg-gray-100 p-2 rounded-md mb-2">{{ index }}: {{ value }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      machineCode: '',
      registers: [],
      memory: [],
      example1: '0001000100100011\n001100010010\n010000010100',
      example2: '0010001000110100\n001100100011\n010000100110',
      example3: '010100000101\n001100110100\n000100010011'
    };
  },
  methods: {
    async simulateCode() {
      try {
        const response = await axios.post('http://127.0.0.1:5000/simulate', {
          machine_code: this.machineCode.split('\n')
        });
        this.registers = response.data.registers;
        this.memory = response.data.memory;
        this.$toast.success('Code Coverted Successfully!!!',{timeout :5000});
      } catch (error) {
        console.error('Error simulating code:', error);
        this.$toast.error('Assemble Code Not Found',{timeout :5000});
      }
    },
    setExampleCode(example) {
      this.machineCode = example;
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
