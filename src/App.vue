<template>
 <router-view></router-view>
</template>

<script>

export default {
  name: 'App',
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
#app,body,html {
  height: 100%;
  width: 100%;
  margin: 0;
}
.ant-layout {
  display: flex;
  width: 100%;
  min-height: 100%;
}
</style>
