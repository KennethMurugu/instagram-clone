import { RouteConfig } from 'vue-router'

const routes: RouteConfig[] = [
    {
        path: '/signup',
        name: 'SignUp',
        component: () => import('@/views/auth/SignUp.vue'),
    }
]

export default routes