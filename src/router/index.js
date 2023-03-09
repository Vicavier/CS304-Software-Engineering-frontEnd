import {createRouter, createWebHistory} from "vue-router";
import WelcomePage from "../view/WelcomePage.vue";
import HomePage from "../view/HomePage.vue"
const routes = [
    //register and login
    {
        path: '/',
        component: WelcomePage,
    },
    {
        path:'/homepage',
        component: HomePage,
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;