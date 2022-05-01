<template>
  <a-card title="Ongoing Mission">
    <template #extra><a href="#">view all</a></template>
    <a-list item-layout="horizontal" :data-source="MissionData">
      <template #renderItem="{ item }">
        <a-list-item>
          <template #actions>
            <span>发布时间:{{item.Due}}</span>
            <span>截止时间:{{item.Due}}</span>
          </template>
          <a-list-item-meta
          >
            <template #description>
              {{item.ProjectName}}
            </template>
            <template #title>
              <a href="https://www.antdv.com/">{{ item.MissionName }}</a>
            </template>
            <template #avatar>
              <a-avatar src="https://joeschmoe.io/api/v1/random" />
            </template>
          </a-list-item-meta>
        </a-list-item>
      </template>
    </a-list>
  </a-card>
</template>

<script setup>
const MissionData = [
  {
    MissionName:'处理前端的重要问题',
    ProjectName:'Vue生态项目',
    Updated:'2 hours ago',
    Due:'2023.2.3',
    Weight:1
  },
  {
    MissionName:'处理后端的重要问题',
    ProjectName: 'Flask生态项目',
    Updated:'10 days ago',
    Due:'2022.4.4',
    Weight:2
  },
  {
    MissionName:'处理操作系统的重要问题',
    ProjectName: 'UnixV6++生态项目',
    Updated:'130 month ago',
    Due:'2022.5.8',
    Weight:3
  }
]
</script>

<style scoped>

</style>