<template>
  <div class="AComponent">
    <BlogComponent v-for="content in contentList" :key="content.id" :content="toRefs(content)"></BlogComponent>
  </div>
</template>

<script>
import BlogComponent from "@/components/blogComponent.vue";
// import QAComponent from "@/components/QAComponent.vue";
import {reactive, toRefs} from "vue";
export default {
  name: "AComponent.vue",
  methods: {toRefs},
  components: {
    // QAComponent,
    BlogComponent
  },
  setup(){
    const contentList = reactive(
        [{
          // id:0,
          // title: '中国的监狱环境，是否会允许一个犯人每天数小时囚徒健身，练出一身腱子肉甚至绝世武功?',
          // views:100,
          // answers:300,
          // likes:200,
          // poster:'https://image-attachment.oss-cn-beijing.aliyuncs.com/data/www/html/uc_server/data/avatar/002/37/19/19_avatar_middle.jpg?v=',
          // avatar_url:'https://image-attachment.oss-cn-beijing.aliyuncs.com/data/www/html/uc_server/data/avatar/002/37/19/19_avatar_middle.jpg?v='
      id:0,
      title: '中国的监狱环境，是否会允许一个犯人每天数小时囚徒健身，练出一身腱子肉甚至绝世武功?',
      tags:['监狱','锻炼','武功'],
      likes:100,
      cover:'',
    }
    ,
      {
        id:1,
        title: '为什么北极鲶鱼普遍都是神神?',
        tags:['北极鲶鱼'],
        likes:1145,
        cover:'',
      },{
        id:2,
        title:'如何评价南方科技大学中心餐厅',
        tags:['食堂','中心餐厅','电池'],
        likes:2,
        cover:'',
      },{
        id:3,
        title:'王者荣耀凉了吗？',
        tags:['王者荣耀','电子竞技'],
        likes:234,
        cover:'',
      },{
        id:4,
        title:'电子系和计算机系如何选择',
        tags:['电子','计算机','选专业'],
        likes:555,
        cover:'',
      },
    ]
    )
    return{
      contentList
    }
  }
}
</script>

<style scoped>

</style>