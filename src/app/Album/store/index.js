/* eslint-disable */
import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import photo from './modules/photo'
import gallery from './modules/gallery'

Vue.use(Vuex);

export default new Vuex.Store({
  actions,
  getters,
  modules: {
    photo,
    gallery
  },
})
