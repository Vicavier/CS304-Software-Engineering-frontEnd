<template>
  <div class="AComponent">
    <BlogComponent v-for="content in contentList" :key="content.id" :content="toRefs(content)"></BlogComponent>
  </div>
</template>

<script>
import BlogComponent from "@/components/blogComponent.vue";

import { toRefs} from "vue";
import { ref } from 'vue';
import axios from 'axios'
import Swal from "sweetalert2";
import {getCookie} from "@/js/global";

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
    const contentList = ref([])
    axios({
      method:'GET',
      url:'http://10.26.5.9:8010/userCenter/getUserArticles',
      params:{
        userId:getCookie("id")
      }
    }).then(res => {
      const list = res.data.data.data;
      const length = list.length;
      for (let i = 0; i < length;i++) {
        var temp = {
          cnt: i+1,
          id:list[i].id,
          user_id: list[i].user_id,
          title: list[i].title,
          tags: list[i].tags,
          likes: list[i].likes,
          cover: list[i].cover,
          is_anonymous: list[i].is_anonymous,
          content: list[i].content,
        }
        contentList.value.push(temp)
      }
      console.log(contentList.value)
    }).catch(function (error) {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: '失败！',
        text: '无法获取回答',
      })
    });
    return{
      contentList
    }
  }
}
</script>

<style scoped>

</style>