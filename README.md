# 恶霸项目管理系统
## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### src的文件结构
```
├── App.vue
├── api  -> 封装访问后端api的文件夹
├── assets -> 静态资源文件夹
│   ├── cool-background.svg
│   ├── cool-background2.png
│   ├── cool-background3.png
│   └── logo.png
├── components ->全局可用的静态组件
│   ├── ContentPart.vue
│   ├── FooterPart.vue
│   ├── HeaderPart.vue
│   └── SiderPart.vue
├── main.js -> main.js 配置外部库的引入
├── router -> 配置vueRouter路由的文件夹
│   └── index.js
├── store -> Vuex存储的文件夹
│   ├── actions.js
│   ├── getters.js
│   ├── mutations.js
│   ├── state.js
│   └── store.js
└── views  -> 业务动态页面的文件夹
    ├── components -> 业务常用的组件
    ├── forget  -> 每一个页面为一个文件夹
    │   ├── ForgetCard.vue
    │   └── ForgetPage.vue
    ├── home
    │   └── HomePage.vue
    ├── login
    │   ├── LoginCard.vue
    │   └── LoginPage.vue
    └── register
        ├── RegisterCard.vue
        └── RegisterPage.vue

```

