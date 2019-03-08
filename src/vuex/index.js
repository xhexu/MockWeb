import Vue from 'vue'
import Vuex from 'vuex'
import Project from './modules/state'


Vue.use(Vuex)

export default new Vuex.Store({
  modules:{
    Project
  }
})
