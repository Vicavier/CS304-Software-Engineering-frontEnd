import { createApp } from 'vue'
import App from './App.vue'
import ElementUI from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router'
import './iconfont/style.css'

createApp(App).use(ElementUI).use(router).mount('#app')
