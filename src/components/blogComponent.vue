<template>
  <div class="content">
    <div class="title">
      <div class="title-content">{{content.title.value}}</div>
    </div>
    <div class="tags">
      <el-tag class="ml-2" type="success" v-for="(item, index) in content.tags.value" :key="index">{{item}}</el-tag>
      <img :src=content.cover_url.value v-show="content.cover_url.value !== ''"  style="height: 80px;float: right;margin-right: 35px">
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
      id:String,
      user_id:String,
      title: String,
      tags:Array,
      likes:Number,
      cover_url:String,
      is_anonymous: Boolean,
      content:String,
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
  margin-left: 20px;
  width: 80%;
}
.title-content{
  text-decoration: none;
  font-size: 18px;
  font-synthesis: style;
  font-weight: 600;
  cursor: pointer;
}
.title-content:hover{
  color: rgb(248, 146, 12);
}
.content{
  width: 100%;
  position: relative;

  border-bottom: 1px solid #f0f2f7;
}
.content-item{
  margin: 20px 0 20px 0;

}
.ml-2{
  margin-right: 10px;
}

.likes,.tags{
  width: 80%;
  margin-left: 20px;
}


</style>