<template>
  <a-layout-header class="header">

    <div class="header-left">
      <h1 style="color: black">
        欢迎,{{userName}}
        <a-divider type="vertical" />
        <FieldTimeOutlined/>{{timeToShow}}
        <a-divider type="vertical" />
        {{getGreetings()}}
      </h1>
    </div>

    <div class="header-right">
      <a-dropdown>
        <span class="header-right-item">
          <a-avatar src="https://joeschmoe.io/api/v1/random" style="background-color:cornflowerblue">
          </a-avatar>
        </span>
        <template #overlay>
          <a-menu>
            <a-menu-item @click="LogOut">
              登出
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>


  </a-layout-header>
</template>

<script setup>

import {inject} from 'vue'
import {useRouter} from "vue-router";
import {FieldTimeOutlined} from '@ant-design/icons-vue'

const cookies = inject('cookies')
const router = useRouter()

const LogOut = ()=>{
  cookies.remove('user');
  cookies.remove('token');
  router.push('/login')
}
const userName = cookies.get('user')?cookies.get('user'):'用户'
const time = new Date()
const timeToShow = `  ${time.getHours()}:${time.getMinutes()}`
const getGreetings = ()=>{
  let Msg =''
  let currentTime = time.getHours()
  if(currentTime<6||currentTime>21)
  {
    Msg = 'Good Night'
  }
  else if(currentTime>=6&&currentTime<11)
  {
    Msg = 'Good Afternoon'
  }
  else {
    Msg = 'Good Evening'
  }
  return Msg
}
</script>

<style lang="scss" scoped>
.header{
  padding: 0;
  display: flex;
  justify-content: space-between;
  background-color: white;

  .header-right{
    margin-right: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;

  }

  .header-left{
    margin-left: 50px;
  }
}
</style>