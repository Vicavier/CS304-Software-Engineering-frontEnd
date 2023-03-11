import { createApp } from 'vue'
import App from './App.vue'
import ElementUI from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router'
import './iconfont/style.css'
import axios from 'axios'
import VueAxios from 'vue-axios'

const app = createApp(App)
app.use(ElementUI).use(router).use(VueAxios, axios).mount('#app')

