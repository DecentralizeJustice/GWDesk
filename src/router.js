import Vue from 'vue'
import Router from 'vue-router'
import Education from './views/edu.vue'
import Feedback from './views/feedback.vue'
import DevPannel from './views/dev.vue'
import Settings from './views/settings.vue'
import BtcSingleSig from './views/btcSingleSig.vue'
import Dummy from './views/dummy.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { path: '/', redirect: '/edu' },
    {
      path: '/edu',
      name: 'edu',
      component: Education,
      props: (route) => (
        { routeInfo: route.params })
    },
    {
      path: '/dummy',
      name: 'dummy',
      component: Dummy,
      props: (route) => (
        { routeInfo: route.params })
    },
    {
      path: '/feedback',
      name: 'feedback',
      component: Feedback
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
    },
    {
      path: '/settings',
      name: 'settings',
      component: Settings
    }
  ]
})
export default router
