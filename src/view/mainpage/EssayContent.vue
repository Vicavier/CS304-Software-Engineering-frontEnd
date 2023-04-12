
<template>
  <el-container>
    <el-header>
      <div id="logo">
        <a>
          <img src="../../image/logo.png">
        </a>
      </div>
      <div id="link-button">
        <div class="nav-menu" @click="toHomePage"><i class="icon-home"></i> 首页</div>
        <div class="nav-menu" @click="toSelfPage"><i class="icon-user"></i> 我的</div>
        <div class="nav-menu"><i class="icon-folder"></i> 收藏夹</div>
        <div class="nav-menu"><i class="icon-heart"></i> 关注</div>
      </div>
    </el-header>

    <el-main>
      <div class="main-page">
        <div class="article-container">
          <div class="article-header">
            <h1>{{ article.title }}</h1>
          </div>
          <div class="article-author">{{ article.author }}</div>
          <div>
<!--            <v-md-preview :text="content"></v-md-preview>-->
            <v-md-editor :model-value="this.article.content" mode="preview"></v-md-editor>
          </div>

        </div>
      </div>
    </el-main>
  </el-container>
</template>

<script>
// main.js

import '@kangc/v-md-editor/lib/style/preview.css';
// 引入你所使用的主题 此处以 github 主题为例

import '@kangc/v-md-editor/lib/theme/style/github.css';
import axios from "axios";


export default {
  props: ['id', 'title','author'],
  data() {
    return {
      article: {
        title: this.title,
        author: this.author,
        content: ''
      },
      likes: 0,
      comments: 0,
      commentsList: [],
      commentAuthor: '',
      commentContent: '',
      showingComments: false
    }
  },
  methods: {
    likeArticle() {
      this.likes++
    },
    showComments() {
      this.showingComments = !this.showingComments
      if (this.showingComments) {
        // 获取并显示评论
        this.getComments()
      }
    },
    getContent(){
      axios({
        method:"POST",
        url:'http://10.26.5.9:8010/article/getById',
        // param:{id:this.article.id},
        param:{id:'8334514235704446976'},
        transformRequest: [function (data) {
          let str = '';
          for (let key in data) {
            str += encodeURIComponent(key) + '=' + encodeURIComponent(data[key]) + '&';
          }
          return str;
        }]
      }).then(resp => {
        if (resp.status === 200){
          this.article.content = resp.data.content
        }
      })
    }
,
    getComments() {
      // 使用Axios从后端API获取评论列表，并更新commentsList属性
      // 例如：
      // axios.get('/api/comments')
      //   .then(response => {
      //     this.commentsList = response.data
      //     this.comments = this.commentsList.length
      //   })
      //   .catch(error => {
      //     console.error(error)
      //   })
      // 在这里，我们只是生成一些随机评论
      const numComments = Math.floor(Math.random() * 10) + 1
      for (let i = 0; i < numComments; i++) {
        this.commentsList.push({
          author: `评论者${i + 1}`,
          content: `这是第${i + 1}条评论`
        })
      }
      this.comments = numComments
    },
    postComment() {
      // 使用Axios将用户提交的评论发送到后端API，以保存到数据库中
      // 例如：
      // axios.post('/api/comments', {
      //     author: this.commentAuthor,
      //     content: this.commentContent
      //   })
      //   .then(response => {
      //     console.log(response.data)
      //     this.commentsList.push({
      //       author: this.commentAuthor,
      //       content: this.commentContent
      //     })
      //     this.commentAuthor = ''
      //     this.commentContent = ''
      //     this.comments++
      //   })
      //   .catch(error => {
      //     console.error(error)
      //   })
      // 在这里，我们只是将评论添加到commentsList属性中
      this.commentsList.push({
        author: this.commentAuthor,
        content: this.commentContent
      })
      this.commentAuthor = ''
      this.commentContent = ''
      this.comments++
    }
  },
  mounted() {
    this.getContent()
  }
}
</script>
<style>
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
  margin-top: 80px;
}

.el-main::-webkit-scrollbar {
  display: none;
}

.main-page {
  width: 80%;
  margin: 0 auto;
}

.article-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.article-header h2 {
  font-size: 24px;
  font-weight: bold;
}

.article-header button {
  border: none;
  background-color: #fff;
  color: #666;
  font-size: 16px;
  cursor: pointer;
}

.article-header button:hover {
  color: #e76e0d;
}

.article-content {
  font-size: 18px;
  line-height: 1.8;
  margin-bottom: 40px;
}

.article-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.article-footer button {
  border: none;
  background-color: #fff;
  color: #666;
  font-size: 16px;
  cursor: pointer;
}

.article-footer button:hover {
  color: #e76e0d;
}

.comments-section {
  margin-top: 40px;
}

.comments-section h3 {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
}

.comments-section form {
  margin-top: 20px;
}

.comments-section form input[type="text"],
.comments-section form textarea {
  width: 100%;
  padding: 10px;
  border: none;
  border-bottom: 2px solid #e76e0d;
  margin-bottom: 10px;
  font-size: 16px;
}

.comments-section form textarea {
  height: 80px;
}

.comments-section form button[type="submit"] {
  border: none;
  background-color: #e76e0d;
  color: #fff;
  font-size: 16px;
  padding: 10px 20px;
  cursor: pointer;
}

.comments-section form button[type="submit"]:hover {
  background-color: #d15c0f;
}

.article-content {
  font-size: 18px;
  line-height: 1.8;
  margin-bottom: 40px;
  border: 1px solid #ddd;
  padding: 20px;
}
.article-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.article-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.article-header h1 {
  font-size: 32px;
  font-weight: bold;
  margin: 0;
}

.article-author {
  font-size: 16px;
  color: #666;
}

.article-content {
  font-size: 18px;
  line-height: 1.8;
}


</style>