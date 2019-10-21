import Vue from 'vue'
import Router from 'vue-router'
// import store from './store.js'
import Home from './views/HelloWorld.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/intro',
      name: 'intro',
      component: () => import(/* webpackChunkName: "about" */ './views/membershipConfig.vue')
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
