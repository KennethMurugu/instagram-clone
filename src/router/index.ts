import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'
import auth from '@/router/auth'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },

  // Auth
  ...auth,

  {
    path: '/:user_name',
    props: true,
    name: 'UserAccountTemplate',
    component: () => import('@/views/UserAccount/UserAccountTemplate.vue'),
    children: [
      {
        path: '',
        props: true,
        name: 'UserPosts',
        component: () => import('@/views/UserAccount/UserPosts.vue')
      },
      {
        path: 'channel',
        props: true,
        name: 'UserIGTV',
        component: () => import('@/views/UserAccount/UserIGTV.vue')
      },
      {
        path: 'saved',
        props: true,
        name: 'UserSaved',
        component: () => import('@/views/UserAccount/UserSaved.vue')
      },
      {
        path: 'tagged',
        props: true,
        name: 'UserTagged',
        component: () => import('@/views/UserAccount/UserTagged.vue')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
