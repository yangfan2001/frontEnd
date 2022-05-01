export default[
    {
        path: '/project',
        name: 'project',
        component: () => import('../../layout/defaultRouter'),
        redirect:'/project/management',
        children:[
            {
                path: '/project/management',
                name: 'projectManagement',
                component: () => import('../../views/project/ProjectManagement'),
            },
            {
                path: '/project/search',
                name: 'projectSearch',
                component: () => import('../../views/project/ProjectSearch'),
            }
        ]
    },
]