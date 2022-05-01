<template>
<a-card class="data-card">
  <a-statistic title="我参与的项目" :value="20">
    <template #prefix> </template>
  </a-statistic>
  <a-statistic title="我的项目" :value="5" style="margin-top: 10px">
    <template #prefix></template>
  </a-statistic>
  <a href="" style="float: right;margin-bottom: 5px">view all</a>
</a-card>
</template>

<script setup>

</script>

<style scoped>
.data-card{
  height: 200px;
}
</style>