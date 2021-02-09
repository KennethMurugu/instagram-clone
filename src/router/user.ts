import { RouteConfig } from 'vue-router'

const router: RouteConfig[] = [
  // Edit
  {
    path: '/accounts',
    props: true,
    component: () => import('@/views/UserAccount/Edit/EditProfileBase.vue'),
    children: [
      {
        path: 'edit',
        props: true,
        name: 'EditProfile',
        component: () => import('@/views/UserAccount/Edit/EditProfile.vue')
      }
    ]
  },
  
  // User profile
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
      },
      {
        path: 'p/:post_id',
        props: true,
        name: 'UserPostFullScreen',
        components: {
          default: () => import('@/views/UserAccount/UserPosts.vue'),
          ['post-overlay']: () => import('@/views/posts/UserPostFullScreen.vue')
        }
      },
    ]
  },
]

export default router
