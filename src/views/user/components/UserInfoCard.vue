<template>
  <a-card class="UserInfoCard">
    <div class="CardUpperPart">
      <div>
        <a-avatar :src="User.AvatarUrl"
                  :size="100"
                  style="background-color:aliceblue;"
        />
      </div>
      <a-typography-paragraph
          :ellipsis="{ rows: 3, expandable: false}"
          :content="User.Motto"
          style="margin-top: 30px;margin-left: 20px"
      />
    </div>
    <div class="CardLowerPart">
      <p style="color: grey">
        {{User.Name}}
        <a-divider type="vertical" />
        {{User.Job}}<br/>
        {{User.Email}}
        <a style="float:right;border: none;" @click="showDrawer">edit</a>
      </p>
    </div>
  </a-card>

  <!--定义drawer用于编辑用户信息-->
  <a-drawer
      v-model:visible="Visible"
      class="custom-class"
      title="编辑用户信息"
      placement="right"
      style="text-align: center"
  >
    <a-form>

      <a-upload
          v-model:file-list="fileList"
          name="avatar"
          list-type="picture-card"
          class="avatar-uploader"
          accept=".jpg, .png"
          :show-upload-list="false"
          :before-upload="beforeUpload"
          :customRequest="customUpload"
          style="margin-left: 50px"
      >
        <a-avatar :src="imageUrl" alt="avatar" :size="100"
                  style="background-color:aliceblue"
                  class="avatar-uploader"/>
      </a-upload>


      <a-form-item>
        <a-input :value="User.Name" :disabled="true">
          <template #prefix><UserOutlined/></template>
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-input :value="User.Email" :disabled="true">
          <template #prefix><MailOutlined/></template>
        </a-input>
      </a-form-item>

      <a-form-item>
        <a-input v-model:value='DrawerData.Job' v-model="DrawerData.Job">
          <template #prefix><UserOutlined/></template>
        </a-input>
      </a-form-item>
      <a-textarea v-model:value="DrawerData.Motto" :rows="5" />

      <a-button style="margin-top: 20px;width:100%;"
      @click="submitForm">提交</a-button>

    </a-form>
  </a-drawer>

</template>

<script setup>
// 引入图标
import {UserOutlined,MailOutlined} from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'
import {ref,reactive} from 'vue'
// 对User结构的定义
const User = {
  AvatarUrl:"https://joeschmoe.io/api/v1/random",
  Motto:'I want to be the greatest in the world.Not for money and fame.But for a better world.正在通过努力学习成为一名合格的前端工程师，我是Jack。如果有兴趣的话，请联系我。',
  Name:'@Jack',
  Job:'前端工程师',
  Email:'993169208@qq.com'
}
// 对draw对应事件、变量的定义
const Visible = ref(false)
const showDrawer = () =>{
  Visible.value = true
}
// 定义上传头像对应的响应事件
const fileList = ref([]);
const imageUrl = ref(User.AvatarUrl);
const DrawerData = reactive({
  Job:User.Job,
  Motto:User.Motto
})

// img转化为Base64格式
function fileToBase64(file){
  const reader = new FileReader();
  reader.readAsDataURL(file);
  return new Promise((resolve, reject) => {
    reader.onload = function (event) {
      if (this.result) {
        resolve(this.result)
      } else {
        console.log(event)
        reject("图片转换错误，请稍后重试")
      }
    }
  })
}
// customUpload 对于vue组件的自定义改写

const customUpload = async(fileInfo)=>{
  const { file } = fileInfo;
  try {
    const url = await fileToBase64(file); // 获取base64地址
    imageUrl.value = url
  } catch (err) {
    message.error(err)
  }
}

// befornUpload 上传前对文件格式和数据进行校验
const beforeUpload = file => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';

  if (!isJpgOrPng) {
    message.error('请上传jpeg/png格式图片！');
  }

  const isLessThan2M = file.size / 1024 / 1024 < 2;

  if (!isLessThan2M) {
    message.error('图像大小不能超过2MB！');
  }

  return isJpgOrPng && isLessThan2M;
};

const submitForm = ()=>{
  const params = {
    ImageUrl:imageUrl.value,
    Job:DrawerData.Job,
    Motto:DrawerData.Motto
  }
  console.log(params)
}
</script>

<style scoped>
.UserInfoCard{
  height: 200px;
}
.CardUpperPart{
  display: flex;
}
.CardLowerPart{
  margin-top: 10px;
}
.avatar-uploader {
  width: 128px;
  height: 128px;
  margin: auto;
  display: inline-block
}
</style>