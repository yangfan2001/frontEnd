<template>
  <a-layout class="IndexLayOut">
    <ForgetCard></ForgetCard>
  </a-layout>
</template>

<script>
import ForgetCard from "@/components/ForgetCard";
export default {
  name: "ForgetPage",
  components:{ForgetCard}
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