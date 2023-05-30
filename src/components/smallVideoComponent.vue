<template>
  <div class="video-box">
    <div class="video-info">
      <span>Never Gonna Give You Up~</span>
      <span>{{update}}</span>
    </div>
    <div class="video-cover">
      <img
          src="https://i1.hdslb.com/bfs/archive/47d93e3d993ce921149e181760db307ee151547e.jpg@672w_378h_1c_!web-search-common-cover.webp"
          style="width: 120px"/>
    </div>
  </div>
</template>
<script>
import {ref} from 'vue'

export default {
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