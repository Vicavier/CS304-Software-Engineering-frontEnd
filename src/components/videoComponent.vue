<template>
  <div class="video-box">
    <vue3videoPlay v-bind="options"/>
  </div>
</template>

<script>

import {reactive} from "vue";
import vue3videoPlay from "vue3-video-play";

export default {
  components:{
    vue3videoPlay
  },
  setup() {
    const options = reactive({
      src: "https://cdn.jsdelivr.net/gh/xdlumia/files/video-play/IronMan.mp4", //视频源
    })
    return {
      options
    }
  }
};

</script>
<style scoped>
.video-box{
  margin:0 auto;
}

</style>