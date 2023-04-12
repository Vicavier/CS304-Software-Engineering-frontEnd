<template>
  <div class="main-content-nav">
    <div class="main-content-nav-item">文章</div>
    <div class="main-content-nav-item">问答</div>
  </div>

  <div class="blogs">
    <BlogComponent v-for="content in contentList" :key="content.id" :content="toRefs(content)"
                   @click="toEssay(content)"></BlogComponent>
  </div>
</template>

<script>
import BlogComponent from "@/components/blogComponent.vue";
import {reactive, toRefs,onMounted} from "vue";

import router from "@/router";
import axios from "axios";

export default {
  components: {
    BlogComponent
  },
  methods: {toRefs},
  setup() {
    const contentList = reactive([
      {
        id:0,
        user_id:'xx',
        title:'sss',
        tags:['ss','ss'],
        likes:123,
        cover_url:'',
        is_anonymous: false,
        content:'',
      }
    ])

    function toEssay(cont) {
      router.push({
        name: 'article',
        params: {
          id: cont.id,
          title: cont.title,
          author: cont.author,
        }
      });
    }

    onMounted(()=>{
      console.log('开始获取。。。')
      axios({
        method:"POST",
        url:'http://10.26.144.58:8010/article/getPage',

        param:{
          currentPage:1,
          pageSize:5,
        },
        transformRequest: [function (data) {
          let str = '';
          for (let key in data) {
            str += encodeURIComponent(key) + '=' + encodeURIComponent(data[key]) + '&';
          }
          return str;
        }]
      }).then(resp => {
        if (resp.status === 200){
          console.log(resp.data.articleVoPage)
        }
      })
    })
    return {
      contentList,
      toEssay,
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