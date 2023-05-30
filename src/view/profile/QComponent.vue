<template>
  <div class="AComponent">
    <QAComponent v-for="(QAContent, index) in QAcontentList" :key="index" :QAContent="toRefs(QAContent)"></QAComponent>
  </div>
</template>

<script>
// import BlogComponent from "@/components/blogComponent.vue";
import {getCookie} from "@/js/global";
import {reactive, toRefs} from "vue";
import { ref } from 'vue';
import axios from 'axios'
import Swal from "sweetalert2";

export default {
  name: "QComponent.vue",
  data(){
    return{
    }
  },
  methods: {
    toRefs,
  },
  components: {

  },
  setup(){
    const contentList = ref([])
    const QAcontentList = reactive([])
    axios({
      method:'GET',
      url:'http://10.26.5.9:8010/userCenter/getUserTopics',
      params:{
        userId:getCookie('id')
      }
    }).then(res =>
    {
      console.log(res.data.data.data)
      const list = res.data.data.data;
      const length = list.length;
      for (let i = 0; i < length;i++) {
        var temp = {
          id:list[i].id,
          title: list[i].title,
          views:list[i].views,
          answers:list[i].answers,
          likes:list[i].likes,
          poster:null,
          avatar_url:null
        }
        QAcontentList.push(temp)
      }
      console.log(QAcontentList)
    }).catch(function (error) {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: '失败！',
        text: '无法获取回答',
      })
    }

    );
    return{
      contentList,
      QAcontentList
    }
  }
}
</script>

<style scoped>

</style>