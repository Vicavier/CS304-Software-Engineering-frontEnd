<template>
  <el-carousel :interval="4000" type="card" height="200px">
    <el-carousel-item v-for="item in 6" :key="item">
      <h3 text="2xl" justify="center">{{ item }}</h3>
    </el-carousel-item>
  </el-carousel>
  <div class="video-menu"></div>
  <div class="left-nav">
    <div id="life" class="left-nav-item" :class="{selected:selectDiv==='life'}" @click="loadLife">生活</div>
    <div id="games" class="left-nav-item" :class="{selected:selectDiv==='games'}" @click="loadGames">游戏</div>
    <div id="learning" class="left-nav-item" :class="{selected:selectDiv==='learning'}" @click="loadLearning">学习</div>
    <div id="activity" class="left-nav-item" :class="{selected:selectDiv==='activity'}" @click="loadActivity">活动/社团</div>
  </div>
  <div class="video-list">
    <el-card :body-style="{ padding: '10px' }" @click="toSpecificVideo">
      <div class="img-cover">
        <img
            src="https://pic.ntimg.cn/file/20160713/17961491_133626260000_2.jpg"
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
          src="https://gss0.baidu.com/94o3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/58ee3d6d55fbb2fb8bb00dfc414a20a44723dc41.jpg"
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
            src="https://pic.ntimg.cn/file/20160713/17961491_133626260000_2.jpg"
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
            src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
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
export default {
  setup(){


    return{
      onCanplay,
      onTimeupdate,
      onPause,
      onPlay,
    }
  }
}
</script>