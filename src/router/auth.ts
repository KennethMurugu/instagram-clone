import { RouteConfig } from 'vue-router'

const routes: RouteConfig[] = [
    {
        path: '/signup',
        name: 'SignUp',
        component: () => import('@/views/auth/SignUp.vue'),
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/auth/Login.vue'),
    }
]

export default routes