import {asyncRoutes} from "./asyncRoutes";

export const constantRoutes = [
    {
        path: '/',
        name: 'Layout',
        redirect:'/user',
        component: () => import('../layout/TheLayout'),
        meta: {
            title: 'Layout',
        },
        children: [...asyncRoutes],
    },
    {
        path:'/404NotFound',
        name:'NotFound',
        component:()=>import('@/views/error/404NotFound.vue')
    },
    { path: '/:pathMatch(.*)*', redirect: '/404NotFound' },
]

