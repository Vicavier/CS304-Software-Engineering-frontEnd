<template>
  <el-container>
    <el-header>
      <div id="logo">
        <a>
          <img src="../../image/logo.png">
        </a>
      </div>
      <div id="link-button">
        <div class="nav-menu" @click="toHomePage"><i class="icon-home"></i> 首页</div>
        <div class="nav-menu" @click="toSelfPage"><i class="icon-user"></i> 我的</div>
        <div class="nav-menu"><i class="icon-folder"></i> 收藏夹</div>
        <div class="nav-menu"><i class="icon-heart"></i> 关注</div>
      </div>
    </el-header>
    <el-main>
      <div class="nav-menu" @click="toLostPage"><i class="icon-folder"></i> 遗失</div>
      <div class="nav-menu" @click="toFoundPage"><i class="icon-heart"></i> 招领</div>


    </el-main>
  </el-container>
</template>

<script>
export default {
  name: "Lost_Found"
}
</script>

<style scoped>

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

.form {
  width: 180px;
}
.form, .el-checkbox, .el-button{
  margin: 0 auto;
}
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
  width: 65%;
  background-color: rgb(255,255,255);
}
</style>