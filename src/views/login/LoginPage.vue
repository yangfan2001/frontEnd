<template>
  <a-layout class="IndexLayOut">
    <LoginCard></LoginCard>
  </a-layout>
</template>

<script>
import LoginCard from "./LoginCard";
export default {
  name: "LoginPage",
  components:{LoginCard}
}
</script>

<style scoped>
.IndexLayOut{
  background-image:url("~/src/assets/cool-background2.png");
  background-repeat: no-repeat;
  background-size: contain;
  background-size:100% 100%;
  background-attachment: fixed;
}
</style>