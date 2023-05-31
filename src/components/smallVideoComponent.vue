<template>
  <div class="video-box">
    <div class="video-info">
      <span>{{ videos.title }}</span>
      <span>{{videos.gmt_create}}</span>
    </div>
    <div class="video-cover">
      <img
          :src="videos.cover"
          style="width: 120px"/>
    </div>
  </div>
</template>
<script>
import {ref} from 'vue'

export default {
  props: {
    videos:{
      id:String,
      title:String,
      gmt_create:String,
      cover:String,
    }
  },
  setup() {
    let update = ref('2023-5-30 19:30')
    return {
      update,
    }
  }
}
</script>
<style scoped>
.video-box {
  width: 100%;
  margin-bottom: 10px;
}

.video-cover {
  display: inline-block;
  width: 50%;
}

.video-info {
  float: left;
  width: 50%;
}
span{
  float: left;
}
</style>