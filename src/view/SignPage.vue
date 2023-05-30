<template>
  <div v-bind:class="{'loginBody':login, 'loginBody move':!login}">
    <div class="veen">
      <div class="login-btn splits">
        <p>Already an user?</p>
        <el-button class="active" @click="login_click">Login</el-button>
      </div>
      <div class="rgstr-btn splits">
        <p>Don't have an account?</p>
        <el-button @click="register_click">Register</el-button>
      </div>
      <div v-bind:class="{'wrapper':login, 'wrapper move':!login}">
        <form id="login" tabindex="500">
          <h3>Login</h3>
          <div class="mail">
            <input v-model="LoginForm.username">
            <label>Username</label>
          </div>
          <div class="passwd">
            <input type="password" name="" v-model="LoginForm.password">
            <label>Password</label>
          </div>
          <div class="submit">
            <el-button class="dark" @click="userLogin()">Login</el-button>
          </div>
        </form>
        <form id="register" tabindex="502">
          <h3>Register</h3>
          <div class="name">
            <input type="text" name="" v-model="RegisterForm.nick_name">
            <label>Nick Name</label>
          </div>
          <div class="mail">
            <input type="mail" name="" v-model="RegisterForm.email">
            <label>Mail</label>
          </div>
          <div class="uid">
            <input type="text" name="" v-model="RegisterForm.username">
            <label>User Name</label>
          </div>
          <div class="passwd">
            <input type="password" name="" v-model="RegisterForm.password">
            <label>Password</label>
          </div>
          <div class="submit">
            <el-button class="dark" @click="userRegister()">Register</el-button>
          </div>
        </form>
      </div>
    </div>
  </div>
  <div class="footer" @click="toHomePage">访客模式</div>
</template>

<script>
// import {ref} from "vue";
import router from '../router'
import Swal from "sweetalert2";

export default {
  data() {
    return {
      login: true,
      checked: false, //表示已经登陆的状态
      LoginForm: {
        username: '',
        password: ''
      },
      RegisterForm: {
        username: '',
        password: '',
        nick_name: '',
        email: ''
      }
    }
  },
  methods: {
    //methods
    register_click() {
      this.login = false;
      // console.log(this.login);
    },
    login_click() {
      this.login = true;
      // console.log(this.login);
    },
    toHomePage() {
      router.push('/');
    },
    userLogin() {
      /*------账号密码验证-------*/
      if (this.LoginForm.username === '' || this.LoginForm.password === '') {
        Swal.fire({
          icon: 'error',
          title: '失败！',
          text: '您的账号或密码不能为空',
        })
        return;
      }
      /*------发送http登录请求-------*/
      this.axios({
        method: 'POST',
        // url: 'http://10.26.144.58:8010/account/login',
        url: 'http://10.26.5.9:8010/account/login',
        // url: 'http://localhost:8010/account/login',
        params: {
          username: this.LoginForm.username,
          password: this.LoginForm.password
        }
      }).then(res => {
        if (res.data.state & (res.data.message === null)) {
          this.checked = true
          /*------账号密码存储(cookie)-----*/
          // this.setCookie(res.data.data.data, 7)
          const userInfo = res.data.data.user;
          console.log(userInfo)
          this.$global.setCookie('username', userInfo.username,1)
          this.$global.setCookie('password', userInfo.password, 1)
          this.$global.setCookie('nickname',userInfo.nick_name,1)
          this.$global.setCookie('email', userInfo.email,1)
          this.$global.setCookie('avatar', userInfo.avatar,1)
          this.$global.setCookie('background', userInfo.background,1)
          this.$global.setCookie('checked', this.checked,1)
          this.$global.setCookie('id',  userInfo.id,1)
          Swal.fire({
            icon: 'success',
            title: '成功！',
            text: '您已经成功登录!',
          })
          router.push('/');
        } else {
          Swal.fire({
            icon: 'error',
            title: '失败！',
            text: '沒有這個用戶或者賬號密碼有誤',
          })
        }
      })
    },
    userRegister() {
      // console.log(this.RegisterForm)
      this.axios({
        method: 'POST',
        // url: 'http://10.26.144.58:8010/account/register',
        url: 'http://10.26.5.9:8010/account/register',
        // url: 'http://localhost:8010/account/register',
        params: {
          username: this.RegisterForm.username,
          password: this.RegisterForm.password,
          nick_name: this.RegisterForm.nick_name,
          email: this.RegisterForm.email
        }
      }).then((response) => {
        console.log(response.data.state);
        Swal.fire({
          icon: 'success',
          title: '成功！',
          text: '您已经成功注册账号!',
        })
        if (!response.data.state) {
          Swal.fire({
            icon: 'error',
            title: '失败！',
            text: '您重复注册',
          });
        } else {
          this.login = true;
        }
      }).catch(function (error) {

        console.log(error);

        Swal.fire({
          icon: 'error',
          title: '失败！',
          text: '网络问题',
        })

      });
    },
  },
}

</script>

<style scoped>
.loginBody {
  background: #40445B;
  transition: all .5s;
  padding: 1px;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.loginBody.move {
  background: #8D99DE;
}

.veen {
  width: 70%;
  margin: 100px auto;
  background: rgba(255, 255, 255, .5);
  min-height: 400px;
  display: table;
  position: relative;
  box-shadow: 0 0 4px rgba(0, 0, 0, .14), 0 4px 8px rgba(0, 0, 0, .28);
}

.veen > div {
  display: table-cell;
  vertical-align: middle;
  text-align: center;
  color: #fff;
}

.veen button {
  background: transparent;
/*background-image: linear-gradient(90 deg, #e0b722, #40445B);*/
  display: inline-block;
  padding: 10px 30px;
  border: 3px solid #fff;
  border-radius: 50px;
  background-clip: padding-box;
  position: relative;
  color: #FFF;
  height: 40px;
 /*box-shadow: 0 0 4 px rgba(0, 0, 0, .14), 0 4 px 8 px rgba(0, 0, 0, .28);*/
  transition: all .25s;
}

.veen button.dark {
  border-color: #40445B;
  background: #40445B;
}

/* 		.veen .move button.dark{
			border-color: #e0b722;
			background: #e0b722;
		} */
.veen .splits p {
  font-size: 18px;
}

.veen button:active {
  box-shadow: none;
}

.veen button:focus {
  outline: none;
}

.veen > .wrapper {
  position: absolute;
  width: 40%;
  height: 120%;
  top: -10%;
  left: 5%;
  background: #fff;
  box-shadow: 0 0 4px rgba(0, 0, 0, .14), 0 4px 8px rgba(0, 0, 0, .28);
  transition: all .5s;
  color: #303030;
  overflow: hidden;
}

.veen .wrapper > form {
  padding: 15px 30px 30px;
  width: 100%;
  transition: all .5s;
  background: #fff;
  width: 100%;
}

.veen .wrapper > form:focus {
  outline: none;
}

.veen .wrapper #login {
  padding-top: 20%;
  visibility: visible;
}

.veen .wrapper #register {
  transform: translateY(-80%) translateX(100%);
  visibility: hidden;
}

.veen .wrapper.move #register {
  transform: translateY(-80%) translateX(0%);
  visibility: visible;
}

.veen .wrapper.move #login {
  transform: translateX(-100%);
  visibility: hidden;
}

.veen .wrapper > form > div {
  position: relative;
  margin-bottom: 15px;
}

.veen .wrapper label {
  position: absolute;
  top: -7px;
  font-size: 12px;
  white-space: nowrap;
  background: #fff;
  text-align: left;
  left: 15px;
  padding: 0 5px;
  color: #999;
  pointer-events: none;
}

.veen .wrapper h3 {
  margin-bottom: 25px;
}

.veen .wrapper input {
  height: 40px;
  padding: 5px 15px;
  width: 100%;
  border: solid 1px #999;
}

.veen .wrapper input {
  height: 40px;
  padding: 5px 15px;
  width: 100%;
  border: solid 1px #999;
}

.veen .wrapper input:focus {
  outline: none;
  border-color: #40445B;
}

.veen > .wrapper.move {
  left: 45%;
}

.veen > .wrapper.move input:focus {
  border-color: #8D99DE;
}

@media (max-width: 767px) {
  .veen {
    padding: 5px;
    margin: 0;
    width: 100%;
    display: block;
  }

  .veen > .wrapper {
    position: relative;
    height: auto;
    top: 0;
    left: 0;
    width: 100%;
  }

  .veen > div {
    display: inline-block;
  }

  .splits {
    width: 50%;
    background: #fff;
    float: left;
  }

  .splits button {
    width: 100%;
    border-radius: 0;
    background: #505050;
    border: 0;
    opacity: .7;
  }

  .splits button.active {
    opacity: 1;
  }

  .splits button.active {
    opacity: 1;
    background: #40445B;
  }

  .splits.rgstr-btn button.active {
    background: #8D99DE;
  }

  .splits p {
    display: none;
  }

  .veen > .wrapper.move {
    left: 0%;
  }
}

input:-webkit-autofill, textarea:-webkit-autofill, select:-webkit-autofill {
  box-shadow: inset 0 0 0 50px #fff
}

site-link {
  padding: 5px 15px;
  position: fixed;
  z-index: 99999;
  background: #fff;
  box-shadow: 0 0 4px rgba(0, 0, 0, .14), 0 4px 8px rgba(0, 0, 0, .28);
  right: 30px;
  bottom: 30px;
  border-radius: 10px;
}

.site-link img {
  width: 30px;
  height: 30px;
}

.footer {
  width: 100%;
  color: wheat;
  text-decoration: underline;
  font-size: 150%;
  text-align: center;
  position: absolute;
  cursor: pointer;
  bottom: 60px;
}
</style>