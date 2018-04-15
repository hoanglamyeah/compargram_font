/* eslint-disable */
import gallery from '../../../../api/gallery'
import * as cf from '../../../../api/configApi'
import * as types from '../mutation-types'
import Vue from 'vue'

// initial state
const state = {
  selected: [],
  one: null,
}

// getters
const getters = {
  selectedMedia: state => state.selected,
  getOne: state => state.one,
}

// actions
const actions = {

  selectPhoto ({ commit }, photo) {
    commit(types.SELECT_MEDIA, { photo })
  },
  removePhoto ({ commit }, photo) {
    commit(types.REMOVE_MEDIA, { photo })
  },
  selectOne ({ commit }, photo) {
    commit(types.SELECT_ONE, { photo })
  },
  getGallery ({commit}, data) {
    commit(types.GET_GALLERY, { data })
  }
  
}

// mutations
const mutations = {
  [types.GET_GALLERY] (state, { data }) {
    state.selected = data.photos;
    state.one = data.featured;
    state.title = data.title;
    state.description = data.description;
  },
  
  [types.SELECT_MEDIA] (state, { photo }) {
    state.selected.push(photo)
  },
  [types.REMOVE_MEDIA] (state, {photo }) {
    var removeIndex = state.selected.map(function (item) {
            return item.id;
          }).indexOf(photo.id);
    state.selected.splice(removeIndex, 1);
  },
  [types.SELECT_ONE] (state, { photo }) {
    var temp_photo = photo
    Vue.set(temp_photo.path, 'full_size',temp_photo.path.full_size.replace(cf.DOMAIN,''))
    Vue.set(temp_photo.path, 'medium_square_crop',temp_photo.path.medium_square_crop.replace(cf.DOMAIN,''))
    state.one = temp_photo
  },
}

export default {
  state,
  getters,
  actions,
  mutations
}
