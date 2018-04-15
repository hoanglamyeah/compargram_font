/* eslint-disable */
import axios from 'axios'
import utils from './utils'
import * as conf from './configApi'

axios.defaults.headers.common = {
    'X-Requested-With': 'XMLHttpRequest',
    'X-CSRFToken' : utils.getCookie('csrftoken')
};

const URL_ALL_PHOTOS = conf.DOMAIN + '/api/photos/?format=json&ordering=id';
const URL_SUBMIT_PHOTO = conf.DOMAIN + '/api/photos/create/';

export default {
  
  getAllPhotos(page, callback, error, kw) {
    var url = URL_ALL_PHOTOS + '&page=' + page + '&search=' + kw;
    axios.get(url)
      .then(function (response) {
        callback(response.data);
      })
  },
  
  uploadPhoto(data, callback, error) {
    axios.post(URL_SUBMIT_PHOTO, data)
      .then(response => callback(response.data))
      .catch(e => {error(e)});
  }
}
