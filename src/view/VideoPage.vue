<template>
  <el-carousel :interval="4000" type="card" height="250px">
    <el-carousel-item v-for="(item,index) in carouselItem" :key="index" @click="toAds(item)">

      <el-image :src="item.cover" style="width:100%;height:inherit;" alt="图片丢失了"/>


    </el-carousel-item>
  </el-carousel>
  <div class="video-menu"></div>
  <div class="left-nav">
    <div id="life" class="left-nav-item" :class="{selected:selectDiv==='life'}" @click="loadLife" >生活</div>
    <div id="games" class="left-nav-item" :class="{selected:selectDiv==='games'}" @click="loadGames" >游戏</div>
    <div id="learning" class="left-nav-item" :class="{selected:selectDiv==='learning'}" @click="loadLearning" >学习</div>
    <div id="activity" class="left-nav-item" :class="{selected:selectDiv==='activity'}" @click="loadActivity" >活动/社团</div>
  </div>
  <div class="video-list" v-show="selectDiv==='life'">
    <el-card v-for="(item, index) in lifeVideoList" :key="index" :body-style="{ padding: '10px' }" @click="toSpecificVideo(item)">
      <div class="img-cover">
        <img
            :src="item.cover"
            class="image"
        />
      </div>
      <div style="padding: 14px">
        <span>{{item.title}}</span>
        <div class="bottom">
          <time class="time">{{ item.uptime }}</time>
        </div>
      </div>
    </el-card>
  </div>
  <div class="video-list" v-show="selectDiv==='games'">
    <el-card v-for="(item, index) in gamesVideoList" :key="index" :body-style="{ padding: '10px' }" @click="toSpecificVideo(item)">
      <div class="img-cover">
        <img
            :src="item.cover"
            class="image"
        />
      </div>
      <div style="padding: 14px">
        <span>{{item.title}}</span>
        <div class="bottom">
          <time class="time">{{ item.uptime }}</time>
        </div>
      </div>
    </el-card>
  </div>
  <div class="video-list" v-show="selectDiv==='learning'">
    <el-card v-for="(item, index) in learningVideoList" :key="index" :body-style="{ padding: '10px' }" @click="toSpecificVideo(item)">
      <div class="img-cover">
        <img
            :src="item.cover"
            class="image"
        />
      </div>
      <div style="padding: 14px">
        <span>{{item.title}}</span>
        <div class="bottom">
          <time class="time">{{ item.uptime }}</time>
        </div>
      </div>
    </el-card>
  </div>
  <div class="video-list" v-show="selectDiv==='activity'">
    <el-card v-for="(item, index) in activityVideoList" :key="index" :body-style="{ padding: '10px' }" @click="toSpecificVideo(item)">
      <div class="img-cover">
        <img
            :src="item.cover"
            class="image"
        />
      </div>
      <div style="padding: 14px">
        <span>{{item.title}}</span>
        <div class="bottom">
          <time class="time">{{ item.uptime }}</time>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script>
import {onMounted, reactive, ref} from 'vue';
import router from "@/router";
import {CarouselItem} from "@/hook/CarouselItem";
import axios from "axios";

export default {
  setup() {
    let selectDiv = ref('life')
    const currentDate = ref('2023-5-27')
    const carouselItem = CarouselItem
    const lifeVideoList = reactive([
      {
        id:1,
        title:'钢铁侠请苹果公司拍的宣传片',
        cover:'https://i2.hdslb.com/bfs/archive/0c8566b1e6a2f6fa8956e5729a10ab8c869d053e.jpg@560w_350h_1c_!web-space-index-topvideo.webp',
        url:'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4',
        uptime:'2023-3-3',
        uploader:'admin'
      },
      {
        id:2,
        title:'[混剪 踩点]叶问:我就会亿点点。',
        cover:'https://i2.hdslb.com/bfs/archive/4c33106ee62933d2c8d16adaac369606c5fb3c89.jpg@320w_200h_1c_!web-space-upload-video.webp',
        url:'https://media.w3.org/2010/05/sintel/trailer.mp4',
        uptime:'2022-2-21',
        uploader:'admin'
      }
    ])
    const gamesVideoList = reactive([
      {
        id:1,
        title:'狂魔哥向七彩猫、赖神、大仙借号，最终被同台主播赚走100块后顶',
        cover:'https://i2.hdslb.com/bfs/archive/3d93a73b3efe535162e4825a48c31c48de210727.jpg@672w_378h_1c_!web-home-common-cover.webp',
        url:'http://mirror.aarnet.edu.au/pub/TED-talks/911Mothers_2010W-480p.mp4',
        uptime:'2023-3-3',
        uploader:'admin'
      },
    ])
    const learningVideoList = reactive([
      {
        id:1,
        title:'机器学习入门到精通！不愧是公认的讲的最好的【机器学习全套教',
        cover:'https://i1.hdslb.com/bfs/archive/c3f3a350ba53ecdea6859a143a0ed9c5910e80e2.png@672w_378h_1c_!web-search-common-cover.webp',
        url:'https://media.w3.org/2010/05/sintel/trailer.mp4',
        uptime:'2023-3-3',
        uploader:'admin'
      },
    ])
    const activityVideoList = reactive([
      {
        id:1,
        title:'37所友校学生会为苏苏加油！祝南方科技大学学生会10周年生日快乐',
        cover:'https://i2.hdslb.com/bfs/archive/9332d7df0878a876e8ab6ee0e9e7a20329866f26.jpg@672w_378h_1c_!web-search-common-cover.webp',
        url:'http://vjs.zencdn.net/v/oceans.mp4',
        uptime:'2023-3-3',
        uploader:'admin'
      },
    ])
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

    function toSpecificVideo(cont) {
      console.log(cont)
      router.push({
        name: 'playVideo',
        params: {
          id: cont.id,
          url:cont.url,
          uploader:cont.uploader,
        }
      });
    }
    function toAds(cont){
      router.push({
        name: 'playVideo',
        params: {
          id: cont.id
        }
      })
    }
    onMounted(()=>{
      axios({
        method: 'GET',
        url: 'http://10.26.5.9:8020/video/all',
        transformRequest: [function (data) {
          let str = '';
          for (let key in data) {
            str += encodeURIComponent(key) + '=' + encodeURIComponent(data[key]) + '&';
          }
          return str;
        }]
      }).then(resp => {
        if (resp.status === 200) {
          console.log(resp.data.data)
          let list = resp.data.data.videos
          for (let i = 0; i < list.length; i++) {
            if (list[i].type === 'life'){
              lifeVideoList.push({
                id:list[i].id,
                title:list[i].title,
                cover:list[i].cover,
                url:list[i].url,
                uptime:list[i].gmt_create,
                uploader:list[i].uploader
              })
            } else if (list[i].type === 'games') {
              gamesVideoList.push({
                id:list[i].id,
                title:list[i].title,
                cover:list[i].cover,
                url:list[i].url,
                uptime:list[i].gmt_create,
                uploader:list[i].uploader
              })
            } else if (list[i].type === 'learning'){
              learningVideoList.push({
                id:list[i].id,
                title:list[i].title,
                cover:list[i].cover,
                url:list[i].url,
                uptime:list[i].gmt_create,
                uploader:list[i].uploader
              })
            } else {
              activityVideoList.push({
                id:list[i].id,
                title:list[i].title,
                cover:list[i].cover,
                url:list[i].url,
                uptime:list[i].gmt_create,
                uploader:list[i].uploader
              })
            }
          }
        }
      })
    })

    return {
      selectDiv,
      currentDate,
      carouselItem,
      lifeVideoList,
      gamesVideoList,
      learningVideoList,
      activityVideoList,
      loadLife,
      loadGames,
      loadLearning,
      loadActivity,
      toSpecificVideo,
      toAds,
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
}

.el-card:hover {
  cursor: pointer;
}

.img-cover {
  margin: 0 auto;
  width: 100%;
  position: relative;
}
.img-cover::before {
  content: "";
  display: block;
  padding-top: 56.25%; /* 高度是宽度的 0.7 倍 */
}

.img-cover > img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>