<template>
  <a-layout-sider v-model:collapsed="collapsed" collapsible>
    <div class="logo" />
    <a-menu
        v-model:selectedKeys="selectedKeys"
        v-model:openKeys="openKeys"
        mode="inline"
        theme="dark"
        @click="handleClick"
    >
      <a-sub-menu key="sub1">
        <template #title>
          <user-outlined />
          <span>个人</span>
        </template>
        <a-menu-item key="1">我的主页</a-menu-item>
        <a-menu-item key="2">我的项目</a-menu-item>
        <a-menu-item key="3">我的任务</a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="sub2">
        <template #title>
          <laptop-outlined />
          <span>项目</span>
        </template>
        <a-menu-item key="4">项目管理</a-menu-item>
        <a-menu-item key="5">项目搜索</a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="sub3">
        <template #title>
          <notification-outlined />
          <span>通知</span>
        </template>
        <a-menu-item key="6">查看通知</a-menu-item>
        <a-menu-item key="7">发送通知</a-menu-item>
      </a-sub-menu>
    </a-menu>
  </a-layout-sider>
</template>

<script setup>
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons-vue'
import {ref} from 'vue'
// import vueRouter
import {useRouter} from 'vue-router'
const router = useRouter()

// 定义对应的ant-design menu需要的参数
const selectedKeys = ref(['1']);
const openKeys = ref(['sub1']);
const collapsed = ref(false)
// 建立对应选中menu的Key和路由的对应关系
const KvMap = {
  1:'/user/home',
  2:'/user/project',
  3:'/user/mission',
  4:'/project/management',
  5:'/project/search',
  6:'/notification/check',
  7:'/notification/send',
}

//定义sider的menu的点击事件
const handleClick = (event)=>{
  let key = event.key
  // 点击事件对应的key如果和当前选中的key相同，那么就不跳转
  if(key==selectedKeys.value[0])
  {
    return
  }
  router.push({path:KvMap[key]})
  console.log('JUMP!!!')
}
</script>

<style scoped>

.logo {
  height: 32px;
  margin: 16px;
  background: rgba(255, 255, 255, 0.3);
}
.site-layout .site-layout-background {
  background: #fff;
}
[data-theme='dark'] .site-layout .site-layout-background {
  background: #141414;
}
</style>