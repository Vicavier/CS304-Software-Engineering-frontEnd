<template>
  <div class="upload-area">
    <div :style="{ backgroundImage: `url(${imageUrl})`, backgroundColor:'#A9A9A9' }">
      <el-upload
          action="http://localhost:8081/cloud_storage/file/uploading"
          :show-file-list="false"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          :on-success="handleFileUpload">
        <!--        <img v-if="imageUrl" :src="imageUrl" class="avatar" />-->
        <!--        <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>-->
      </el-upload>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Swal from "sweetalert2";

export default {
  name: "bgComponent.vue",
  data() {
    return {
      imageUrl:this.$global.getCookie('background')
    };
  },
  setup(){

  },
  methods: {
    handleFileUpload(res) {
     axios({
       method: 'POST',
       url: 'http://localhost:8010/userCenter/editUserData',
       params: {
         username: this.$global.getCookie('username'),
         password: this.$global.getCookie('password'),
         nick_name:this.$global.getCookie('nickname'),
         avatar:this.$global.getCookie('avatar'),
         background:res.data.url,
         email:this.$global.getCookie('email'),
         id:this.$global.getCookie('id')
       }
     })
         .then(res =>{
           console.log(res.data)
           if (res.data.code===200){
             Swal.fire({
               icon: 'success',
               title: '成功！',
               text: '您已经成功上传背景图',
             })
           }
         })
      this.imageUrl = res.data.url
      this.$global.setCookie('background', this.imageUrl,1)
    }
  }
}
</script>

<style scoped>
.upload-area {
  position: relative;
}

.upload-area input[type="file"] {
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
}

.upload-area div {
  width: 100%;
  height: 300px;
  background-size: cover;
  background-position: center;
}

.upload-area el-button {
  float:right;
  text-align:center;
  padding: 15px 30px 15px 30px;
}
</style>