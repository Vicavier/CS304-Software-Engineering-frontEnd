<template>
  <el-container>
    <el-main>
      <div class="main-page">
        <!--主要路由区域-->
        <div class="main-content">
          <!-- v-me-editor 组件-->
          <div id="main">
            <div class="nav">
              <div class="main-content-nav">
                <div class="main-content-nav">
                  <div id="article" class="main-content-nav-item" :class="{selected:selectDiv==='article'}"  @click="loadArticle()">文章</div>
                  <div id="Q&A" class="main-content-nav-item"  :class="{selected:selectDiv==='Q&A'}" @click="loadQA()">问答</div>
                </div>
              </div>
            </div>
            <div class="content">
              <div class="blogs" v-if="showBlogs">
                <BlogComponent v-for="(content,index) in contentList" :key="index" :content="toRefs(content)"
                               @click="toEssay(content)"></BlogComponent>
              </div>
              <div class="QAblogs" v-if="!showBlogs">
                <QAComponent v-for="(QAContent, index) in QAcontentList" :key="index" :QAContent="toRefs(QAContent)"></QAComponent>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="vice-content">
        <div class="vice-content-title">
          <i class="icon-bubble"></i>
          创作中心
          <el-tag class="ml-2" >Lv {{level}}</el-tag>
        </div>
        <div class="vice-content-nav">
          <div class="vice-content-nav-item">
            <el-button type="primary" circle @click="toWritePage"><i class="icon-write"></i></el-button>
            <h5>写文章</h5>
          </div>
          <div class="vice-content-nav-item">
            <el-button type="warning" circle @click="toQAPage"><i class="icon-bubbles"></i></el-button>
            <h5>问问题</h5>
          </div>
        </div>
        <div class="quick-QA">
          <el-input
              v-model="quick_QA.content"
              :autosize="{ minRows: 2, maxRows: 4 }"
              type="textarea"
              placeholder="快速提问"
          />
          <div style="margin: 10px 0">
            <el-button type="primary" @click="postQuestion">发布问题</el-button>
          </div>
        </div>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import BlogComponent from "@/components/blogComponent.vue";
import QAComponent from "@/components/QAComponent.vue";
import {reactive,ref, toRefs, onMounted} from "vue";

import router from "@/router";
import axios from "axios";

export default {
  components: {
    BlogComponent,
    QAComponent,
  },
  methods: {toRefs},
  setup() {
    const contentList = reactive([
      {
        cnt: 1,
        id: 1,
        user_id: 32132131,
        title: '母猪的产后护理',
        tags: ['科技','动物'],
        likes: 114,
        cover: 'https://img.zhuwang.cc/2020/1130/20201130015554310.png',
        is_anonymous: Boolean,
        content: '常言道：今天的辛勤付出是为了明日更好的收获。母猪繁育无小事，各个环节都容不得三心二意，诸如题主所说的母猪产后护理，做的好不但能防止子宫内膜炎等疾病 …\n' +
            '眼下大小猪价格皆',
      },
      {
        cnt: 1,
        id: 2,
        user_id: 32132131,
        title: '高等元素论',
        tags: ['化学'],
        likes: 233,
        cover: 'https://pic2.zhimg.com/50/v2-0b7c25ce56a5bf5580961769cc1b961c_hd.jpg?source=1940ef5c',
        is_anonymous: Boolean,
        content: '666',
      }
    ])
    const QAcontentList = reactive([
      {
        id:1,
        title: '如何使用chatGPT',
        views:23,
        answers:3,
        likes:43,
        poster:'临界',
        avatar_url:'https://avatars.githubusercontent.com/u/90630675?s=96&v=4'
      },
      {
        id:2,
        title: '怎样可以邀请薛其坤和我一起吃麦当劳？',
        views:11,
        answers:2,
        likes:44,
        poster:'piru',
        avatar_url:'https://image-attachment.oss-cn-beijing.aliyuncs.com/data/www/html/uc_server/data/avatar/002/37/19/19_avatar_middle.jpg?v='
      }
    ])
    let selectDiv = ref('article')
    let quick_QA = reactive({
      title: '',
      is_anonymous: false,
    })
    let level = ref('2')
    let showBlogs = ref(true)
    function toEssay(cont) {
      console.log(cont)
      router.push({
        name: 'article',
        params: {
          id: cont.id,
          title: cont.title,
          author: cont.user_id,
        }
      });
    }
    function loadArticle(){
      selectDiv.value = 'article'
      showBlogs.value = true
    }
    function loadQA(){
      selectDiv.value = 'Q&A'
      showBlogs.value = false
    }
    function toWritePage(){
      router.push('/write');
    }
    function toQAPage(){
      router.push('/write/QA')
    }
    function postQuestion(){
      axios.post('http://10.26.5.9:8081/Article/topic/save', {
        title: quick_QA.title,
        poster:'教父爷爷',
        is_anonymous: quick_QA.is_anonymous,
      }).then((response)=>{
        console.log(response.data)
      })
    }
    onMounted(() => {
      console.log('开始获取。。。')
      axios({
        method: 'GET',
        url: 'http://10.26.5.9:8010/article/getAllArticle',
        transformRequest: [function (data) {
          let str = '';
          for (let key in data) {
            str += encodeURIComponent(key) + '=' + encodeURIComponent(data[key]) + '&';
          }
          return str;
        }]
      }).then(resp => {
        if (resp.status === 200){
          console.log(resp.data.data.data)
          let list = resp.data.data.data
          for (let i = 0; i < resp.data.data.data.length; i++) {

            console.log(list[i])
            contentList.push(list[i])
          }
          console.log(contentList)
        }
      })
    })

    return {
      contentList,
      QAcontentList,
      quick_QA,
      level,
      showBlogs,
      toEssay,
      selectDiv,
      loadArticle,
      loadQA,
      toWritePage,
      toQAPage,
      postQuestion
    }
  }
}
</script>

<style lang="less" scoped>
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
.main-content-nav {
  height: 65px;
  width: 100%;
  border-bottom: 1px solid #f0f2f7;
  background-color: rgb(255,255,255);
}
.selected {
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}
.main-content-nav-item {
  height: 100%;
  float: left;
  width: 50%;
  font-size: 16px;
  font-weight: bolder;
  line-height: 65px;
  text-align: center;

}

.main-content-nav-item:hover {
  color: #8D99DE;
  cursor: pointer;
}
.vice-content {
  width: 25%;
  margin-left: 20px;
  background-color: rgb(255, 255, 255);
}

.vice-content-title{
  height: 50px;
  line-height: 50px;
  font-size: 20px;

}
.vice-content-nav{
  width: 100%;
  text-align: center;
}
.vice-content-nav-item{
  float: left;
  width: 50%;
}
.quick-QA{
  width: 90%;
  margin: 0 auto;
  text-align:center;
}
</style>