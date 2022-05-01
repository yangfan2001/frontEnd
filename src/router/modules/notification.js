export default[
    {
        path: '/notification',
        name: 'notification',
        component: () => import('../../layout/defaultRouter'),
        redirect:'/notification/check',
        children:[
            {
                path: '/notification/check',
                name: 'notificationCheck',
                component: () => import('../../views/notification/CheckNotification'),
            },
            {
                path: '/notification/send',
                name: 'notificationSend',
                component: () => import('../../views/notification/SendNotification'),
            }
        ]
    },
]