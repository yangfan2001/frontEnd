import { createApp } from 'vue';
import Antd from 'ant-design-vue/es';
import App from './App';
import 'ant-design-vue/dist/antd.css';
import router from "@/router";
import VueAxios from 'vue-axios'
import axios from "axios"
import VueCookies from 'vue-cookies'
import store from "@/store/store";

const app = createApp(App);

app.use(Antd)
    .use(router)
    .use(store)
    .use(VueAxios, axios)
    .use(VueCookies,{ expire: '7d'})
    .provide('axios', app.config.globalProperties.axios)
    .provide('cookies', VueCookies)// provide 引入VueCookies
    .mount('#app');

//app.config.globalProperties.$axios = axios; // 全局挂载axios
//app.config.globalProperties.$cookies = VueCookies; // 全局挂载VueCookies







