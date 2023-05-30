<template>
  <el-container>
    <el-header>
      <div id="logo">
        <a>
          <img src="../../image/logo.png">
        </a>
      </div>
      <div id="link-button">
        <div class="nav-menu"><i class="icon-home"></i> 首页</div>
        <div class="nav-menu"><i class="icon-user"></i> 我的</div>
        <div class="nav-menu"><i class="icon-folder"></i> 收藏夹</div>
        <div class="nav-menu"><i class="icon-heart"></i> 关注</div>
      </div>
    </el-header>

    <el-main>
      <div class="main-page">
        <div class="article-container">
          <div class="article-header">
            <h1>{{ this.title }}</h1>
            <!--            <h1>title</h1>-->
          </div>
          <div class="article-author">作者：{{ this.author }}</div>
          <div>
            <!--            <v-md-preview :text="content"></v-md-preview>-->
            <v-md-editor :model-value="content" mode="preview"></v-md-editor>
          </div>

          <div class="buttons">
            <div class="likes">
              <el-button type="primary" @click="setLike">赞同 {{ this.likes }}</el-button>
            </div>
            <div class="collect">
              <el-button type="primary" @click="collect">收藏</el-button>
              <!--        需要加一个方法将本文章收藏到当前用户的收藏夹里-->
            </div>
          </div>


          <div class="comments-section">
            <h3>评论</h3>
            <input class="full-width" v-model="newComment" type="text" placeholder="写下你的评论...">
            <el-button @click="addComment">提交评论</el-button>

            <div v-for="comment in commentsList" :key="comment.id" class="comment">
              <div class="comment-name">
                <img src="">

                <h3>
                  {{ comment.name }}
                </h3>
              </div>
              <div class="comment-content">
                <h5>
                  {{ comment.content }}
                </h5>

              </div>

            </div>
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
import {reactive, ref, onMounted} from "vue";
import {getCookie} from "@/js/global";

export default {
  props: ['id', 'title', 'author'],

  setup(props) {
    console.log(props.id)

    let title = ref("")
    let author = ref("")
    let content = ref('')
    let likes = ref(0)
    let comments = ref(0)
    let commentsList = reactive([])
    let commentAuthor = ref('')
    let commentContent = ref('')
    let showingComments = ref(false)

    function likeArticle() {
      this.likes++
    }

    function showComments() {
      this.showingComments = !this.showingComments
      if (this.showingComments) {
        // 获取并显示评论
        this.getComments()
      }
    }

    onMounted(() => {

      axios({
        method: "GET",
        url: `http://localhost:8010/article/getById?id=` + props.id,
        transformRequest: [function (data) {
          let str = '';
          for (let key in data) {
            str += encodeURIComponent(key) + '=' + encodeURIComponent(data[key]) + '&';
          }
          return str;
        }]
      }).then(resp => {
        if (resp.status === 200) {
          console.log(resp.status)
          console.log(resp.data.data)
          content.value = resp.data.data.article.content
          title.value = resp.data.data.article.title
          likes.value = resp.data.data.article.likes
          let user_id = ref("")
          user_id.value = resp.data.data.article.user_id
          getComments()
          axios({
            method: "GET",
            url: `http://localhost:8010/userCenter/getUserData?userId=` + user_id.value,
            transformRequest: [function (data) {
              let str = '';
              for (let key in data) {
                str += encodeURIComponent(key) + '=' + encodeURIComponent(data[key]) + '&';
              }
              return str;
            }]
          }).then(resp => {
            if (resp.status === 200) {
              author.value = resp.data.data.data.username
              console.log("文章作者：" + author.value)
            }
          })

          console.log(content)
        }
      })
    })

    function getComments() {
      axios({
        method: "POST",
        url: `http://localhost:8010/article/getArticleComments?id=` + props.id,
        transformRequest: [function (data) {
          let str = '';
          for (let key in data) {
            str += encodeURIComponent(key) + '=' + encodeURIComponent(data[key]) + '&';
          }
          return str;
        }]
      }).then(resp => {
        if (resp.status === 200) {
          console.log("现在获取评论")
          console.log(resp.data.data.articleComments)
          //TODO:这里我忘记怎么解析评论了
          for (let i = 0; i < resp.data.data.articleComments.length; i++) {
            console.log("评论" + i)
            commentsList.push(resp.data.data.articleComments[i])
            console.log(commentsList[i].user_id)
            let name = ref("")

            axios({
              method: "GET",
              url: `http://localhost:8010/userCenter/getUserData?userId=` + commentsList[i].user_id,
              transformRequest: [function (data) {
                let str = '';
                for (let key in data) {
                  str += encodeURIComponent(key) + '=' + encodeURIComponent(data[key]) + '&';
                }
                return str;
              }]
            }).then(resp => {
              if (resp.status === 200) {
                name.value = resp.data.data.data.username
                console.log("获得" + commentsList[i].user_id + "的用户名 " + name.value)
                console.log(name.value)
                commentsList[i].name = name.value
              }
            })

            console.log("提取完评论"+i)

            // console.log(name.value)
            // console.log(commentsList[i].name)
          }

        }
      })

      // const numComments = Math.floor(Math.random() * 10) + 1
      // for (let i = 0; i < numComments; i++) {
      //   this.commentsList.push({
      //     author: `评论者${i + 1}`,
      //     content: `这是第${i + 1}条评论`
      //   })
      // }
      // this.comments = numComments
    }

    function postComment() {
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

    function setLike() {
      if (getCookie('username')) {
        axios({
          method: "POST",
          url: `http://localhost:8010/article/likeArticle?articleId=` + props.id,
          transformRequest: [function (data) {
            let str = '';
            for (let key in data) {
              str += encodeURIComponent(key) + '=' + encodeURIComponent(data[key]) + '&';
            }
            return str;
          }]
        }).then(resp => {
          if (resp.status === 200) {
            console.log("点赞成功")
          } else {
            alert("请先登录")
          }
        })
      }
    }

    //TODO: 这里需要将用户当前的评论上传到后端
    function addComment() {

    }

    // 这个方法将收藏当前文章给当前登录用户
    function collect() {
      if (getCookie('username')) {
        axios({
          method: "POST",
          url: `http://localhost:8010/article/likeArticle?articleId=` + props.id,
          transformRequest: [function (data) {
            let str = '';
            for (let key in data) {
              str += encodeURIComponent(key) + '=' + encodeURIComponent(data[key]) + '&';
            }
            return str;
          }]
        }).then(resp => {
          if (resp.status === 200) {
            console.log("点赞成功")
          } else {
            alert("请先登录")
          }
        })
      }
    }

    //
    function fromIdToName(id) {
      let name = ''
      axios({
        method: "GET",
        url: `http://localhost:8010/userCenter/getUserData?userId=` + id,
        transformRequest: [function (data) {
          let str = '';
          for (let key in data) {
            str += encodeURIComponent(key) + '=' + encodeURIComponent(data[key]) + '&';
          }
          return str;
        }]
      }).then(resp => {
        if (resp.status === 200) {
          console.log("获得" + id + "的用户名")
          author.value = resp.data.data.data.username
          console.log(author.value)
          name = author.value
        }
      })
      return name
    }

    return {
      content,
      likes,
      comments,
      commentsList,
      commentAuthor,
      commentContent,
      showingComments,
      likeArticle,
      showComments,
      getComments,
      postComment,
      // eslint-disable-next-line vue/no-dupe-keys
      title,
      // eslint-disable-next-line vue/no-dupe-keys
      author,
      setLike,
      addComment,
      collect,
      fromIdToName,
    }
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
  /*background-color: rgba(238, 159, 6, 0.4);*/
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

/*按钮的修饰*/
.buttons {
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
}

/*评论区的修饰*/
.comments-section {
  margin-top: 30px;
}

.comment {
  margin-bottom: 10px;
}

input.full-width {
  width: 100%;
  box-sizing: border-box;
}


</style>