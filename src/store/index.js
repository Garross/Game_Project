import Vue from 'vue'
import Vuex from 'vuex'
import canvas from './modules/canvas'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    canvas
  },
  strict: debug,
})
