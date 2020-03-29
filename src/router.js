import Vue from 'vue'
import Router from 'vue-router'
import Education from './views/edu.vue'
// import btcMusig from './views/btcMusig.vue'
// import dev from './views/dev.vue'

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
    }
    // {
    //   path: '/btcMusig',
    //   name: 'btcMusig',
    //   component: btcMusig
    // },
    // {
    //   path: '/dev',
    //   name: 'dev',
    //   component: dev
    // }
  ]
})
export default router
