<template>
  <div class="AComponent">
    <BlogComponent v-for="(content,index) in contentList" :key="index" :content="toRefs(content)"
                   @click="toEssay(content)"></BlogComponent>
  </div>
</template>

<script>
import BlogComponent from "@/components/blogComponent.vue";

import { toRefs} from "vue";
import { reactive } from 'vue';
import axios from 'axios'
// import Swal from "sweetalert2";
import {getCookie} from "@/js/global";
import router from "@/router";

export default {
  name: "PersonalArticle.vue",
  data(){
    return{
    }
  },
  methods: {
    toRefs,
  },
  components: {
    BlogComponent
  },
  setup(){
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
    const contentList = reactive([])
    axios({
      method:'GET',
      url:'http://10.26.5.9:8010/userCenter/getUserArticles',
      params:{
        userId:getCookie("id")
      }
    }).then(res => {
      const list = res.data.data.articles;
      const length = list.length;
      for (let i = 0; i < length;i++) {
        // var temp = {
        //   cnt: i+1,
        //   id:list[i].id,
        //   user_id: list[i].user_id,
        //   title: list[i].title,
        //   tags: list[i].tags,
        //   likes: list[i].likes,
        //   cover: list[i].cover,
        //   is_anonymous: list[i].is_anonymous,
        //   content: list[i].content,
        // }
        contentList.push(list[i])
      }
      console.log(contentList)
    }).catch( {
      // console.log(error);
      // Swal.fire({
      //   icon: 'error',
      //   title: '失败！',
      //   text: '无法获取回答',
      // })
    });
    return{
      contentList,
      toEssay
    }
  }
}
</script>

<style scoped>

</style>