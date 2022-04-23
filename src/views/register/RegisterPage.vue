<template>
  <a-layout class="IndexLayOut">
    <RegisterCard></RegisterCard>
  </a-layout>
</template>

<script>
import RegisterCard from "./RegisterCard";
export default {
  name: "RegisterPage",
  components:{RegisterCard}
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