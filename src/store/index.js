import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    selection: null,
    u: null,
    nik: null,
  },
  getters: {
  },
  mutations: {
    setUser(state, user) {
      state.u = user;
    },
    
    setNik(state, nik) {
      state.nik = nik;
    },
    setSelection(state, selection){
      state.selection = selection
    }
  },
  actions: {
  },
  modules: {
  }
})
