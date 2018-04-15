/* eslint-disable */
import axios from 'axios'
import * as conf from './configApi'

const MAIN_API = conf.DOMAIN + '/';
const ACTION = '/like';
const SLASH = '/';

export default {
  countLike(name, slug, callback, error) {
    var url = MAIN_API + name + SLASH + slug + ACTION
    axios.get(url).then(response => {
      callback(response.data)
    }).catch(e => {
      error(e)
    })
  },
  
  like(name, slug, callback, error) {
    var url = MAIN_API + name + SLASH + slug + ACTION
    axios.post(url).then(response => {
      callback(response.data)
    }).catch(e => {
      error(e)
    })
  }
}
