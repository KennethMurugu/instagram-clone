import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'
import auth from '@/router/auth'
import user from '@/router/user'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home
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
