import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ZukiView from '../views/ZukiView.vue'
import UkeView from '../views/UkeView.vue'
import GeriView from '../views/GeriView.vue'
import DachiView from '../views/DachiView.vue'
import VocabularyView from '../views/VocabularyView.vue'
import IbukiwasaView from '../views/IbukiwasaView.vue'
import KaratedowasaView from '../views/KaratedowasaView.vue'
import KumitewasaView from '../views/KumitewasaView.vue'
import UnsokuView from '../views/UnsokuView.vue'
import NumbersView from '../views/NumbersView.vue'
import DojokunView from '../views/DojokunView.vue'
import AnimalsView from '../views/AnimalsView.vue'
import EmblemView from '../views/EmblemView.vue'
import KataNamesView from '../views/KataNamesView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: HomeView },
    { path: '/zuki', component: ZukiView },
    { path: '/uke', component: UkeView },
    { path: '/geri', component: GeriView },
    { path: '/dachi', component: DachiView },
    { path: '/vocabulary', component: VocabularyView },
    { path: '/ibukiwasa', component: IbukiwasaView },
    { path: '/karatedowasa', component: KaratedowasaView },
    { path: '/kumitewasa', component: KumitewasaView },
    { path: '/unsoku', component: UnsokuView },
    { path: '/numbers', component: NumbersView },
    { path: '/dojokun', component: DojokunView },
    { path: '/animals', component: AnimalsView },
    { path: '/emblem', component: EmblemView },
    { path: '/kata-names', component: KataNamesView },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
})

export default router
