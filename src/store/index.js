import { createStore } from 'vuex';
import axios from 'axios';

const store = createStore({
  state: {
    token: localStorage.getItem('token') || '',
    user: null,
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
      localStorage.setItem('token', token);
    },
    setUser(state, user) {
      state.user = user;
    },
    clearUser(state) {
      state.token = '';
      state.user = null;
      localStorage.removeItem('token');
    },
  },
  actions: {
    async login({ commit }, credentials) {
      try {
        const response = await axios.post('https://api-assetmange.onrender.com/api/auth/login', credentials);
        commit('setToken', response.data.token);  
        commit('setUser', response.data.user);
      } catch (error) {
        console.error('Login failed:', error);
      }
    },
    async register({ commit }, userData) {
      try {
        const response = await axios.post('https://api-assetmange.onrender.com/api/auth/register', userData);
        commit('setToken', response.data.token);  
        commit('setUser', response.data.user);
      } catch (error) {
        console.error('Registration failed:', error);
      }
    },
    logout({ commit }) {
      commit('clearUser');
    },
  },
});

axios.interceptors.request.use(config => {
  const token = store.state.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default store;
