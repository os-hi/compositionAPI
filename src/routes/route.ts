import {createRouter, createWebHistory} from "vue-router"
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import AdminView from '../views/AdminView.vue'
import UserView from '../views/UserView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
                {
                    path: '/',
                    name: 'home',
                    component: HomeView
                },
                {
                    path: '/login',
                    name: 'login',
                    component: LoginView
                },
                {
                    path: '/admin/:name',
                    name: 'admin',
                    component: AdminView
                },
                {
                    path: '/user/:name',
                    name: 'user',
                    component: UserView
                }
            ]

})

export default router