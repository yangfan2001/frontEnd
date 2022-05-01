
import user from './modules/user'
import project from './modules/project'
import notification from './modules/notification'

export const asyncRoutes = [
    // 所有需要使用到layout的页面，都需要在这里声明路由的实现
    ...user,
    ...project,
    ...notification
]
