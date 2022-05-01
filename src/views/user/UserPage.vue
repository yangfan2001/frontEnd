<template>
  <a-row>
    <a-col :span="12" :offset='2'>
      <UserInfoCard/>
    </a-col>
    <a-col :span="4">
      <ShowProjectDataCard projectNum="25"/>
    </a-col>
    <a-col :span="4">
      <ShowMissionDataCard/>
    </a-col>
  </a-row>

  <a-row style="margin-top: 20px">
    <a-col :span="20" :offset="2">
      <ProjectInfoCard/>
    </a-col>
  </a-row>

  <a-row style="margin-top: 20px">
    <a-col :span="20" :offset="2">
      <MissionInfoCarad/>
    </a-col>
  </a-row>
</template>

<script setup>
import UserInfoCard from './components/UserInfoCard'
import ShowProjectDataCard from "./components/ShowProjectDataCard";
import ShowMissionDataCard from "@/views/user/components/ShowMissionDataCard";
import ProjectInfoCard from './components/ProjectInfoCard'
import MissionInfoCarad from './components/MissionInfoCard'
</script>

<style scoped>

</style>