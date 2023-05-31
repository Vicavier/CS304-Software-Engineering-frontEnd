<template>
  <div class="header" v-if="editting">
    <div style="font-family: 'Microsoft YaHei';font-size: 20px; margin-bottom: 15px;margin-left: 175px" >更换头像</div>
    <el-upload
        class="avatar-uploader"
        action="http://10.26.5.9:8081/cloud_storage/file/uploading"
        :show-file-list="false"
        accept="image/png, image/jpg, image/jpeg, image/gif"
        :on-success="handleAvatarSuccess"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar" @change="handleAvatarSuccess"/>

      <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
      <!--    <input type="file" @change="handleAvatarSuccess">-->
    </el-upload>
  </div>

  <div class="info">
    <el-form
        :label-position="labelPosition"
        label-width="100px"
        :model="formLabelAlign"
        style="max-width: 460px"
        :disabled="!editting"
    >
      <el-form-item label="昵称">
        <el-input v-model="formLabelAlign.nick_name" />
      </el-form-item>
      <el-form-item label="账号">
        <el-input v-model="formLabelAlign.username" />
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="formLabelAlign.password" />
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="formLabelAlign.email" />
      </el-form-item>
    </el-form>
    <div class="changeInfo">
      <el-button type="success" v-if="!editting" @click="editting = true" >修改个人资料</el-button>
      <el-button type="primary" v-if="editting" @click="onSubmit(
      )">保存修改</el-button>
      <el-button v-if="editting" @click="backToQ()">取消</el-button>
    </div>
  </div>
</template>

<script>
import {ref} from 'vue';
// import {reactive} from 'vue'
// import axios from "axios";
import {getCookie, setCookie} from "@/js/global";
import router from "@/router";
import Swal from 'sweetalert2'
export default {
  name:"infoEdit.vue",
  data(){
    return{
      formLabelAlign:{
        id: getCookie("id"),
        username: getCookie("username"),
        password:getCookie("password"),
        nick_name: getCookie("nickname"),
        email: getCookie("email"),
        avatar: getCookie("avatar"),
        background: getCookie("background")
        //username, password, nick_name,email,avatar, background
      },
      imageUrl:ref(''),
      labelPosition: ref('right'),
      editting:false
    }
  },
  methods:{
    handleAvatarSuccess(resp){
      console.log(resp)
      this.imageUrl = resp.data.url
    },
    onSubmit() {
      //YUKI:submit profile for updates
      this.axios({
        method:'POST',
        url: 'http://10.26.5.9:8010/userCenter/editUserData',
        params:{
          id:this.formLabelAlign.id,
          username: this.formLabelAlign.username,
          password:this.formLabelAlign.password,
          nick_name:this.formLabelAlign.nick_name,
          email:this.formLabelAlign.email,
          avatar:this.imageUrl,
          background:this.formLabelAlign.background
        }
      }).then(function (response) {
        // console.log(response.data.data.user)
        const list = response.data.data.user
        setCookie('username', list.username,1)
        setCookie('password', list.password, 1)
        setCookie('nickname',list.nick_name,1)
        setCookie('email', list.email,1)
        setCookie('avatar', list.avatar,1)
        setCookie('background', list.background,1)
        // console.log(response);
        router.push('/selfpage')
        setTimeout(() => {
          location.reload();
        }, 1000); // 延迟1秒后刷新页面
        Swal.fire({
          icon: 'success',
          title: '成功！',
          text: '您已经成功修改资料并上传!',
        })
      })
          .catch(function (error) {
            Swal.fire({
              icon: 'error',
              title: '失败！',
              text: '上传资料失败',
            })
            console.log(error);
          });
      // router.push('/selfpage')
    },
    backToQ() {
      this.editting = false;
    }
  },

}
</script>

<style>
.changeInfo{
  height: 30px;
  align-items: center;
  align-content: center;
  align-self: center;
  margin-left: 200px;
  margin-bottom: 30px;
}
.header{
  height: 200px;
  margin-left: 150px;
  margin-right: 30px;
  margin-top: 20px;
}

.info{
  height: 400px;
  margin-left: 100px;
  margin-right: 30px;
  margin-top: 40px;
}

.avatar-hover img {
  width: 80%;
  height: 80%;
}
.avatar-hover {
  display: none;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, .5);
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  border-radius: 50%;
}
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}
.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}
.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}

</style>
