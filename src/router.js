import Vue from 'vue'
import Router from 'vue-router'
import store from './store.js'
import Home from './views/HelloWorld.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      beforeEnter (to, from, next) {
        if (store.state.firstStepDone === false) {
          next({ path: '/intro' })
        } else {
          next()
        }
      }
    },
    {
      path: '/intro',
      name: 'intro',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/membershipConfig.vue')
    }
  ]
})
