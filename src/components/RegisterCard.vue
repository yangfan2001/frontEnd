<template>
  <div class="CardForm">
    <a-card :bordered="false"
            class="Card"
            :tab-list="tabList"
            :active-tab-key="key"
            @tabChange="key=> onTabChange(key)"
    >
      <!--the head of the registration card-->
      <template #title>
        <h1 style="text-align: center">恶霸项目管理系统</h1>
      </template>
      <!--the body of the registration card-->
      <a-form
          :model="formState"
          name="basic"
          :wrapper-col="{ offset:3,span: 18 }"
          autocomplete="off"
          class="RegisterForm"
      >
        <!--输入账号-->
        <a-form-item

            name="username"
            :rules="[{ required: true, message: '请输入用户名!',trigger:'blur'}]"
        >
          <a-input v-model:value="formState.username" placeholder="请输入用户名">
            <template #prefix>
              <user-outlined type="user" />
            </template>
            <template #suffix>
              <a-tooltip title="用户名不能为空">
                <info-circle-outlined style="color: rgba(0, 0, 0, 0.45)" />
              </a-tooltip>
            </template>
          </a-input>
        </a-form-item>

        <!--输入密码-->

        <a-form-item
            name="password"
            :rules="[{ required: true, message: '请输入密码!',trigger:'blur' }]"
        >
          <a-input-password v-model:value="formState.password" placeholder="请输入密码">
            <template #prefix>
              <LockOutlined class="site-form-item-icon" />
            </template>
          </a-input-password>

        </a-form-item>

        <!--再次输入密码-->

        <a-form-item
            name="checkPassword"
            :rules="[{ required: true, message: '请再次输入密码!',trigger:'blur'}]"
        >
          <a-input-password v-model:value="formState.checkPassword" placeholder="请再次输入密码">
            <template #prefix>
              <LockOutlined class="site-form-item-icon" />
            </template>
          </a-input-password>

        </a-form-item>

        <!--输入邮箱-->

        <a-form-item
            name="email"
            :rules="[{ required: true, message: '请输入邮箱!' ,trigger:'blur'}]"
        >
          <a-input v-model:value="formState.email" placeholder="请输入邮箱">
            <template #prefix>
              <MailOutlined class="site-form-item-icon" />
            </template>
          </a-input>

        </a-form-item>

        <!--输入手机号码-->

        <a-form-item
            name="phoneNumber"
            :rules="[{ required:true, message:'请输入手机号码！',trigger:'blur'}]"
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
            :rules="[{ required:true, message:'请输入验证码！',trigger:'blur'}]"
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

        <!--提交按钮-->

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
import {reactive,computed,ref,inject} from 'vue';
import {LockOutlined,UserOutlined,InfoCircleOutlined,MailOutlined,
  PhoneOutlined,MessageOutlined} from '@ant-design/icons-vue';
import {message} from 'ant-design-vue';
import {useRouter} from "vue-router";
import {useStore} from 'vuex'
import md5 from 'js-md5'


export default {
  name: "RegisterCard",
  components:{LockOutlined,UserOutlined,InfoCircleOutlined,
    MailOutlined,PhoneOutlined,MessageOutlined},
  setup(){
    // initialize data
    const tabList = [
      {
        key:'login',
        tab:'登陆'
      },
      {
        key:'register',
        tab:'注册'
      }
    ]
    const key = ref('register')
    // 表单的数据形式
    const formState = reactive({
      username:'',
      password:'',
      checkPassword:'',
      email:'',
      phoneNumber:'',
      verifyCode:''
    })
    // 发送给用户端的数据
    const send = {
      verifyCode:'',
      phoneNumber:''
    }
    // 计时器
    const data = reactive({
      count:0,
      validationDisabled:true,
      timer:null
    })

    //定义外部引入的组件
    const router = useRouter() // the use of vueRouter
    const store = useStore() // the use of vueX
    const axios  = inject('axios') // inject方式引入axios
    //const cookies = inject('cookies')// inject方式引入cookies

    // 定义function....
    // 计算属性定义按钮的disable
    const disabled = computed(()=>{
      return !(formState.username&&formState.password
          &&formState.checkPassword&&formState.email&&
          formState.phoneNumber && formState.verifyCode)
    })

    const verifyCodeButtonMsg = computed(()=>{
      return data.count === 0?'获取验证码':data.count.toString() + "秒后重发"
    })



    // 定义点击card跳转的事件
    const onTabChange = (newKey)=>{
      if(newKey==='login')
      {
        router.push({path:'/login'})
      }
    }
    // 获得验证码的逻辑
    let getVerifyCode = ()=> {
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
      /*
      axios.post(url,send)
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
       */

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

    // 定义下方验证合法性的validate
    const validate = {
      SamePassword:(password,checkPassword)=>{
        return (password === checkPassword)
      },
      email:(email)=>{
        let pattern = /^([a-zA-Z]|[0-9])(\w|\\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/
        return pattern.test(email)
      },
      phoneNumber:(number)=>
      {
        let pattern = /^(13[0-9]|15[0123456789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;

        return pattern.test(number)
      }
    }

    // 下面定义的是form提交后的前端逻辑事件
    // the action after login successfully
    const submitForm = (event)=>{
      event.preventDefault()
      // 验证数据的有效性
      if(!validate.SamePassword(formState.password,formState.checkPassword))
      {
        message.warning('两次输入的密码不一致')
        return
      }
      if(!validate.email(formState.email))
      {
        message.warning('请输入合法的邮箱')
        return
      }
      else if(!validate.phoneNumber(formState.phoneNumber))
      {
        message.warning('请输入合法的联系方式')
        return
      }
      // the data now are passed the validation
      // now start access and check the data from the back-end
      let toParams = {
        username: formState.username.toString(),
        phoneNumber: formState.phoneNumber.toString(),
        verifycode: send.verifyCode.toString(),
        password: md5(formState.password).toUpperCase()
      }
      if(toParams.verifycode!==formState.verifyCode)
      {//输入的验证码不同
        message.error('验证码输入错误')
        return
      }
      let url = store.state.backend_url+'/register'
      axios.post(url,toParams)
          .then((response)=>{
            let state = response.data['state'];
            if(state){
              message.success( '注册成功！')
              router.push('/login');
            }
            else{
              message.error('用户名或手机号已被占用')
            }
          })
          .catch((error)=>{
            console.log(error)
            message.error('注册出现错误！')
          })
    }

    return{
      formState,
      disabled,
      tabList,
      key,
      onTabChange,
      getVerifyCode,
      submitForm,
      data,
      verifyCodeButtonMsg
    }
  }
}
</script>

<style scoped>
.CardForm{
  margin: auto;
  width: 100%;
}
.Card{
  background-color: rgba(255,255,255,0.6);
  margin: auto;
  border-radius:50px;
  width: 400px;
  height: 550px
}
</style>