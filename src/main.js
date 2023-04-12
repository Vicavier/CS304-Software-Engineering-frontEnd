import { createApp } from 'vue'
import App from './App.vue'
import ElementUI from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router'
import './iconfont/style.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Vuex from 'vuex'
import VMdEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import '@kangc/v-md-editor/lib/theme/style/github.css';

import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)
app.use(ElementUI).use(router).use(VueAxios, axios, Vuex).mount('#app')
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}



// highlightjs
import hljs from 'highlight.js';

VMdEditor.use(githubTheme, {
    Hljs: hljs,
});

app.use(VMdEditor);
