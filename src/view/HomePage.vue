<template>
  <div id="root">
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
          <div class="nav-menu" @click="toSecondHandPage"><i class="icon-folder"></i> 跳蚤市场</div>
          <div class="nav-menu"><i class="icon-heart"></i> 关注</div>
          <div class="nav-menu" @click="toShortVideo"><i class="icon-video-camera"></i> 短视频</div>
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
            <el-button type="primary" @click="LogOut" v-if="check">退出登录</el-button>
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

      </el-main>
    </el-container>
  </div>
</template>

<script>
import {ref} from "vue";
import axios from "axios";
import router from "@/router";
import {checkCookie, clearCookie} from "@/js/global";
import Swal from "sweetalert2";
export default {
  name:'HomePage',
  setup(){
    let check = checkCookie()
    let haveLogin = ref(false)
    let defaultAvatar =  ref('https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png')

    let search_content = ref('')
    let search_module = ref('')
    const textarea = ref('')

    //methods
    function onLogin(){
      // axios.post('http://10.26.5.9:8081').then((response)=>{
      //   console.log(response.data)
      // })
      if (window.localStorage.token) {
        //YUKI:get userinfo's avatar and refresh the page
      } else {
        router.push('/sign');
      }
    }

    function LogOut(){
      clearCookie()
      router.push('/');
      setTimeout(() => {
        location.reload();
      }, 1000); // 延迟1秒后刷新页面
      Swal.fire({
        icon: 'success',
        title: '登出',
        text: '您已登出账号！',
      })
      check = checkCookie()
    }

    function onRegister(){
      axios.post('').then((response)=>{
        console.log(response.data)
      })
    }

    function toSelfPage(){
    //   TODO:检查是否登录，如未登录，需要跳转登录界面
      if (checkCookie()) {
        //true
        router.push('/selfpage');
      } else {
        Swal.fire({
          icon: 'error',
          title: '未登录',
          text: '请先登录',
        })
        router.push('/sign');
      }
    }
    function toHomePage(){
      router.push('/');
    }
    function toWritePage(){
      router.push('/write');
    }
    function toSecondHandPage(){
      router.push('/secondhand')
    }
    function toQAPage(){
      router.push('/write/QA')
    }
    function toShortVideo(){
      router.push('/video')
    }


    return {
      check,
      LogOut,
      haveLogin,
      defaultAvatar,
      search_content,
      search_module,
      textarea,
      onLogin,
      onRegister,
      toSelfPage,
      toHomePage,
      toWritePage,
      toSecondHandPage,
      toQAPage,
      toShortVideo,
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

  min-width: 60px;
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
.el-main::-webkit-scrollbar{
  display: none;
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
  width: 100%;
}
</style>