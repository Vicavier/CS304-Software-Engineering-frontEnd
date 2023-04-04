<template>
  <div class="main-content-nav">
    <div class="main-content-nav-item">文章</div>
    <div class="main-content-nav-item">问答</div>
  </div>

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
      },{
        id:3,
        title:'王者荣耀凉了吗？',
        tags:['王者荣耀','电子竞技'],
        likes:234,
        url:'',
      },{
        id:4,
        title:'电子系和计算机系如何选择',
        tags:['电子','计算机','选专业'],
        likes:555,
        url:'',
      },
    ])
    return {
      contentList
    }
  }
}
</script>

<style lang="less" scoped>
.main-content-nav{
  height: 65px;
  width: 100%;
  border-bottom: 1px solid #f0f2f7;
}

.main-content-nav-item{
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
  cursor:pointer;
}
</style>