<template>
  <el-carousel :interval="4000" type="card" height="250px">
    <el-carousel-item v-for="(item,index) in carouselItem" :key="index">

      <el-image :src="item.cover" style="width:100%;height:inherit;" alt="图片丢失了"/>


    </el-carousel-item>
  </el-carousel>
  <div class="video-menu"></div>
  <div class="left-nav">
    <div id="life" class="left-nav-item" :class="{selected:selectDiv==='life'}" @click="loadLife">生活</div>
    <div id="games" class="left-nav-item" :class="{selected:selectDiv==='games'}" @click="loadGames">游戏</div>
    <div id="learning" class="left-nav-item" :class="{selected:selectDiv==='learning'}" @click="loadLearning">学习</div>
    <div id="activity" class="left-nav-item" :class="{selected:selectDiv==='activity'}" @click="loadActivity">
      活动/社团
    </div>
  </div>
  <div class="video-list">
    <el-card :body-style="{ padding: '10px' }" @click="toSpecificVideo">
      <div class="img-cover">
        <img
            src="https://i1.hdslb.com/bfs/archive/3a4578c08e5e4d538d00fc33c72ce4c10a8c0bcd.jpg@672w_378h_1c_!web-home-common-cover.webp"
            class="image"
            style="width: 100%;height: 100%"
        />
      </div>
      <div style="padding: 14px">
        <span>Yummy hamburger</span>
        <div class="bottom">
          <time class="time">{{ currentDate }}</time>
        </div>
      </div>
    </el-card>
    <el-card :body-style="{ padding: '10px' }">
      <img
          src="https://i2.hdslb.com/bfs/archive/94eb9f62b46d39c25a6b3135ec92d75b2670fd44.jpg@672w_378h_1c_!web-home-common-cover.webp"
          class="image"
          style="width: 100%;height: 100%"
      />
      <div style="padding: 14px">
        <span>Yummy hamburger</span>
        <div class="bottom">
          <time class="time">{{ currentDate }}</time>
        </div>
      </div>
    </el-card>
    <el-card :body-style="{ padding: '10px' }">
      <div class="img-cover">
        <img
            src="https://i2.hdslb.com/bfs/archive/fdc4bbd5d2cee4bdcc5de076fe002cb9a2e17e24.jpg@672w_378h_1c_!web-home-common-cover.webp"
            class="image"
            style="width: 100%;height: 100%"
        />
      </div>
      <div style="padding: 14px">
        <span>Yummy hamburger</span>
        <div class="bottom">
          <time class="time">{{ currentDate }}</time>
        </div>
      </div>
    </el-card>
    <el-card :body-style="{ padding: '10px' }">
      <div class="img-cover">
        <img
            src="https://i0.hdslb.com/bfs/archive/0666cf931cfbfcdeb40cdd1c1da123a753bf7e2b.jpg@672w_378h_1c_!web-home-common-cover.webp"
            class="image"
            style="width: 100%;height: 100%"
        />
      </div>
      <div style="padding: 14px">
        <span>Yummy hamburger</span>
        <div class="bottom">
          <time class="time">{{ currentDate }}</time>
        </div>
      </div>
    </el-card>
  </div>

</template>
<script>
import {ref} from 'vue';
import router from "@/router";
import {CarouselItem} from "@/hook/CarouselItem";

export default {
  setup() {
    let selectDiv = ref('games')
    const currentDate = ref('2023-5-27')
    const carouselItem = CarouselItem

    function loadLife() {
      selectDiv.value = 'life'
    }

    function loadGames() {
      selectDiv.value = 'games'
    }

    function loadLearning() {
      selectDiv.value = 'learning'
    }

    function loadActivity() {
      selectDiv.value = 'activity'
    }

    function toSpecificVideo() {
      router.push('/playVideo');
    }

    return {
      selectDiv,
      currentDate,
      carouselItem,
      loadLife,
      loadGames,
      loadLearning,
      loadActivity,
      toSpecificVideo,
    }
  }
}
</script>

<style scoped>
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

.video-menu {
  margin-top: 20px;
  width: 100%;
}

.left-nav {
  width: 10%;
  height: 200px;
  background-color: rgb(255, 255, 255);
  float: left;
}

.left-nav-item {
  height: 50px;
  width: 100%;
  color: black;
  font-family: 黑体;
  font-size: 15px;
  text-align: center;
  line-height: 50px;
  cursor: pointer;
}

.selected {
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}

.video-list {
  width: 89%;
  float: right;
  background-color: rgb(255, 255, 255);
}

.el-card {
  display: inline-block;
  float: left;
  width: 20%;
  height: 200px;
}

.el-card:hover {
  cursor: pointer;
}

.img-cover {
  margin: 0 auto;
  width: 100%;
  height: 80%;
}
</style>