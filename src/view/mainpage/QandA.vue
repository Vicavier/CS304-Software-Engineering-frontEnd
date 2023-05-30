<template>
  <div class="QA-root">
    <el-container>
      <div style="height: 90px"></div>
      <el-container>
        <el-aside id="left-side">
          <div class="left-side-content">
            <div style="height: 20px;"></div>
            <div class="left-side-content-user">
              <div id="level"></div>
              <div id="user-name">教父爷爷</div>
              <div id="user-info">
                <div style="line-height: 30px">当前问答等级：<el-tag class="ml-2" type="success">助人为乐</el-tag></div>
                <div>总回答问题数量：{{20}}</div>
              </div>
              <div id="left-side-button" @click="toWritePage">前往创作中心</div>
            </div>
          </div>
        </el-aside>
        <el-main id="main">
          <div class="main-nav">
            <div class="main-link" ><i class="icon-users"></i> 邀请回答</div>
            <div class="main-link" ><i class="icon-clock"></i> 最新推荐</div>
          </div>
          <div class="table-head">
            <div id="table-head-content"><p style="margin-left: 30px">问题</p></div>
            <div id="table-head-content">提问者</div>
          </div>
          <div class="QA-content">
            <QAComponent v-for="QAContent in QAList" :key="QAContent.id" :QAContent="toRefs(QAContent)"></QAComponent>
          </div>

        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import router from "@/router";
import QAComponent from "@/components/QAComponent.vue";
import {toRefs} from "vue";
import {QAContentList} from "@/hook/QAContentList";

export default {
  components:{
    QAComponent
  },
  methods: {toRefs},
  setup(){
    const QAList = QAContentList
    function toHomePage(){
      router.push('/')
    }
    function toSelfPage(){
      router.push('/selfpage');
    }
    function toWritePage(){
      router.push('/write')
    }
    return {
      QAList,
      toWritePage,
      toHomePage,
      toSelfPage,
    }
  }
}
</script>
<style scoped>
@import "@/libs/common.css";
.QA-root{
  background-color: rgb(246,246,246);
}
.nav-menu{
  float: right;
}
#left-side{
  width: 250px;
}
.left-side-content{
  width: 90%;
  margin: 0 auto;
  background-color: rgb(255,255,255);
}
.left-side-content-user{
  margin: 0 auto;
  width: 80%;
}

#level{
  width: 85px;
  height: 100px;
  background: url("@/image/level1.png");
  background-size: 100%;
  margin: 0 auto;
}
@font-face{
  font-family: Myfont;
  src: url("@/libs/HYShangWeiMoFaTiTruingW.ttf");
}
#user-name{
  font-family: Myfont,serif;
  font-size: 30px;
  text-align: center;
  margin: 10px;
}
#user-info{
  margin-top: 10px;
  font-size: 15px;
  text-align: left;
  background-color: rgb(249,249,250);
  border-radius: 6px;
}
#left-side-button{
  margin-top: 10px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  color: white;
  font-size: 20px;
  border-radius: 6px;
  background-color: rgb(5,109,232);
  cursor: pointer;
}
.el-main::-webkit-scrollbar{
  display: none;
}
#main{
  width: 100%;
  height: 100vh;
  background-color: rgb(255,255,255);
  padding: 0;
}
.main-nav{
  height: 50px;
  border-bottom: 1px solid #f0f2f7;
  overflow: hidden;
}
.main-link{
  float: left;
  height: 100%;
  width: 100px;
  text-align: center;
  line-height: 50px;
  margin: 0 20px 20px 20px;
}
.main-link:hover{
  border-bottom: 5px solid #e76e0d;
  cursor: pointer;
}
.table-head{
  width: 100%;
  height: 30px;
  color: rgb(133,144,166);
  font-family: 黑体;
  font-size: 120%;
  /*margin-left: 30px;*/
  line-height: 30px;
  border-bottom: 1px solid #f0f2f7;
}
#table-head-content{
  display: inline-block;
  width: 50%;
}
/*.QA-content{*/
/*  margin-left: 30px;*/
/*}*/
</style>