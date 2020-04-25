import Vue from 'vue'
import Router from 'vue-router'
import Education from './views/edu.vue'
import DevPannel from './views/dev.vue'
// import btcMusig from './views/btcMusig.vue'

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
      name: 'DevPannel',
      component: DevPannel
    }
    // {
    //   path: '/btcMusig',
    //   name: 'btcMusig',
    //   component: btcMusig
    // },
  ]
})
export default router
