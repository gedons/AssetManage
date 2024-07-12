import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Index.vue';
import Assembler from '../views/Assembler.vue';
import Simulator from '../views/Simulator.vue';
import store from '../store';

const routes = [
    { path: '/', name: 'Home', component: Home },
    { path: '/assembler', name: 'Assembler', component: Assembler },
    { path: '/simulator', name: 'Simulator', component: Simulator },
  ];
 
const router = createRouter({
  history: createWebHistory(),
  routes
});

  

export default router;