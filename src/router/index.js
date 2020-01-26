import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import IndexUsuarios from '../views/users/Index.vue'
import IndexBatidaPonto from '../views/batidaPonto/Index.vue'
import IndexWApp from '../views/wapp/Index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: { auth: true, title: "Home" },
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: { auth: false, title: "Login" },
  },
  {
    path: '/usuarios',
    name: 'indexUsuarios',
    component: IndexUsuarios,
    meta: { auth: ['super_admin'], title: "Usuários" },
  },
  {
    path: '/batida-ponto',
    name: 'indexBatidaPonto',
    component: IndexBatidaPonto,
    meta: { auth: true, title: "Ponto" },
  },
  {
    path: '/wapp',
    name: 'indexWApp',
    component: IndexWApp,
    meta: { auth: ['super_admin'], title: "WhatsApp" },
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
