<template>
  <div class="profile-main">
    <div class="profile-header">
      <div class="user-cover-editor">
        <bg-component></bg-component>
      </div>
    </div>

    <div class="profile-info">
      <el-avatar shape="square" :size="100" :fit="'fill'" :src="url" />
      <div class="big-font">
         {{id}}, 您好！
      </div>
    </div>

    <div class="profile-body">
      <el-row class="mb-4">
<!--        <el-button @click="changeNav(0)">回答</el-button>-->
        <el-button @click="changeNav(1)">提问</el-button>
        <el-button @click="changeNav(2)">文章</el-button>
        <el-button @click="changeNav(3)">修改个人资料</el-button>
      </el-row>
    </div>

    <div class="profile-items">
      <div v-if="nav === 0"><AComponent></AComponent></div>
      <div v-else-if="nav === 1"><QComponent ></QComponent></div>
      <div v-if="nav === 2"><PersonalArticle></PersonalArticle></div>
      <div v-else-if="nav === 3"><infoEdit></infoEdit></div>
    </div>
  </div>
</template>
<script>
import QComponent from "@/view/profile/QComponent.vue";
import AComponent from "@/view/profile/AComponent.vue";
import PersonalArticle from "@/view/profile/PersonalArticle.vue";
import infoEdit from "@/view/profile/InfoEdit.vue";
// import router from "@/router";
import {getCookie} from "@/js/global";
// import InfoEdit
export default {
  components:{
    PersonalArticle, infoEdit,QComponent, AComponent,
    // bgComponent
  },
  data(){
    return{
      nav:1,
      // userName:Yuki,
    }
  },
  methods:{
    changeNav(num) {
      this.nav = num;
    }
  },
  setup(){
    let id = getCookie("nickname")
    const url = getCookie("avatar");
    // let nav = 0;

    return{
      url,
      id
    }
  }
}
</script>

<style scoped>

.user-cover-editor el-image {
  overflow: hidden;
  width: 100%;
  height: 80px;
  z-index:-1;
}

.user-cover-editor el-button {
  overflow: hidden;
  float:right;
  text-align:center;
  padding: 15px 30px 15px 30px;
  /*z-index:;*/
}

.profile-info{
  overflow: hidden;
  margin-top: 14px;
}


</style>