import {createRouter,createWebHashHistory} from 'vue-router'



const routes = [
    {
        path:'',
        component:()=>import('@/views/home/HomePage')
    },
    {
        path:'/login',
        component:()=>import('@/views/login/LoginPage'),
    },
    {
        path:'/register',
        component:()=>import('@/views/register/RegisterPage'),
    },
    {
        path:'/forget',
        component:()=>import('@/views/forget/ForgetPage'),
    }
]

const router = createRouter({
    history:createWebHashHistory(),
    routes
})

export default router;