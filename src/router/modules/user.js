export default[
    {
        path: '/user',
        name: 'user',
        component: () => import('../../layout/defaultRouter'),
        redirect:'/user/home',
        children:[
            {
                path: '/user/home',
                name: 'home',
                component: () => import('../../views/user/UserPage'),
            },
            {
                path: '/user/project',
                name: 'userProject',
                component: () => import('../../views/user/UserProjectPage'),
            },
            {
                path: '/user/mission',
                name: 'userMission',
                component: () => import('../../views/user/UserMissionPage'),
            }
        ]
    },
]