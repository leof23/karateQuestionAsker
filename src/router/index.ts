import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ZukiView from '../views/ZukiView.vue'
import UkeView from '../views/UkeView.vue'
import GeriView from '../views/GeriView.vue'
import DachiView from '../views/DachiView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: HomeView },
    { path: '/zuki', component: ZukiView },
    { path: '/uke', component: UkeView },
    { path: '/geri', component: GeriView },
    { path: '/dachi', component: DachiView },
  ],
})

export default router
