import {createRouter,createWebHashHistory} from 'vue-router'


import HomePage from "@/views/HomePage";
import LoginPage from "@/views/LoginPage";
import RegisterPage from "@/views/RegisterPage";
import ForgetPage from "@/views/ForgetPage";
const routes = [
    {
        path:'',
        component:HomePage
    },
    {
        path:'/login',
        component:LoginPage,
    },
    {
        path:'/register',
        component:RegisterPage,
    },
    {
        path:'/forget',
        component:ForgetPage
    }
]

const router = createRouter({
    history:createWebHashHistory(),
    routes
})

export default router;