import Vue from 'vue'
import Router from 'vue-router'
import Intro from './views/membershipConfig.vue'
import Home from './views/home.vue'
import Transactions from './views/trans.vue'
import Recieve from './views/recMoney.vue'
import Send from './views/sendMoney.vue'
import Education from './views/edu.vue'
import Support from './views/support.vue'
import Settings from './views/settings.vue'
import Balance from './views/balance.vue'
import Setup from './views/setup.vue'
import store from './store/index.js'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { path: '/', redirect: '/home' },
    {
      path: '/home',
      name: 'home',
      component: Home,
      beforeEnter: function (to, from, next) {
        const mainReady = store.state.stageInfo.main
        if (!mainReady) {
          router.push({ path: '/setup' })
        } else {
          next()
        }
      }
    },
    {
      path: '/setup',
      name: 'setup',
      component: Setup
    },
    {
      path: '/balance',
      name: 'balance',
      component: Balance
    },
    {
      path: '/intro',
      name: 'intro',
      component: Intro
    },
    {
      path: '/trans',
      name: 'trans',
      component: Transactions
    },
    {
      path: '/receive',
      name: 'receive',
      component: Recieve
    },
    {
      path: '/send',
      name: 'send',
      component: Send
    },
    {
      path: '/edu',
      name: 'edu',
      component: Education
    },
    {
      path: '/support',
      name: 'support',
      component: Support
    },
    {
      path: '/settings',
      name: 'settings',
      component: Settings
    }
  ]
})
export default router
