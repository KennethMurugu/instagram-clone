import { UserAccount } from '@/vendor/firebase/db/models'
import Vue from 'vue'
import Vuex, { StoreOptions } from 'vuex'
import { STORE_COMMITS } from './utils'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isTopNavShowing: false,
    userAccount: {},
    showNewPostModal: false
  },
  mutations: {
    [STORE_COMMITS.TOGGLE_TOP_NAV](state: any, show: boolean) {
      state.isTopNavShowing = show
    },
    [STORE_COMMITS.TOGGLE_NEW_POST_MODAL](state: any, show: boolean) {
      state.showNewPostModal = show
    },
    [STORE_COMMITS.SET_USER_ACCOUNT](
      state: any,
      userAccount: UserAccount = {}
    ) {
      state.userAccount = userAccount
      sessionStorage.setItem(
        'instagram-clone-user-account',
        JSON.stringify(userAccount)
      )
    }
  },
  actions: {},
  modules: {}
})
