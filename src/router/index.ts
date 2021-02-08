import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import auth from '@/router/auth'
import user from '@/router/user'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    props: true,
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/p/:post_id',
    name: 'UserPostFullScreen',
    props: true,
    components: {
      default: () => import('@/views/Home.vue'),
      ['post-overlay']: () => import('@/views/posts/UserPostFullScreen.vue'),
    }
  },

  // Auth
  ...auth,
  // User
  ...user,
  {
    path: '*',
    props: true,
    name: 'EditEmpty',
    component: () => import('@/views/PageNotFound.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

import firebase from '@/vendor/firebase'
// router.beforeEach((to, from, next) => {
//   if (
//     !firebase.auth().currentUser && // user not logged  in
//     to.path != '/login' && // not login page
//     to.path != '/signup' // not signup page
//   ) {
//     router.push('/login')
//   } else {
//     next()
//   }
// })

export default router
