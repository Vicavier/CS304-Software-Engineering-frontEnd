<template>
  <el-container>
    <el-aside>
      <div id="logo">
        <a>
          <img src="../image/logo.png">
        </a>
      </div>
      <div id="user-info">
        <div class="have-login" v-show="haveLogin">
          <h1>have login</h1>
        </div>
        <div class="not-login" v-show="!haveLogin">
          <div class="form">
            <el-form-item label="">
              <el-avatar shape="circle" :size="70" :src="defaultAvatar"/>
            </el-form-item>
            <el-form-item label="">
              <el-input v-model="form.username" placeholder="用户名/Username"/>
            </el-form-item>
            <el-form-item label="">
              <el-input v-model="form.password" placeholder="密码/Password" type="password"/>
            </el-form-item>
            <el-form-item>
              <el-checkbox v-model="form.keepalive" label="下次自动登录"/>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onLogin">登录</el-button>
              <el-button @click="onRegister">注册</el-button>
            </el-form-item>
          </div>
        </div>
      </div>
      <div id="link-button">
        <div class="nav-menu"><i class="icon-home"></i> 首页</div>
        <div class="nav-menu"><i class="icon-user"></i> 我的</div>
        <div class="nav-menu"><i class="icon-folder"></i> 收藏夹</div>
        <div class="nav-menu"><i class="icon-heart"></i> 关注/粉丝</div>
      </div>
    </el-aside>
    <el-container>
      <el-header>
        <div class="search" style="width: 1000px">
          <el-input
              v-model="search_content"
              placeholder="搜索作者、帖子"
              class="input-with-select"
          >
            <template #prepend>
              <i class="icon-search"></i>
            </template>
            <template #append>
              <el-select v-model="search_module" placeholder="高级搜索" style="width: 115px">
                <el-option label="综合搜索" value="1" />
                <el-option label="作者" value="2" />
                <el-option label="帖子" value="3" />
              </el-select>
            </template>
          </el-input>
        </div>
      </el-header>
      <el-main>
        <div class="main-content">
          <!--主要路由区域-->
        </div>
        <div class="vice-content">
          <!--创作中心-->
          <!--推荐关注-->
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      haveLogin: false,
      defaultAvatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
      form: {
        username: '',
        password: '',
        keepalive: false,
      },
      search_content:'',
      search_module: '',
    }
  },
  methods: {
    onLogin(){

    },
    onRegister(){

    }
  }
}
</script>
<style lang="less" scoped>
.el-aside {
  height: 100vh;
  width: 200px;
  background-color: rgba(238, 159, 6, .3);
}

.el-header {
  height: 50px;
  line-height: 50px;
  background-color: rgba(231, 110, 13, .5);
}

.el-main {
  background-color: rgba(248, 244, 12, .3);
}

.el-aside #logo {
  height: 50px;
  text-align: center;
  line-height: 50px;
}

.not-login {
  text-align: center;
  display: block;
  margin-top: 20px;
  z-index: 100;
}
.form {
  width: 180px;
}
.form,.el-avatar, .el-checkbox, .el-button{
  margin: 0 auto;
}
.nav-menu{
  height: 50px;
  line-height: 50px;
  text-align: center;
  background-color: #f8f40c;
}
.nav-menu:hover{
  border-left: 5px solid #e76e0d;
  cursor: pointer;
}
.search{

}
.main-content,.vice-content{
  display: inline-block;
  height: 100%;
}
.main-content{
  width: 70%;
  background-color: #449fdb;
}
.vice-content{
  width: 30%;
  background-color: aquamarine;
}



</style>