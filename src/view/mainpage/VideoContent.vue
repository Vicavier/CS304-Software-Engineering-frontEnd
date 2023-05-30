<template>
  <el-container>
    <el-main>
      <div class="main-page">
        <!--主要路由区域-->
        <div class="main-content">
          <!-- v-me-editor 组件-->
          <div id="main">
            <div class="content">
              <videoComponent></videoComponent>
              <div>评论区</div>
            </div>
          </div>
        </div>
      </div>
      <div class="vice-content">
        <div class="vice-content-title">
          <i class="icon-up"></i>
          我要上传
          <el-button type="primary" @click="uploadVideo">点击上传</el-button>
        </div>
        <div class="vice-content-title">
          <i class="icon-upload"></i>
          上传作者
        </div>
        <div class="up-info">
          <img src="https://image-attachment.oss-cn-beijing.aliyuncs.com/data/www/html/uc_server/data/avatar/002/37/19/19_avatar_middle.jpg?v=" style="width: 30px;display: inline-block" alt=""/>
          临界
        </div>
        <div class="vice-content-title">
          <i class="icon-film"></i>
          作者的其他视频
        </div>
        <div class="video-list">
          <smallVideoComponent></smallVideoComponent>
          <smallVideoComponent></smallVideoComponent>
          <smallVideoComponent></smallVideoComponent>
        </div>
      </div>
    </el-main>
  </el-container>
</template>
<script>
import videoComponent from "@/components/videoComponent.vue";
import smallVideoComponent from "@/components/smallVideoComponent.vue";
import router from "@/router";
import {ref} from "vue";
export default {
  components:{
    videoComponent,
    smallVideoComponent,
  },
  setup(){
    let login = ref(false)
    function uploadVideo(){
      if(login.value){
        console.log('可以上传')
      }else{
        router.push('./sign')
      }
    }
    return{
      uploadVideo,
    }
  }
}
</script>
<style scoped>
.main-page {
  width: 90%;
  margin: 0 auto;
}

.main-content, .vice-content {
  display: inline-block;
  float: left;
}

.main-content {
  width: 65%;
  background-color: rgb(255, 255, 255);
}

.vice-content {
  width: 25%;
  margin-left: 20px;
  background-color: rgb(255, 255, 255);
}

.vice-content-title{
  height: 50px;
  line-height: 50px;
  margin-left: 20px;
}
.up-info{
  margin-left: 40px;
}
.video-list{
  margin-left: 20px;
}
</style>