<template>
  <div class="content">
    <div class="title">
      <a>{{content.title}}</a>
    </div>
    <div class="tags">
      <el-tag class="ml-2" type="success" v-for="(item, index) in content.tags.value" :key="index">{{item}}</el-tag>
      <img :src=content.url.value v-show="content.url.value !== ''"  style="height: 80px;float: right;margin-right: 35px">
    </div>

    <div class="content-item">
      <div class="likes">
        <el-button type="primary">赞同 {{content.likes}}</el-button>
      </div>
    </div>



  </div>
</template>
<script>

export default {
  props:{
    content:{
      id:Number,
      title: String,
      tags:Array,
      likes:Number,
      url:String,
    }
  },
  setup(props){
    console.log(props.content)


    return {

    };
  }
}
</script>
<style lang="less" scoped>
.title{
  margin-top: 10px;
}
a{
  text-decoration: none;
  font-size: 18px;
  font-synthesis: style;
  font-weight: 600;
}
.content{
  width: 100%;
  position: relative;
  margin-left: 20px;
  border-bottom: 1px solid #f0f2f7;
}
.content-item{
  margin: 20px 0 20px 0;

}
.ml-2{
  margin-right: 10px;
}


</style>