import Vue from 'vue'
import Vuex from 'vuex'
import users from './modules/usuarios'
import batidaPonto from './modules/batidaPonto'
import { CHANGE_STATUS_WAPP } from './modules-types'

Vue.use(Vuex)


export default new Vuex.Store({
  state: {
    statusWApp: 0,
  },
  mutations: {
    [CHANGE_STATUS_WAPP](state, payload){
      state.statusWApp = payload;
    }
  },
  actions: {
  },
  modules: {
    users,
    batidaPonto
  }
})
