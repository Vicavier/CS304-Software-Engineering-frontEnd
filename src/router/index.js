import {createRouter, createWebHistory} from "vue-router";

const routes = [
    //register and login
    {
        path: '/',
        component: ()=> import('../view/HomePage.vue'),
        children:[
            {
                path:'/',
                component: ()=>import('../view/mainpage/MainContent.vue')
            },
            {
                path:'selfpage',
                component: ()=>import('../view/SelfPage.vue'),
            }
        ]
    },
    {
        path:'/sign',
        component: ()=>import('../view/SignPage.vue'),
    },
    {
        path:'/write',
        component:()=>import('../view/WritePage.vue'),
        children: [
            {
                path:'',
                component:()=>import('../view/mainpage/WriteAssey.vue'),
            },
            {
                path:'QA',
                component:()=>import ('../view/mainpage/QandA.vue'),
            }
        ]
    }

]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;