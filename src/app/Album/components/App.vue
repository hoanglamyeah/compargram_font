<template>
  <div class="album-maker">
    <div class="row" v-if="errors.length >0">
      <div class="warning callout small-12" data-closable>
        <h4 class="alert-heading">Warning!</h4>
        <ul>
          <div v-for="error in errors">
            <li v-for="e in error.title">Title: {{ e }}</li>
            <li v-for="e in error.Featured">{{ e }}</li>
            <li v-for="e in error.Photos">{{ e }}</li>
            <li v-if="error.detail">{{ error.detail }}</li>
          </div>
        </ul>
        <button class="close-button" aria-label="Dismiss warning" type="button" data-close @click="removeError()">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    </div>
    <div class="row">
      <div class="large-4 medium-5 small-12 media">
        <div @click="showModal('one')" class="browser-button" v-if="!one">
          <i class="fa fa-file-image-o" aria-hidden="true"></i>
        </div>
        <div class="media-heading result" v-if="one">
          <span class="cancel" @click="removeOne()">
              <i class="fa fa-times-circle" aria-hidden="true"></i>
            </span>
          <img :src="one.path.medium_square_crop">
        </div>
      </div>
      <div class="large-8 medium-5 small-12 media">
        <form>
          <fieldset>
            <label for="gallery_name">Name</label>
            <input v-model="name" type="text" id="gallery_name"
                   placeholder="Enter name of the album">
            <label for="gallery_description">Description</label>
            <textarea v-model="description" id="gallery_description" rows="3"></textarea>
          </fieldset>
        </form>
      </div>
    </div>
    <div class="row">
      <div class="small-12 media">
        <h2>Add photos to gallery</h2>
      </div>
      <div class="small-12">
        <div class="grid-x">
          <div class="column large-3 medium-3 small-6 media" v-for="photo in selected">
            <div class="media-heading result">
              <span class="cancel" @click="removeSelected(photo)">
                <i class="fa fa-times-circle" aria-hidden="true"></i>
              </span>
              <img :src="photo.path.medium_square_crop">
            </div>
          </div>
          <div class="column large-3 medium-3 small-6 media">
            <div @click="showModal('media')" class="browser-button-small">
              <i class="fa fa-file-image-o" aria-hidden="true"></i>
            </div>
          </div>
        </div>
      </div>
      <div class="small-12">
        <div class="column">
          <button @click="submitAlbum()" type="button" class="button expanded">
            <span v-if="method === 'edit'">Edit</span>
            <span v-else>Create</span>
          </button>
        </div>
      </div>
    </div>
    <div class="full reveal media_browser" id="media_browser" data-reveal>
      <div class="modal-dialog modal-dialog-centered media_browser_dialog" role="document">
        <div class="modal-content">
          <media-browser :type="type" @done="hideModal"></media-browser>
        </div>
      </div>
      <button class="close-button" @click="hideModal()" type="button">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  </div>
</template>

<script>
  /* eslint-disable */
  import MediaBrowser from './MediaBrowser.vue'
  import {mapGetters} from 'vuex'
  import gallery from '../../../api/gallery'
  import NProgress from 'nprogress'

  export default {
    props: ['method', 'id'],

    components: {MediaBrowser},

    data: function () {
      return {
        type: '',
        name: '',
        description: '',
        errors: [],
      }
    },

    computed: {
      ...mapGetters({
        selected: 'selectedMedia',
        one: 'getOne',
      }),
    },

    methods: {
      showModal(name) {
        this.type = name
        $('#media_browser').foundation('open')
      },

      hideModal() {
        this.type = ''
        $('#media_browser').foundation('close')
        this.$emit('close');
      },

      removeOne() {
        this.$store.dispatch('selectOne', null)
      },

      removeSelected(photo) {
        this.$store.dispatch('removePhoto', photo)
      },

      submitAlbum() {
        var formData = new FormData();
        formData.append("csrfmiddlewaretoken", this.getCookie('csrftoken'));
        formData.append("title", this.name);
        formData.append("description", this.description);
        formData.append("images", JSON.stringify(this.selected));
        formData.append("featured", JSON.stringify(this.one));
        NProgress.start();
        if (this.method === 'edit') {
          gallery.update(this.id, formData, data => {
            NProgress.done();
            this.$emit('done', data);
          }, error => {
            this.errors.push(error.response.data)
          })
        } else {
          gallery.submit(formData, data => {
            NProgress.done();
            this.$emit('done', data);
          }, error => {
            this.errors.push(error.response.data)
          })
        }
      },

      removeError() {
        this.errors = []
      },

      getCookie(name) {
        var cookieValue = null;
        if (document.cookie && document.cookie !== '') {
          var cookies = document.cookie.split(';');
          for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
              cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
              break;
            }
          }
        }
        return cookieValue;
      },
    },

    created() {
      if (this.method === 'edit') {
        gallery.get(this.id,
          data => {
            this.$store.dispatch('getGallery', data)
            this.name = data.title
            this.description = data.description
          },
          e => {
            console.log(e)
          })
      }
    }
  }
</script>
