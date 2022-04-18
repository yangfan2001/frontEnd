<template>
  <a-layout>
    <HeaderPart></HeaderPart>
    <a-layout>
      <SiderPart></SiderPart>
      <a-layout style="padding: 0 24px 24px">
        <ContentPart></ContentPart>
      </a-layout>
    </a-layout>

  </a-layout>
</template>

<script>
import HeaderPart from "@/components/HeaderPart";
import SiderPart from "@/components/SiderPart";
import ContentPart from "@/components/ContentPart";
export default {
  name: "HomePage",
  components:{ContentPart, SiderPart, HeaderPart}

}
</script>

<style scoped>

</style>