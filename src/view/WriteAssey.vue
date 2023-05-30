<template>
  <el-container>
    <el-main>
      <div class="main-page">
        <div class="main-content">
          <!-- v-me-editor 组件-->
          <el-input v-model="title" placeholder="请输入标题" />
          <v-md-editor class="editor" v-model="text" height="800px" @keyup="handleKeyup"></v-md-editor>
        </div>
      </div>

      <div class="chatting">
        <!-- chat robot 组件-->
        <chat-box>
          <div class="chat-history">
            <div v-for="message in messages" :key="message.id" class="message-item">
              <div :class="message.type === 'bot' ? 'bot-message' : 'user-message'">
                {{ message.msg }}
              </div>
            </div>
          </div>
          <div class="chat-input">
            <el-input
                v-model=inputText
                placeholder="请输入聊天内容"
                type="text"
                @keydown.enter="onSubmit"
            ></el-input>
          </div>
        </chat-box>
      </div>

    </el-main>
    <el-footer class="main-footer" height="60px">
      <div class="upload-panel">
        <div class="center-container">
          <el-button class="upload-btn" type="primary" @click="uploadData">上传</el-button>
        </div>
      </div>
    </el-footer>
  </el-container>
</template>

<script>
import axios from 'axios';
import {ref, reactive} from 'vue';
import router from "@/router";
import {getCookie} from "@/js/global";
import Swal from "sweetalert2";

export default {

  setup() {
    let text = ref('')
    let title = ref('')
    const cnt = ref(1)
    let showDialog = ref(false)
    let messages = reactive([
      {
        id: 1,
        msg: '欢迎来到聊天室~',
        type: 'bot'
      },
    ])
    let inputText = ref('')
    let response = ref('')
    function generateRandomString(length) {
      var result           = '';
      var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      var charactersLength = characters.length;
      for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      return result;
    }
    function uploadData() {
      console.log('上传数据:', text);
      let randomId = generateRandomString(10) // 生成一个长度
      axios({
        method: 'POST',
        url: 'http://10.26.5.9:8010/article/save',
        params: {
          id:randomId,
          title: title.value,
          content: text.value,
          user_id: getCookie('id'),
          is_anonymous: false
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
          console.log("success!!")
          Swal.fire({
            icon: 'success',
            title: '成功！',
            text: '您已成功上传文章!',
          })
        }
      })
    }

    function handleKeyup(event) {
      if (event.keyCode === 32) {
        this.showDialog = true;
      } else {
        this.showDialog = false;
      }
    }

    function onSubmit() {
      if (inputText.value === '') {
        console.log("请输入内容！")
      } else {
        cnt.value += 1
        messages.push({
          id: cnt.value,
          msg: inputText.value,
          type: 'user'
        })
        // TODO: 与聊天机器人交互
        let url = `http://api.qingyunke.com/api.php?key=free&appid=0&msg=${inputText.value}`
        inputText.value = ''
        axios.get(url)
            .then((resp) => {
              console.log(resp)
              if (resp.status === 200) {
                response.value = resp.data.content
                cnt.value += 1
                console.log(response.value)
                messages.push({
                  id: cnt.value,
                  msg: response.value,
                  type: 'bot'
                })

              } else {
                console.log('出错啦~')
                cnt.value += 1
                console.log(response.value)
                messages.push({
                  id: cnt.value,
                  msg: '出错啦~',
                  type: 'bot'
                })
              }
            })
        // axios.post('https://api.openai.com/v1/engine/davinci/completions', {
        //   prompt: inputText.value,
        //   max_tokens: 50,
        //   temperature: 0.5,
        //   n: 1
        // }, {
        //   headers: {
        //     'Content-Type': 'application/json',
        //     'Authorization': 'Bearer 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'
        //   }
        // })
        //     .then(resp => {
        //       console.log(resp)
        //             if (resp.status === 200) {
        //               response.value = resp.data.content
        //               cnt.value += 1
        //               console.log(response.value)
        //               messages.push({
        //                 id: cnt.value,
        //                 msg: response.value,
        //                 type: 'bot'
        //               })
        //
        //             } else {
        //               console.log('出错啦~')
        //               cnt.value += 1
        //               console.log(response.value)
        //               messages.push({
        //                 id: cnt.value,
        //                 msg: '出错啦~',
        //                 type: 'bot'
        //               })
        //             }
        //           })
      }
    }
    function toHomePage(){
      router.push('/');
    }
    function toSelfPage(){
      //   TODO:检查是否登录，如未登录，需要跳转登录界面
      router.push('/selfpage');
    }
    return {
      text,
      title,
      showDialog,
      messages,
      inputText,
      uploadData,
      onSubmit,
      handleKeyup,
      toHomePage,
      toSelfPage,
    }
  }
}

</script>
<style lang="less" scoped>
#root {
  display: block;
}

.el-header {
  height: 80px;
  width: 100%;
  position: fixed;
  line-height: 80px;
  background-color: rgb(255, 255, 255);
  box-shadow: 0 1px 3px hsla(0, 0%, 7%, .1);
  overflow: hidden;
  z-index: 99;
}

.el-header #logo {
  height: 50px;
  line-height: 80px;
  float: left;
}

//
//.form {
//  width: 180px;
//}
//.form, .el-checkbox, .el-button{
//  margin: 0 auto;
//}
.nav-menu {
  height: 80px;
  width: 60px;
  text-align: center;
  float: left;
  margin: 0 10px 0 10px;
  //background-color: rgba(238, 159, 6, 0.4);
}

.nav-menu:hover {
  border-bottom: 5px solid #e76e0d;
  cursor: pointer;
}

.search {
  float: left;
  width: 500px;
  margin-left: 30px;
}

.nav_right {
  height: 100%;
  float: right;
  margin-right: 30px;
}

.el-main {
  display: block;
  width: 100%;
  height: 100vh;
  background-color: rgb(246, 246, 246);
}

.el-main::-webkit-scrollbar {
  display: none;
}

.main-page {
  width: 90%;
  margin: 0 auto;
}

.main-content, .vice-content {
  display: inline-block;
  float: left;
}

.main-content {
  width: 65%;
  background-color: rgb(255, 255, 255);

}

.vice-content {
  width: 25%;
  margin-left: 20px;
  background-color: rgb(255, 255, 255);
}

.vice-content-title {
  height: 50px;
  line-height: 50px;
  font-size: 20px;

}

.vice-content-nav {
  width: 100%;
  text-align: center;
}

.vice-content-nav-item {
  float: left;
  width: 50%;
}

.quick-QA {
  width: 90%;
  margin: 0 auto;
  text-align: center;
}

.editor {
  display: flex;
  justify-content: center;
}

.upload-panel {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 60px;
  background-color: rgba(0, 0, 0, 0.5);
}

.center-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.upload-btn {
  width: 120px;
  height: 40px;
}

.main-content {
  display: flex;
  flex-direction: row;

  justify-content: space-between;
  align-items: stretch;
}

.editor {
  flex: 1;
}

.space {
  height: 40px;
  width: 10%;
}

.chatting {
  width: 25%;
  margin-left: 20px;
  background-color: rgb(255, 255, 255);
}

.main-content, .chatting {
  display: inline-block;
  float: left;

}

//聊天相关风格
.chat-box {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.chat-history {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  margin-bottom: 20px;
}

.message-item {
  margin-bottom: 10px;
}

.bot-message {
  padding: 10px;
  background-color: #f5f5f5;
  border-radius: 10px;
  max-width: 80%;
  align-self: flex-start;
}

.user-message {
  padding: 10px;
  background-color: #2196f3;
  color: white;
  border-radius: 10px;
  max-width: 80%;
  align-self: flex-end;
}

.chat-input {
  padding: 0 20px 20px 20px;
}

</style>