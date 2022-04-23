<template>
  <a-layout-header class="header">

    <div class="header-left">
      <h1 style="color: snow">欢迎,{{userName}}</h1>
    </div>

    <div class="header-right">
      <a-dropdown>
        <span class="header-right-item">
          <a-avatar src="https://joeschmoe.io/api/v1/random" style="background-color:aliceblue">
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

const cookies = inject('cookies')
const router = useRouter()

const LogOut = ()=>{
  cookies.remove('user');
  cookies.remove('token');
  router.push('/login')
}
const userName = cookies.get('user')

</script>

<style lang="scss" scoped>
.header{
  padding: 0;
  display: flex;
  justify-content: space-between;

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