import { createStore, createLogger } from 'vuex';
import { state } from './state';
// import hotWord from './hotWord';

export default createStore({
  state,
  mutations: {},
  actions: {},
  modules: {
    // hotWord
  },
  plugins: process.env.NODE_ENV !== 'production' ? [createLogger()] : []
});
