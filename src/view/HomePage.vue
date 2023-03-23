<template>
  <div id="root">
<!--    <el-aside>-->

<!--      <div id="user-info">-->


<!--          <div class="form">-->

<!--            <el-form-item label="">-->
<!--              <el-input v-model="form.username" placeholder="用户名/Username"/>-->
<!--            </el-form-item>-->
<!--            <el-form-item label="">-->
<!--              <el-input v-model="form.password" placeholder="密码/Password" type="password"/>-->
<!--            </el-form-item>-->
<!--            <el-form-item>-->
<!--              <el-checkbox v-model="form.keepalive" label="下次自动登录"/>-->
<!--            </el-form-item>-->
<!--            <el-form-item>-->
<!--              <el-button type="primary" @click="onLogin">登录</el-button>-->
<!--              <el-button @click="onRegister">注册</el-button>-->
<!--            </el-form-item>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->

<!--    </el-aside>-->
    <el-container>
      <el-header>
        <div id="logo">
          <a>
            <img src="../image/logo.png">
          </a>
        </div>
        <div id="link-button">
          <div class="nav-menu" @click="toHomePage"><i class="icon-home"></i> 首页</div>
          <div class="nav-menu" @click="toSelfPage"><i class="icon-user"></i> 我的</div>
          <div class="nav-menu"><i class="icon-folder"></i> 收藏夹</div>
          <div class="nav-menu"><i class="icon-heart"></i> 关注</div>
        </div>
        <div class="search">
          <el-input
              v-model="search_content"
              class="w-50 m-2"
              size="large"
              placeholder="搜索作者、帖子"
          >
            <template #append>
              <i class="icon-search"></i>
            </template>
          </el-input>
        </div>
        <div class="nav_right" v-show="haveLogin">
          <div class="nav_right">
            <img src="../image/avatar.jpg" style="height: 50px;">
          </div>
          <div class="nav_right">
            <el-button type="primary">提问</el-button>
          </div>
        </div>
        <div class="nav_right" v-show="!haveLogin">
          <div class="nav_right">
            <el-button type="primary" @click="onLogin">登录/注册</el-button>
          </div>
        </div>
      </el-header>
      <el-main>
        <div class="main-page">
          <!--主要路由区域-->

          <div class="main-content">
            <router-view></router-view>
          </div>
        </div>
        <div class="vice-content">
          <!--创作中心-->
          <!--推荐关注-->
          <el-button type="primary" @click="toWritePage">进入创作界面</el-button>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import {ref, reactive} from "vue";
import axios from "axios";
import router from "@/router";
export default {
  name:'HomePage',
  setup(){
    let haveLogin = ref(false)
    let defaultAvatar =  ref('https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png')
    let form = reactive({
      username: '',
      password: '',
      keepalive: false,
    })
    let search_content = ref('')
    let search_module = ref('')


    //methods
    function onLogin(){
      // if (form.username !== '' && form.password !== ''){
      //   axios.post('').then((response)=>{
      //     console.log(response.data)
      //   })
      // } else {
      //   alert("请输入用户名或密码！！")
      // }
      haveLogin.value = !haveLogin.value;
    }

    function onRegister(){
      axios.post('').then((response)=>{
        console.log(response.data)
      })
    }

    function toSelfPage(){
    //   TODO:检查是否登录，如未登录，需要跳转登录界面
      router.push('/selfpage');
    }
    function toHomePage(){
      router.push('/');
    }
    function toWritePage(){
      router.push('/write');
    }

    return {
      haveLogin,
      defaultAvatar,
      form,
      search_content,
      search_module,
      onLogin,
      onRegister,
      toSelfPage,
      toHomePage,
      toWritePage,
    }
  },

}
</script>
<style lang="less" scoped>
#root{
  display: block;
}

.el-header {
  height: 80px;
  width: 100%;
  position:fixed;
  line-height: 80px;
  background-color: rgb(255,255,255);
  box-shadow: 0 1px 3px hsla(0,0%,7%,.1);
  overflow: hidden;
  z-index: 99;
}

.el-header #logo {
  height: 50px;
  line-height: 80px;
  float: left;
}
//
//.form {
//  width: 180px;
//}
//.form, .el-checkbox, .el-button{
//  margin: 0 auto;
//}
.nav-menu{
  height: 80px;
  width: 60px;
  text-align: center;
  float: left;
  margin: 0 10px 0 10px;
  //background-color: rgba(238, 159, 6, 0.4);
}
.nav-menu:hover{
  border-bottom: 5px solid #e76e0d;
  cursor: pointer;
}

.search{
  float: left;
  width: 500px;
  margin-left: 30px;
}

.nav_right{
  height: 100%;
  float: right;
  margin-right: 30px;
}

.el-main {
  display: block;
  width: 100%;
  height: 100vh;
  background-color: rgb(246, 246, 246);
  margin-top: 80px;
}
.main-page{
  width: 90%;
  margin: 0 auto;

}

.main-content,.vice-content{
  display: inline-block;
  float: left;
}
.main-content{
  width: 65%;
  background-color: rgb(255,255,255);
}
.vice-content{
  width: 25%;
  margin-left: 20px;
  background-color: rgb(255,255,255);
}



</style>