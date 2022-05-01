<template>
  <a-card title="Ongoing Project">
    <template #extra><a href="#">view all</a></template>
    <a-card-grid style="width: 33.333%;"
                 v-for="item in ProjectData"
                 :key="item.id">
      <a-card :bordered="false" :body-style="{ padding: 0 }">

        <a-card-meta :description="item.ProjectDetail">
          <template #title>
            <a href="">{{item.ProjectName}}</a>
          </template>
          <template #avatar>
            <a-avatar :src='item.ProjectAvatarUrl'/>
          </template>
        </a-card-meta>

        <div class="card-upper-part">
          <span style="float:left">{{item.UserRole}}</span>
          <span style="float:right;color: grey">{{item.Updated}}</span>
        </div>

      </a-card>
    </a-card-grid>
  </a-card>
</template>

<script setup>
const ProjectData = [
  {
    Id:1,
    ProjectName:'Vue项目',
    ProjectAvatarUrl:'https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png',
    ProjectDetail:'This is a great project......',
    UserRole:'Owner',
    Updated:'9mins ago'
  },
  {
    Id:2,
    ProjectName:'Flask项目',
    ProjectAvatarUrl:'https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png',
    ProjectDetail:'This is a great project......',
    UserRole:'Owner',
    Updated:'9mins ago'
  },
  {
    Id:3,
    ProjectName:'UnixV6++项目',
    ProjectAvatarUrl:'https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png',
    ProjectDetail:'This is a great project......',
    UserRole:'管理员',
    Updated:'9mins ago'
  }
]
</script>

<style scoped>
.card-upper-part{
  margin-top: 10px;
}
</style>