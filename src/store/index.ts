import Vue from 'vue'
import Vuex, { StoreOptions } from 'vuex'

Vue.use(Vuex)

// const state:StoreOptions = 

export default new Vuex.Store({
  state: {
    isTopNavShowing: false
  },
  mutations: {
    toggleTopNav(state: any, show: boolean){
      state.isTopNavShowing = show
    }
  },
  actions: {
  },
  modules: {
  }
})
