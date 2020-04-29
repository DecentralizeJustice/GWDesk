import Vue from 'vue'
import Router from 'vue-router'
import Education from './views/edu.vue'
import DevPannel from './views/dev.vue'
import BtcSingleSig from './views/btcSingleSig.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { path: '/', redirect: '/edu' },
    {
      path: '/edu',
      name: 'edu',
      component: Education
    },
    {
      path: '/devPannel',
      name: 'devPannel',
      component: DevPannel
    },
    {
      path: '/btcSinglesig',
      name: 'btcSinglesig',
      component: BtcSingleSig
    }
  ]
})
export default router
