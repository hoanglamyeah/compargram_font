/* eslint-disable */
import axios from 'axios'
import utils from './utils'
import * as conf from './configApi'


axios.defaults.headers.common = {
    'X-Requested-With': 'XMLHttpRequest',
    'X-CSRFToken' : utils.getCookie('csrftoken')
};

const API_DOMAIN = conf.DOMAIN + '/api/photos/gallery/';
const GALLERY_CREATE = 'create/';
const GALLERY_UPDATE = 'edit/';
const SEARCH = '&search=';
const PAGE = '?page=';

export default {
  
  getAll(page, kw, callback, error) {
    var url = API_DOMAIN + PAGE + page + SEARCH + kw;
    axios.get(url)
      .then(response => callback(response.data))
      .catch(e => error(e))
  },
  
  submit(data, callback, error) {
    var url = API_DOMAIN + GALLERY_CREATE;
    axios.post(url, data)
      .then(function (response) {
        callback(response.data);
      })
      .catch(function (e) {
        error(e);
      });
  },
  
  get(id, callback, error) {
    var url = API_DOMAIN + id + "/" + GALLERY_UPDATE;
    axios.get(url)
      .then(response => callback(response.data))
      .catch(e => error(e))
  },
  
  update(id, data, callback, error) {
    var url = API_DOMAIN + id + "/" +  GALLERY_UPDATE;
    axios.put(url, data)
      .then(response => callback(response.data))
      .catch(e => error(e))
  }
}
