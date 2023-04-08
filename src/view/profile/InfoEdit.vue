<template>
  <div class="header">
    <el-upload
        class="avatar-uploader"
        action="http://10.26.5.9:8081/cloud_storage/file/uploading"
        :show-file-list="true"
        accept="image/png, image/jpg, image/jpeg, image/gif"
        :on-success="handleAvatarSuccess"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar" @change="handleAvatarSuccess"/>

      <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
      <!--    <input type="file" @change="handleAvatarSuccess">-->
    </el-upload>
  </div>

  <div class="info">
    <div class="changeInfo">
      <el-button type="success" >修改个人资料</el-button>
    </div>
    <el-form
        :label-position="labelPosition"
        label-width="100px"
        :model="formLabelAlign"
        style="max-width: 460px"
    >
      <el-form-item label="昵称">
        <el-input v-model="formLabelAlign.name" />
      </el-form-item>
      <el-form-item label="性别">
        <el-input v-model="formLabelAlign.gender" />
      </el-form-item>
      <el-form-item label="个人简介">
        <el-input v-model="formLabelAlign.introduction" />
      </el-form-item>
    </el-form>
    <div class="changeInfo">
      <el-button type="primary" @click="onSubmit">保存修改</el-button>
      <el-button @click="backToQ">取消</el-button>
    </div>
  </div>
</template>

<script>
import {ref} from 'vue';
import {reactive} from 'vue'

export default {
  name:"infoEdit.vue",
  data(){
    return{
      imageUrl:ref(''),
      labelPosition: ref('right')
    }
  },
  methods:{
    handleAvatarSuccess(resp){
      console.log(resp)
      this.imageUrl = resp.data.url
    },
    onSubmit() {

    },
    backToQ() {

    }
  },
  setup() {
    const formLabelAlign = reactive({
      name: 'Yuki',
      gender: '女',
      introduction: '计算机',
    })
    return{
      formLabelAlign
    }
  }
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
  margin-top: 100px;
}

.info{
  height: 400px;
  margin-left: 100px;
  margin-right: 30px;
  margin-top: 10px;
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
