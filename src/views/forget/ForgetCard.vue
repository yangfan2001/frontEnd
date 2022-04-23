<template>
  <div class="CardForm">
    <a-card :bordered="false"
            class="Card"
    >
      <template #title>
        <div style="text-align: center">
          <h3>找回密码</h3>
        </div>
      </template>

      <a-form
          :model="formState"
          name="basic"
          :wrapper-col="{ offset:3,span: 18 }"
          autocomplete="off"
          class="ForgetForm"
      >
        <!--输入手机号码-->

        <a-form-item
            name="phoneNumber"
            :rules="[{ required:true, message:'请输入手机号码！'}]"
        >
          <a-input v-model:value="formState.phoneNumber" placeholder="请输入手机号码">
            <template #prefix>
              <PhoneOutlined class="site-form-item-icon" />
            </template>
          </a-input>
        </a-form-item>

        <!--输入验证码-->

        <a-form-item
            name="verifyCode"
            :rules="[{ required:true, message:'请输入验证码！'}]"
        >
          <a-input-search v-model:value="formState.verifyCode" placeholder="请输入验证码"
                          @search="getVerifyCode">
            <template #prefix>
              <MessageOutlined class="site-form-item-icon" />
            </template>
            <template #enterButton>
              <a-button :disabled="!data.validationDisabled">{{verifyCodeButtonMsg}}</a-button>
            </template>
          </a-input-search>
        </a-form-item>

        <!--新密码-->
        <a-form-item
            name="newPassword"
            :rules="[{ required: true, message: '请输入新密码!',trigger:'blur'}]"
        >
          <a-input-password v-model:value="formState.newPassword" placeholder="请输入新密码">
            <template #prefix>
              <LockOutlined class="site-form-item-icon" />
            </template>
          </a-input-password>

        </a-form-item>

        <!--再次输入新密码-->
        <a-form-item
            name="checkNewPassword"
            :rules="[{ required: true, message: '请再次输入新密码!',trigger:'blur'}]"
        >
          <a-input-password v-model:value="formState.checkNewPassword" placeholder="请再次输入新密码">
            <template #prefix>
              <LockOutlined class="site-form-item-icon" />
            </template>
          </a-input-password>

        </a-form-item>

        <a-form-item :wrapper-col="{ offset: 3, span: 18 }">
          <a-button :disabled="disabled" type="primary" @click="submitForm" block>
            提交
          </a-button>
        </a-form-item>

      </a-form>
    </a-card>
  </div>
</template>

<script>
import {reactive,computed,inject} from 'vue';
import {LockOutlined,PhoneOutlined,MessageOutlined} from '@ant-design/icons-vue';
import md5 from 'js-md5'
import {message} from "ant-design-vue";
import {useStore} from "vuex";
import {useRouter} from "vue-router";

export default ({
  name:"LoginCard",
  components:{
    LockOutlined,PhoneOutlined,MessageOutlined
  },
  setup() {
    // 定义表单数据
    const formState = reactive({
      phoneNumber: '',
      verifyCode:'',
      newPassword: '',
      checkNewPassword:''
    });
    const send = {
      verifyCode:'',
      phoneNumber:''
    }

    const store = useStore() // the use of vueX
    const axios  = inject('axios') // inject方式引入axios
    const router = useRouter()

    // 计时器
    const data = reactive({
      count:0,
      validationDisabled:true,
      timer:null
    })

    // 禁用
    const disabled = computed(() => {
      return !(formState.phoneNumber && formState.verifyCode
          && formState.newPassword&& formState. checkNewPassword)
    })
    // msg
    const verifyCodeButtonMsg = computed(()=>{
      return data.count === 0?'获取验证码':data.count.toString() + "秒后重发"
    })

    // 验证辅助函数
    const validate = {
      SamePassword:(password,checkPassword)=>{
        return (password === checkPassword)
      },
      phoneNumber:(number)=>
      {
        let pattern = /^(13[0-9]|15[0123456789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;

        return pattern.test(number)
      }
    }
    // 获取验证码的代码逻辑
    const getVerifyCode = ()=> {
      // 验证手机号是否合法
      if(!formState.phoneNumber||!validate.phoneNumber(formState.phoneNumber))
      {
        message.warning('请输入合法的联系方式!')
        return
      }
      // 前端生成验证码，发送给后端，由后端来向用户的联系方式发送验证码
      let code = "";
      for(let i = 0;i < 4;i++) {
        code += Math.floor(Math.random() * 10);
      }
      send.verifyCode = code
      send.phoneNumber = formState.phoneNumber
      console.log(send)
      let url = store.state.backend_url+'/sendCode'
      console.log(axios,url)

      axios.post(url,{
        code:send.verifyCode,
        telephone:send.phoneNumber
      })
          .then((response)=>{
            if(response.status !== 200)
            {
              message.error('验证码发送失败！')
              //验证码发送失败直接return
            }
            else if(response.data['state'])
            {
              message.success('验证码发送成功！')
            }
          })
          .catch((error)=>{
            console.log(error)
            message.error('验证码发送失败！')
            return //验证码发送失败直接return
          })


      // 验证码已经发送完成
      const TIME_COUNT = 60;
      if(!data.timer) {
        data.validationDisabled = false;
        data.count = TIME_COUNT;
        data.timer = setInterval(() => {
          if(data.count > 0 && data.count <= TIME_COUNT) {
            data.count -= 1;
          }
          else{
            data.validationDisabled = true;
            clearInterval(data.timer);
            data.timer = null;
          }
        }, 1000);
      }
    }
    // 下面定义的是form提交后的前端逻辑事件
    // the action after login successfully

    const submitForm = (event)=>{
      event.preventDefault()
      // 验证数据的有效性
      if(!validate.phoneNumber(formState.phoneNumber))
      {
        message.warning('请输入合法的联系方式')
        return
      }
      if(!validate.SamePassword(formState.newPassword,formState.checkNewPassword))
      {
        message.warning('两次输入的密码不一致')
        return
      }
      // the data now are passed the validation
      // now start access and check the data from the back-end
      let toParams = {
        phoneNumber: formState.phoneNumber.toString(),
        password: md5(formState.newPassword).toUpperCase()
      }
      if(send.verifyCode.toString()!==formState.verifyCode)
      {//输入的验证码不同
        message.error('验证码输入错误')
        return
      }

      let url = store.state.backend_url+'/changePwd'
      axios.post(url,toParams)
          .then((response)=>{
            let hasTel = response.data['hasTel'];
            let state = response.data['state'];
            if(state&&hasTel){
              message.success( '密码修改成功！')
              router.push('/login')
            }
            else{
              if(!hasTel)
              {
                message.error( '该手机号未注册！')
              }
              else{
                message.error( '密码修改失败！')
              }
            }
          })
          .catch((error)=>{
            console.log(error)
            message.error('修改密码出错！')
          })
    }
    return {
      formState,
      disabled,
      data,
      verifyCodeButtonMsg,
      getVerifyCode,
      submitForm
    };
  },

});
</script>

<style scoped>
.CardForm{
  margin: auto;
  width: 50%;
}
.Card{
  background-color: rgba(255,255,255,0.9);
  margin: auto;
  width: 360px;
  height: 400px;
  border-radius:40px;
}
</style>