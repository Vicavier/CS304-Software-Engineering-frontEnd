import { createApp } from 'vue'
import App from './App.vue'
import ElementUI from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router'
import './iconfont/style.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VMdEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import '@kangc/v-md-editor/lib/theme/style/github.css';
import Vuex from 'vuex'
import * as global from './js/global'

const app = createApp(App)
app.use(ElementUI).use(router).use(VueAxios, axios, Vuex).mount('#app')
app.config.globalProperties.$global = global

import hljs from 'highlight.js';

VMdEditor.use(githubTheme, {
    Hljs: hljs,
});

app.use(VMdEditor);
