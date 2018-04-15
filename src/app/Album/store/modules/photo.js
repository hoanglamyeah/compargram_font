/* eslint-disable */
import photo from '../../../../api/photo'
import * as types from '../mutation-types'

// initial state
const state = {
  data: {},
}

// getters
const getters = {
  allData: state => state.data,
}

// actions
const actions = {
  getAllPhotos ({ commit }, {page, kw}) {
    photo.getAllPhotos(page, data => {commit(types.GET_ALL_MEDIA, { data })}, e => console.log(e), kw)
  },
  
}

// mutations
const mutations = {
  [types.GET_ALL_MEDIA] (state, { data }) {
    state.data = data
  },
}

export default {
  state,
  getters,
  actions,
  mutations
}
