<template>
  <el-form :model="uploadInfo">
    <el-form-item label="视频标题">
      <el-input v-model="uploadInfo.title" placeholder="起一个响亮的标题"/>
    </el-form-item>
    <el-form-item label="视频简介">
      <el-input v-model="uploadInfo.info" placeholder="写一段牛逼的简介"/>
    </el-form-item>
    <el-form-item label="视频类型">
      <el-select v-model="uploadInfo.type" placeholder="选择视频类型">
        <el-option label="生活" value="life" />
        <el-option label="游戏" value="games" />
        <el-option label="学习" value="learning" />
        <el-option label="活动/社团" value="activity" />
      </el-select>
    </el-form-item>
    <el-upload
        v-model:file-list="imageFile"
        class="upload-demo"
        action="http://10.26.5.9:8081/cloud_storage/file/uploading"
        :on-success="handleSuccess"

    >
      <el-button type="primary" id="bnt">Click to upload</el-button>
      <template #tip>
        <div class="el-upload__tip">
          jpg/png files with a size less than 500kb
        </div>
      </template>
    </el-upload>
    <el-upload
        class="upload-demo"
        drag
        action="http://10.26.5.9:8081/cloud_storage/file/uploading"
        multiple
        :on-success="handleOnSuccess"
    >
      <el-icon class="el-icon--upload">
        <upload-filled/>
      </el-icon>
      <div class="el-upload__text">
        Drop file here or <em>click to upload</em>
      </div>
      <template #tip>
        <div class="el-upload__tip">
          jpg/png files with a size less than 1024kb
        </div>
      </template>
    </el-upload>
    <el-button @click="submit">点击上传</el-button>
  </el-form>
</template>

<script>
// import { UploadFilled } from '@element-plus/icons-vue'
import {reactive, ref} from "vue";
import {getCookie} from "@/js/global";
import router from "@/router";
import Swal from "sweetalert2";
import axios from "axios";
// import VueCropper from 'vue-cropper'
export default {

  setup() {
    let imageUrl = ref()
    let imageFile = reactive([])
    const uploadInfo = reactive(
      {
        title: '',
        url: '',
        info:'',
        type:'',
      }
    )

    function handleOnSuccess(resp) {
      uploadInfo.url = resp.data.url
    }
    function handleSuccess(resp){
      imageUrl.value = resp.data.url
    }
    function submit(){
      if (uploadInfo.title !== '' &&
          uploadInfo.url !== '' &&
          uploadInfo.type !== ''){
        if (getCookie('id')){
          console.log(uploadInfo.type)
          axios({
            method: 'POST',
            url: 'http://10.26.5.9:8020/video/upload',
            params:{
              file:uploadInfo.url,
              user_id:getCookie('id'),
              title:uploadInfo.title,
              info:uploadInfo.info,
              cover:imageUrl.value,
              type:uploadInfo.type,
            },
            transformRequest: [function (data) {
              let str = '';
              for (let key in data) {
                str += encodeURIComponent(key) + '=' + encodeURIComponent(data[key]) + '&';
              }
              return str;
            }]
          }).then(resp => {
            if (resp.status === 200){
              uploadInfo.title = ''
              uploadInfo.url = ''
              uploadInfo.type = ''
              imageUrl.value = ''
              imageFile = []
              setTimeout(() => {
                location.reload();
              }, 1000);
              Swal.fire({
                icon: 'success',
                title: '视频上传',
                text: '上传成功！',
              })
            }
          })
        } else {
          router.push('/sign')
        }
      } else {
        setTimeout(() => {
          location.reload();
        }, 1000);
        Swal.fire({
          icon: 'error',
          title: '未登录',
          text: '请先登录',
        })
        router.push('/sign');
      }
    }
    return {
      handleOnSuccess,
      uploadInfo,
      imageUrl,
      imageFile,
      submit,
      handleSuccess
    }
  }
}
</script>
<style scoped>

input.el-upload__input{
  display:none!important;
}

</style>