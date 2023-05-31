<template>
  <el-container>
    <el-header>问题</el-header>
    <el-main>
      <el-input v-model="input" placeholder="请输入回答"></el-input>
      <el-button type="primary" @click="back">上传回答</el-button>
    </el-main>
  </el-container>

</template>

<script>
import Swal from "sweetalert2";
import router from "@/router";
export default {
  name: "ansComponent",
  props: ['title'],
  data() {
    return {
      input: ''
    }
  },
  setup(){
    function back(){
      Swal.fire({
        icon: 'success',
        title: '成功',
        text: '感谢您的回答！',
      })
      router.push('/')
    }
    return{
      back
    }
  }
}
</script>

<style scoped>

</style>