import Vue from 'vue'
import Router from 'vue-router'
// import store from './store.js'
import Intro from './views/membershipConfig.vue'
import Home from './views/home.vue'
import Balance from './views/balance.vue'
import Recieve from './views/recMoney.vue'
import Send from './views/sendMoney.vue'
import Lessons from './views/lessons.vue'
import Support from './views/support.vue'
import Settings from './views/settings.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { path: '/', redirect: '/home' },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/intro',
      name: 'intro',
      component: Intro
    },
    {
      path: '/balance',
      name: 'balance',
      component: Balance
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
      path: '/lessons',
      name: 'lessons',
      component: Lessons
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
// router.beforeEach((to, from, next) => {
//   console.log(to)
//   if (store.state.firstStepDone === false) {
//     console.log('ran')
//     next({ path: '/intro' })
//   } else {
//     next()
//   }
// })
export default router
