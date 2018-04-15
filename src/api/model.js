/* eslint-disable */
import axios from 'axios'
import utils from './utils'
import * as conf from './configApi'

axios.defaults.headers.common = {
    'X-Requested-With': 'XMLHttpRequest',
    'X-CSRFToken' : utils.getCookie('csrftoken')
};

const MAIN_API = conf.DOMAIN + '/api/';
const URL_ALL_TYPES = '/classify/';
const SLASH = '/';
const AND = '&'
export default {

  classifyField(classify, callback, error) {
    axios.get(MAIN_API + 'field/?classify=' + classify)
      .then(function (response) {
        callback(response.data);
      })
      .catch(e => {error(e)});
  },

  getTypes(name, callback, error) {
    axios.get(MAIN_API + name + URL_ALL_TYPES)
      .then(function (response) {
        callback(response.data);
      })
      .catch(e => {error(e)});
  },

  getClassify(callback, error) {
    axios.get(MAIN_API + 'classify/')
      .then(function (response) {
        callback(response.data);
      })
      .catch(e => {error(e)});
  },

  submitModel(data, callback, error) {
    var url = MAIN_API + 'thing' + SLASH;
    axios.post(url, data).then(response => {callback(response.data)}).catch(e => {error(e)})
  },

  updateModel(id, data, callback, error) {
    var url = MAIN_API + 'thing' + SLASH + id + SLASH;
    axios.put(url, data)
      .then(response => callback(response.data))
      .catch(e => {error(e)});
  },

  getModel(id, callback, error) {
    var url = MAIN_API + 'thing' + SLASH + id + SLASH;
    axios.get(url)
      .then(response => callback(response.data))
      .catch(e => {error(e)});
  },

  getListThing(keyword, classify, page, callback, error) {
    var url = MAIN_API + 'thing' + SLASH + '?search=' + keyword + AND + 'classify=' + classify + AND + 'page=' + page;
    console.log(url)
    axios.get(url)
      .then(response => callback(response.data))
      .catch(e => {error(e)});
  }
}
