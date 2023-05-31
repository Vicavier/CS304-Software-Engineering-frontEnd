<template>
  <el-container>
    <el-main>
      <div class="main-page">
        <!--主要路由区域-->
        <div class="main-content">
          <!-- v-me-editor 组件-->
          <div id="main">
            <div class="content">
              <videoComponent :video_url="video_url"></videoComponent>
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
          <img
              src="https://image-attachment.oss-cn-beijing.aliyuncs.com/data/www/html/uc_server/data/avatar/002/37/19/19_avatar_middle.jpg?v="
              style="width: 30px;display: inline-block" alt=""/>
          临界
        </div>
        <div class="vice-content-title">
          <i class="icon-film"></i>
          作者的其他视频
        </div>
        <div class="video-list">
          <smallVideoComponent  v-for="videos in relatedVideo" :key="videos.id" :videos="videos"></smallVideoComponent>
        </div>
      </div>
    </el-main>
  </el-container>
</template>
<script>
import videoComponent from "@/components/videoComponent.vue";
import smallVideoComponent from "@/components/smallVideoComponent.vue";
import router from "@/router";
import {getCookie} from "@/js/global";
import {onMounted, reactive, toRef} from 'vue'
import axios from "axios";

export default {
  props: ['id', 'url', 'uploader'],
  components: {
    videoComponent,
    smallVideoComponent,
  },
  setup(props) {
    // console.log(props)
    let video_url = toRef(props.url)
    const relatedVideo = reactive([])

    function uploadVideo() {
      if (getCookie('id')) {
        console.log('可以上传')
        router.push('/upload')
      } else {
        router.push('/sign')
      }
    }

    onMounted(() => {
      axios({
        method: 'GET',
        url: 'http://10.26.5.9:8020/video/getVideoByUserId',
        params: {
          user_id: props.uploader
        },
        transformRequest: [function (data) {
          let str = '';
          for (let key in data) {
            str += encodeURIComponent(key) + '=' + encodeURIComponent(data[key]) + '&';
          }
          return str;
        }]
      }).then(resp => {
        if (resp.status === 200) {
          let list = resp.data.data.videos
          for (let i = 0; i < list.length; i++) {
            relatedVideo.push({
              id:list[i].id,
              title:list[i].title,
              gmt_create:list[i].gmt_create,
              cover:list[i].cover
            })
          }
        }
      })
    })
    return {
      uploadVideo,
      video_url,
      relatedVideo
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

.vice-content-title {
  height: 50px;
  line-height: 50px;
  margin-left: 20px;
}

.up-info {
  margin-left: 40px;
}

.video-list {
  margin-left: 20px;
}
</style>