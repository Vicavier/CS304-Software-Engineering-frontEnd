<template>
    <div class="blogs">
      <BlogComponent v-for="content in contentList" :key="content.id" :content="toRefs(content)"></BlogComponent>
    </div>
</template>

<script>
import BlogComponent from "@/components/blogComponent.vue";
import {reactive, toRefs} from "vue";

export default {
  components:{
    BlogComponent
  },
  methods: {toRefs},
  setup(){
    const contentList = reactive([
      {
        id:0,
        title: '如何评价南方科技大学CJD教授',
        tags:['CS101A','教学风格'],
        likes:100,
        url:'https://image-attachment.oss-cn-beijing.aliyuncs.com/data/www/html/uc_server/data/avatar/002/37/19/19_avatar_middle.jpg?v=',
      },
      {
        id:1,
        title: '如何评价南方科技大学ZYQ教授',
        tags:['教学风格'],
        likes:1145,
        url:'',
      },{
        id:2,
        title:'如何评价南方科技大学中心餐厅',
        tags:['食堂','中心餐厅','电池'],
        likes:2,
        url:'',
      }
    ])
    return {
      contentList
    }
  }
}
</script>
