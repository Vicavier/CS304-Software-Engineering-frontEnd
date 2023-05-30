<template>
  <div class="Sell-component">
    <div class="Sell-content">
      <div id="title">{{ buyContent.stuff }}</div>
      <div id="question-info">预算价：{{ buyContent.price }} </div>
    </div>
    <div class="Sell-content">
      <div class="question-poster">
        <img :src=buyContent.avatar_url style="width: 50px;">
        {{buyContent.poster}}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props:{
    buyContent:{
      id:Number,
      stuff: String,
      poster:String,
      avatar_url:String,
      price:Number,
    }
  }
}
</script>
<style scoped>
.Sell-component{
  width: 100%;
  min-height: 50px;
  border-bottom: 1px solid #f0f2f7;
}
.Sell-content{
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
.stuff-img{
  margin: 10px 0 10px 30px;
}

</style>