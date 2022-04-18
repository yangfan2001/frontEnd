<template>
  <div class="CardForm">
    <a-card :bordered="false"
            class="Card"
            :tab-list="tabList"
            :active-tab-key="key"
            @tabChange="key=> onTabChange(key)"
    >
      <template #title>
        <h3 style="text-align: center">恶霸项目管理系统</h3>
      </template>
      <a-form
          :model="formState"
          name="basic"
          :wrapper-col="{ offset:3,span: 18 }"
          autocomplete="off"
          @finish="onFinish"
          @finishFailed="onFinishFailed"
          class="LoginForm"
      >
        <a-form-item
            name="username"
            :rules="[{ required: true, message: '请输入用户名!',trigger:'blur' }]"
        >
          <a-input v-model:value="formState.username" placeholder="请输入用户名">
            <template #prefix>
              <user-outlined type="user" />
            </template>
            <template #suffix>
              <a-tooltip title="账号不能为空">
                <info-circle-outlined style="color: rgba(0, 0, 0, 0.45)" />
              </a-tooltip>
            </template>
          </a-input>
        </a-form-item>

        <a-form-item
            name="password"
            :rules="[{ required: true, message: '请输入密码!',trigger:'blur'}]"
        >
          <a-input-password v-model:value="formState.password" placeholder="请输入密码">
            <template #prefix>
              <LockOutlined class="site-form-item-icon" />
            </template>
          </a-input-password>

        </a-form-item>

        <a-form-item name="remember" :wrapper-col="{ offset: 4, span: 16 }">
          <a-checkbox v-model:checked="formState.remember">记住我</a-checkbox>
        </a-form-item>

        <a-form-item :wrapper-col="{ offset: 3, span: 18 }">
          <a-button :disabled="disabled" type="primary" html-type="submit" block>
            提交
          </a-button>
        </a-form-item>

        <a-form-item :wrapper-col="{ offset: 9, span: 6 }" >
          <a href="#/forget" style="margin: auto;">忘记密码</a>
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>

<script>
import { reactive,computed,ref,inject} from 'vue';
import {LockOutlined,UserOutlined,InfoCircleOutlined} from '@ant-design/icons-vue';
import {useRouter} from "vue-router";
import {useStore} from 'vuex'
import {message} from 'ant-design-vue';
import md5 from 'js-md5'

export default ({
  name:"LoginCard",
  components:{
    LockOutlined,UserOutlined,InfoCircleOutlined
  },
  setup() {
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
    const key = ref('login')
    const router = useRouter() // the use of vueRouter
    const store = useStore() // the use of vueX
    const axios  = inject('axios') // inject方式引入axios
    const cookies = inject('cookies')// inject方式引入cookies

    // 利用proxy引入axios和cookies,这里的proxy
    //const {proxy} = getCurrentInstance();

    const formState = reactive({
      username: '',
      password: '',
      remember: true,
    });

    const disabled = computed(() => {
      return !(formState.username && formState.password)
    })


    const onTabChange = (newKey)=>{
      if(newKey==='register')
      {
        router.push({path:'/register'})
      }
    }

    const onFinish = values => {
      console.log('Success:', values);
      // 传输数据
      let toParams = {
        username: values.username.toString(),
        password: md5(values.password).toUpperCase()
      }
      console.log(toParams)
      // 利用axios对后端发送post请求
      let url = store.state.backend_url+'/login'
      axios.post(url,toParams)
          .then((response) => {
            console.log(response)
            // 设置网页的cookies
            cookies.set('user', response.data['username'])
            cookies.set('token', response.data['token'])
            // 登陆成功后发送消息
            message.success('登陆成功！')
            //这里考虑加一个定时器
            console.log(router);
            //
            router.push('/')
          })
          .catch((error) => {
            message.error('用户名或密码错误!')
            console.log('登陆失败',error);
          })
    };

    const onFinishFailed = () => {
      message.error('连接错误!!!')
    };

    return {
      formState,
      onFinish,
      onFinishFailed,
      disabled,
      tabList,
      key,
      onTabChange
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
  background-color: rgba(255,255,255,0.6);
  margin: auto;
  width: 300px;
  height: 400px;
  border-radius:40px;
}
</style>