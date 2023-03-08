import {createRouter, createWebHistory} from "vue-router";
import WelcomePage from "../view/WelcomePage.vue";
const routes = [
    //register and login
    {
        path: '/',
        component: WelcomePage,
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;