import { UserAccount } from '@/vendor/firebase/db/models'
import Vue from 'vue'
import Vuex, { StoreOptions } from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isTopNavShowing: false,
    userAccount: {},
    showNewPostModal: false,
  },
  mutations: {
    toggleTopNav(state: any, show: boolean) {
      state.isTopNavShowing = show
    },
    toggleNewPostModal(state: any, show: boolean) {
      state.showNewPostModal = show
    },
    setUserAccount(state: any, userAccount: UserAccount = {}) {
      state.userAccount = userAccount
      sessionStorage.setItem('instagram-clone-user-account', JSON.stringify(userAccount))
    }
  },
  actions: {},
  modules: {}
})
