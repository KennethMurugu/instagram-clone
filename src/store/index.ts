import { UserAccount } from '@/vendor/firebase/db/models'
import Vue from 'vue'
import Vuex, { StoreOptions } from 'vuex'
import { STORE_COMMITS } from './utils'

Vue.use(Vuex)

export const LOCAL_STORAGE_KEY_USER_ACCOUNT = 'instagram-clone-user-account'
function getUserAccount() {
  const acc = localStorage.getItem(LOCAL_STORAGE_KEY_USER_ACCOUNT)
  return acc == null ? {} : JSON.parse(acc)
}

export default new Vuex.Store({
  state: {
    isTopNavShowing: false,
    userAccount: getUserAccount(),
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
      localStorage.setItem(
        LOCAL_STORAGE_KEY_USER_ACCOUNT,
        JSON.stringify(userAccount)
      )
    }
  },
  actions: {},
  modules: {}
})
