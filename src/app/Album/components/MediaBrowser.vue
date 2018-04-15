<template>
  <div class="media_browser">
    <h2 class="title">Media browser</h2>
    <ul class="tabs" data-tabs :id="example_tabs">
      <li class="tabs-title is-active"><a :href="'#'+media_upload" aria-selected="true">Upload files</a></li>
      <li class="tabs-title"><a :data-tabs-target="media_library" :href="'#'+media_library">Media library</a></li>
    </ul>
    <div class="tabs-content" :data-tabs-content="example_tabs">
      <div class="tabs-panel is-active media_upload_tab" :id="media_upload">
        <upload :id="id" @done="changeTab"></upload>
      </div>
      <div class="tabs-panel" :id="media_library">
        <input @change="fetchMedia" type="text" v-model="kw" class="form-control"
               placeholder="Type something here...">
        <div class="row">
          <div class="list-model row small-up-2 medium-up-3 large-up-3">
            <div class="column column-block model selectable" v-for="photo in media" @click="select(photo)">
              <div class="media-heading" v-bind:class="{'selected': isChecked(photo) }">
                <span class="check"><i class="fa fa-check" aria-hidden="true"></i></span>
                <img :src="photo.path.medium_square_crop">
              </div>
            </div>
          </div>
        </div>
        <div v-if="viewer && selected.length" class="row">
          <div class="col-lg-12 information">
            <div class="alert alert-dismissible alert-info">
              <h2>{{ viewer.title }}</h2>
              <p>{{ viewer.description }}</p>
            </div>
          </div>
        </div>
        <button class="button" :disabled="!previous" @click="fetchPreviousMedia">BACK</button>
        <button class="button" :disabled="!next" @click="fetchNextMedia">NEXT</button>
        <button class="button float-right" @click="done()">Done</button>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
  import Upload from '../../Upload/Upload.vue'
  import {mapActions, mapGetters} from 'vuex'

  export default {

    components: {Upload},

    props: ['type', 'id'],

    data: function () {
      return {
        page: 1,
        viewer: null,
        kw: '',
        media_upload: 'media-upload',
        media_library: 'media-library',
        example_tabs: 'example-tabs'
      }
    },

    computed: {
      ...mapGetters({
        data: 'allData',
        selected: 'selectedMedia',
        one: 'getOne',
      }),

      media() {
        return this.data.results
      },

      next() {
        return this.data.next
      },

      previous() {
        return this.data.previous
      },

    },

    methods: {
      ...mapActions([
        'selectPhoto'
      ]),

      fetchNextMedia() {
        this.page++;
        this.$store.dispatch('getAllPhotos', {page: this.page, kw: this.kw});
      },

      fetchPreviousMedia() {
        this.page--;
        this.$store.dispatch('getAllPhotos', {page: this.page, kw: this.kw});
      },

      select(photo) {
        this.viewer = photo;
        if (this.type === 'one') {
          if (this.one === null || photo.id !== this.one.id) {
            this.$store.dispatch('selectOne', photo)
          } else {
            this.$store.dispatch('selectOne', null)
          }
        } else {
          if (this.checkMediaArray(photo, this.selected)) {
            this.$store.dispatch('removePhoto', photo)
          } else {
            this.$store.dispatch('selectPhoto', photo)
          }
        }
      },

      checkMediaArray(photo, array) {
        var media;
        for (media in array) {
          if (array.hasOwnProperty(media) && array[media].id === photo.id) {
            return true;
          }
        }
        return false;
      },

      isChecked(photo) {
        if (this.type === 'one') {
          if (this.one === null) {
            return false
          } else {
            return photo.id === this.one.id
          }
        } else {
          return this.checkMediaArray(photo, this.selected)
        }
      },

      fetchMedia() {
        this.page = 1;
        this.$store.dispatch('getAllPhotos', {page: this.page, kw: this.kw})
      },

      changeTab(data) {
        if (this.type === 'one') {
          this.$store.dispatch('selectOne', data)
          this.$store.dispatch('getAllPhotos', {page: 1, kw: ''})
          this.$emit('done');
        } else {
          this.$store.dispatch('selectPhoto', data)
          this.$store.dispatch('getAllPhotos', {page: 1, kw: ''})

        }
        $("#" + this.media_library + "-label").click();
      },

      done() {
        this.$emit('done', 'aaaaa')
      },

      slugify(text) {
        return text.toString().toLowerCase()
          .replace(/\s+/g, '-')           // Replace spaces with -
          .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
          .replace(/\-\-+/g, '-')         // Replace multiple - with single -
          .replace(/^-+/, '')             // Trim - from start of text
          .replace(/-+$/, '');            // Trim - from end of text
      }
    },

    created() {
      this.$store.dispatch('getAllPhotos', {page: 1, kw: ''})
      this.media_upload = this.slugify(this.media_upload + '-' + this.id)
      this.media_library = this.slugify(this.media_library + '-' + this.id)
      this.example_tabs = this.slugify(this.example_tabs + '-' + this.id)
    },

    mounted() {
      $($(this.$el)).foundation()
    }
  }
</script>
