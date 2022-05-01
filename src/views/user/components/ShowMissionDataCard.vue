<template>
  <a-card class="data-card">
    <a-statistic title="正在进行的任务" :value="20">
      <template #prefix> </template>
    </a-statistic>
    <a-statistic title="已完成的任务" :value="5" style="margin-top: 10px">
      <template #prefix></template>
    </a-statistic>
    <a href="" style="float: right;margin-bottom: 5px">view all</a>
  </a-card>
</template>

<script>
export default {
  name: "ShowMissionDataCard"
}
</script>

<style scoped>
.data-card{
  height: 200px;
}
</style>