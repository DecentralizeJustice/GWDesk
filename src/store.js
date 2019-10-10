import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
const FileStore = require('electron-store')
const store = new FileStore()

const vuexLocal = new VuexPersistence({
  storage: store,
  saveState: (key, state, storage) => storeState(key, state, storage),
  restoreState: (key, storage) => getState(key, storage)
})
Vue.use(Vuex)

function storeState (key, state, storage) {
  console.log(state)
  return storage.set(key, state)
}
function getState (key, storage) {
  return storage.get(key)
}
export default new Vuex.Store({
  state: {
    firstStepDone: false
  },
  mutations: {
    increment (state) {
      // mutate state
      state.yes += 1
    }
  },
  actions: {

  },
  plugins: [vuexLocal.plugin]
})
