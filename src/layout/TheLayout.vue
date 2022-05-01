<template>
  <a-layout style="min-height: 100vh">
    <SiderPart></SiderPart>
    <a-layout>
      <HeaderPart></HeaderPart>
      <ContentPart></ContentPart>
      <FooterPart></FooterPart>
    </a-layout>
  </a-layout>

</template>

<script setup>
import HeaderPart from "./components/HeaderPart";
import SiderPart from "./components/SiderPart";
import ContentPart from "./components/ContentPart";
import FooterPart from "./components/FooterPart";

</script>

<style scoped>
.site-layout .site-layout-background {
  background: #fff;
}
[data-theme='dark'] .site-layout .site-layout-background {
  background: #141414;
}
</style>