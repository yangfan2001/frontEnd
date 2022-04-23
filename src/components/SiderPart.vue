<template>
  <a-layout-sider width="200" style="background: #fff">
    <a-menu
        v-model:selectedKeys="selectedKeys2"
        v-model:openKeys="openKeys"
        mode="inline"
        :style="{ height: '100%', borderRight: 0 }"
    >
      <a-sub-menu key="sub1">
        <template #title>
              <span>
                <user-outlined />
                个人
              </span>
        </template>
        <a-menu-item key="1">我的主页</a-menu-item>
        <a-menu-item key="2">我的项目</a-menu-item>
        <a-menu-item key="3">我的任务</a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="sub2">
        <template #title>
              <span>
                <laptop-outlined />
                项目
              </span>
        </template>
        <a-menu-item key="5">项目管理</a-menu-item>
        <a-menu-item key="6">项目搜索</a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="sub3">
        <template #title>
              <span>
                <notification-outlined />
                通知
              </span>
        </template>
        <a-menu-item key="9">查看通知</a-menu-item>
        <a-menu-item key="10">发送通知</a-menu-item>
      </a-sub-menu>
    </a-menu>
  </a-layout-sider>
</template>

<script setup>
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons-vue'

</script>

<style scoped>

</style>