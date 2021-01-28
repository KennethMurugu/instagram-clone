import { RouteConfig } from 'vue-router'

const router: RouteConfig[] = [
  {
    path: '/:user_name',
    props: true,
    component: () => import('@/views/UserAccount/UserAccountBase.vue'),
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

export default router
