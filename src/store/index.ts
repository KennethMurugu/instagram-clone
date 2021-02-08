import { UserAccount } from '@/vendor/firebase/db/models'
import Vue from 'vue'
import Vuex, { StoreOptions } from 'vuex'

Vue.use(Vuex)

// const state:StoreOptions =

export default new Vuex.Store({
  state: {
    isTopNavShowing: false,
    userAccount: JSON.parse(
      sessionStorage.getItem('instagram-clone-user-account')!
    ),
    showNewPostModal: false,
  },
  mutations: {
    toggleTopNav(state: any, show: boolean) {
      state.isTopNavShowing = show
    },
    toggleNewPostModal(state: any, show: boolean) {
      state.showNewPostModal = show
    }
    // saveUserAccount(state: any, userAccount: UserAccount) {
    //   state.userAccount = userAccount
    // }
  },
  actions: {},
  modules: {}
})
