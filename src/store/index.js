import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import { userConstants } from './userConstants.js'
import { stageInfo } from './stageInfo.js'
const FileStore = require('electron-store')
const store = new FileStore()

const vuexLocal = new VuexPersistence({
  storage: store,
  saveState: (key, state, storage) => storeState(key, state, storage),
  restoreState: (key, storage) => getState(key, storage)
})
Vue.use(Vuex)

function storeState (key, state, storage) {
  return storage.set(key, state)
}
function getState (key, storage) {
  return storage.get(key)
}
export default new Vuex.Store({
  modules: {
    userConstants,
    stageInfo
  },
  plugins: [vuexLocal.plugin]
})