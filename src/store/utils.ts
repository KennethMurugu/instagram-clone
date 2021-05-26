export function isUserLoggedIn(vm: Vue) {
  return Object.keys(vm.$store.state.userAccount).length !== 0
}
export const STORE_COMMITS = {
  SET_USER_ACCOUNT: 'setUserAccount',
  TOGGLE_NEW_POST_MODAL: 'toggleNewPostModal',
  TOGGLE_TOP_NAV: 'toggleTopNav'
}
