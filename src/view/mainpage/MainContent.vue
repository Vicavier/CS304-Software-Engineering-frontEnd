<template>
  <div class="main-content-nav">
    <div id="article" class="main-content-nav-item" :class="{selected:selectDiv==='article'}"  @click="loadArticle()">文章</div>
    <div id="Q&A" class="main-content-nav-item"  :class="{selected:selectDiv==='Q&A'}" @click="loadQA()">问答</div>
  </div>

  <div class="blogs">
    <BlogComponent v-for="(content,index) in contentList" :key="index" :content="toRefs(content)"
                   @click="toEssay(content)"></BlogComponent>
  </div>
</template>

<script>
import BlogComponent from "@/components/blogComponent.vue";
import {reactive,ref, toRefs, onMounted} from "vue";

import router from "@/router";
import axios from "axios";

export default {
  components: {
    BlogComponent
  },
  methods: {toRefs},
  setup() {
    const contentList = reactive([])
    let selectDiv = ref('article')
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
    }
    function loadQA(){
      selectDiv.value = 'Q&A'
    }
    onMounted(() => {
      console.log('开始获取。。。')
      axios({
        method: 'POST',
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
      toEssay,
      selectDiv,
      loadArticle,
      loadQA,
    }
  }
}
</script>

<style lang="less" scoped>
.main-content-nav {
  height: 65px;
  width: 100%;
  border-bottom: 1px solid #f0f2f7;
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
</style>