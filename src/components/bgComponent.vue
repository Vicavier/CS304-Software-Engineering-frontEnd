<template>
  <div class="upload-area">
    <input type="file" @change="handleFileUpload">
    <div :style="{ backgroundImage: `url(${imageUrl})`, backgroundColor:'#A9A9A9' }">
      <el-button type="info" plain>
        <el-icon><Camera /></el-icon>
        上传背景图片
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "bgComponent.vue",
  data() {
    return {
      imageUrl: 'https://opencurve-picture.oss-cn-shenzhen.aliyuncs.com/e298c6c962a736d65a2b3d810d854ba41268908276.png'
    };
  },
  methods: {
    handleFileUpload(event) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = event => {
        this.imageUrl = event.target.result;
      };
      reader.readAsDataURL(file);
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