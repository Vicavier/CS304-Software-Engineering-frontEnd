<template>
  <div class="QA-component">
    <div class="QA-content">
      <div id="title">{{ QAContent.title.value }}</div>
      <div id="question-info">{{ QAContent.views }} 浏览·{{ QAContent.answers }} 回答·{{QAContent.likes}} 点赞</div>
    </div>
    <div class="QA-content">
      <div class="question-poster">
        <img :src=QAContent.avatar_url.value style="width: 25px;">
         {{QAContent.poster.value}}
      </div>
      <el-button id="write-button" type="primary" @click="answer"><i class="icon-write"></i>写回答</el-button>
    </div>
  </div>
</template>
<script>
export default {
  props:{
    QAContent:{
      id:Number,
      title: String,
      views:Number,
      answers:Number,
      likes:Number,
      poster:String,
      avatar_url:String
    }
  },
  setup(){
    function answer(){

    }
  }
}
</script>
<style scoped>
.QA-component{
  width: 100%;
  min-height: 50px;
  border-bottom: 1px solid #f0f2f7;
}
.QA-content{
  display: inline-block;
  width: 50%;
}
#title{
  margin-top: 20px;
  margin-left: 30px;
  max-width: 450px;
  font-size: 120%;
  font-weight: bold;
  font-family: 黑体;
}

#question-info {
  margin-left: 30px;
  margin-top: 5px;
  color: rgb(133,144,166);
  float: left;
}
.question-poster{
  display: inline-block;
}
#write-button{
  float: right;
}

</style>