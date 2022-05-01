import {createRouter,createWebHashHistory} from 'vue-router'
import { constantRoutes } from './constantRoutes'
const routes = [
    {
        path:'/login',
        name:'Login',
        component:()=>import('@/views/login/LoginPage'),
    },
    {
        path:'/register',
        name:'Register',
        component:()=>import('@/views/register/RegisterPage'),
    },
    {
        path:'/forget',
        name:'Forget',
        component:()=>import('@/views/forget/ForgetPage'),
    },
    ...constantRoutes
]

const router = createRouter({
    history:createWebHashHistory(),
    routes
})

export { constantRoutes } from './constantRoutes'

export default router;