<template>
  <div class="row">
    <div class="columns small-12 medium-6">
      <h2>Name</h2>
      <div class="row no-margin">
        <button id="category-select-button" class="dropdown button small-12 medium-4" data-toggle="category-select-box">
          <span v-if="classify_selected !== null">{{ classify_selected.name }}</span>
          <span v-else>Category</span>
        </button>
        <div id="category-select-box" class="dropdown-pane category-select-box small-12 medium-4" data-position="bottom"
             data-alignment="center" data-dropdown data-auto-focus="true">
          <ul class="vertical medium-horizontal menu">
            <li v-for="classify in classifies" :key="classify.id">
              <span class="clickable" @click="selectClassify(classify)">{{ classify.name }}</span>
            </li>
          </ul>
        </div>
        <input type="text" class="columns form-control small-12 medium-8" placeholder="Enter name" v-model="title"
               required>
      </div>
      <textarea rows="3" v-model="description"></textarea>
    </div>
    <div class="columns small-12 medium-6">
      <h2>Photos</h2>
      <gallery-slide :selected="gallery" @done="getGallery" v-if="show_component">
      </gallery-slide>
    </div>
    <div class="columns small-12 input-group" v-for="data in thing_data" :key="data.slug"
         v-bind:class="{ 'medium-6': data.type === 'tag' || data.type === 'image' }">
      <div class="input-group-label movable">{{ data.name }}</div>
      <model-input
        :id="data.slug"
        :name="data.name"
        :value="data.data"
        :type="data.type"
        @done="getData($event, data.slug)">
      </model-input>
      <div class="input-group-label">
        <i aria-hidden="true" class="fa fa-times-circle clickable" @click="removeElement(data.slug)"></i>
      </div>
    </div>
    <div class="columns small-12 text-center">
      <button class="button small expanded" @click="showSelectField()">
        <i v-if="show_select_field" class="fa fa-close"></i>
        <i v-if="!show_select_field" class="fa fa-plus"></i>
      </button>
    </div>
    <transition name="slide-fade">
      <div class="columns small-12 select-field" v-if="show_select_field">
        <p>
          <label class="label secondary">{{classify_selected.name}}: </label>
          <label class="label clickable"
                 v-for="field in classify_selected.field" :key="field.slug"
                 @click="selectField(field)"
                 v-bind:class="{ 'secondary': isFieldAdded (field.slug)}">
            {{field.name}}
          </label>
        </p>
        <p v-for="classify_parent in classify_selected.parent" :key="classify_parent.id">
          <label class="label secondary">{{classify_parent.name}}: </label>
          <label class="label clickable"
                 v-for="field in classify_parent.field" :key="field.slug"
                 @click="selectField(field)"
                 v-bind:class="{ 'secondary': isFieldAdded (field.slug)}">
            {{field.name}}
          </label>
        </p>
      </div>
    </transition>
    <div class="small-12 text-center">
      <button v-if="action === 'edit'" class="button" @click="update">Update</button>
      <button v-else class="button" @click="submit">Submit</button>
    </div>
    <div class="columns small-12" v-if="msg">
      <div :class="'callout ' + msg.status" v-html="msg.message">
      </div>
    </div>
    <div class="columns small-12 text-center">
      <input type="file" @change="getFile($event)">
    </div>
  </div>
</template>

<script>
  /* eslint-disable */
  import $ from 'jquery'
  import Model from '../Model/App3.vue'
  import GallerySlide from '../GallerySlide/App.vue'
  import Vue from 'vue'
  import ModelInput from '../Input/App.vue'
  import model from '../../api/model'

  export default {
    name: 'model-handle',

    components: {Model, ModelInput},

    props: ['action', 'id'],

    data: () => {
      return {
        title: '',
        description: '',
        data: null,
        types: [],
        errors: [],
        gallery: 0,
        show_component: true,
        fields: [],
        thing_data: [],
        show_select_field: false,
        classify_selected: null,
        classifies: [],
        msg: null
      }
    },

    methods: {
      getFile () {
        var reader = new FileReader()
        reader.readAsText(event.target.files[0])
        reader.onload = function (e) {
          var data = JSON.parse(e.target.result)
          this.title = data.name || ''
          this.description = data.description || ''
          this.gallery = data.photos || 0
          this.thing_data = this.slugifyData(data.data) || []
          for (var index in this.classifies) {
            if (this.classifies[index].slug === data.classify) {
              this.classify_selected = this.classifies[index]
              model.classifyField(this.classify_selected.slug, data => {
                this.fields = data
              }, error => {
                console.log(error)
              })
            }
          }
        }.bind(this)

      },

      selectClassify (classify) {
        this.classify_selected = classify
        var fields = []
        for (var index in classify.field) {
          fields.push(classify.field[index])
        }
        for (var index in classify.parent) {
          for (var i in classify.parent[index].field) {
            fields.push(classify.parent[index].field[i])
          }
        }
        var temp = []
        fields.forEach(field => {
          this.thing_data.forEach(data=> {
            if (field.slug === data.slug) {
              temp.push(data)
            }
          })
        })
        this.thing_data = temp
        $('#category-select-box').foundation('close')
      },

      removeElement (field_slug) {
        for (var index in this.thing_data) {
          if (this.thing_data[index].slug === field_slug) {
            this.thing_data.splice(index, 1)
          }
        }
      },

      selectField (field) {
        if (this.isFieldAdded(field.slug)) {
          return
        } else {
          if (this.getFieldSample(field)) {
            this.thing_data.push(this.getFieldSample(field))
          }
        }
      },

      isFieldAdded (field_slug) {
        for (var index in this.thing_data) {
          if (this.thing_data[index].slug === field_slug) {
            return true
          }
        }
        return false
      },

      getFieldSample (field) {
        var data = {
          name: field.name,
          slug: field.slug,
          data: '',
          type: 'tag',
        }
        return data
      },

      showSelectField () {
        this.show_select_field = !this.show_select_field
      },

      getData (event, slug) {
        this.filter(slug).type = event.type
        this.filter(slug).data = event.data
      },

      filter (slug) {
        return this.thing_data.filter(data => data.slug === slug)[0]
      },

      getGallery (data) {
        this.gallery = data
      },

      submit () {
        if (this.prepareData) {
          try {
            model.submitModel(this.prepareData, response => {
              var msg = {
                'status': 'success',
                'message': '<a href="/' + this.classify_selected.slug + '/item/' + response.slug + '">' + response.name + '</a>' + ' have been created!',
              }
              this.msg = msg
              console.log(this.msg)
            }, error => {
              var msg = {
                'status': 'alert',
                'message': error.response.data.msg,
              }
              this.msg = msg
            })
          } catch (e) {
            console.log(e)
          }
        }
      },

      update () {
        if (this.prepareData) {
          try {
            model.updateModel(this.id, this.prepareData, response => {
              var msg = {
                'status': 'success',
                'message': '<a href="/' + this.classify_selected.slug + '/item/' + response.slug + '">' + response.name + '</a>' + ' have been updated!'
              }
              this.msg = msg
            }, error => {
              var msg = {
                'status': 'alert',
                'message': error.response.data.msg,
              }
              this.msg = msg
            })
          } catch (e) {
            console.log(e)
          }
        }
      },

      slugify (text) {
        return text.toString().toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/[^\w\-]+/g, '')
          .replace(/\-\-+/g, '-')
          .replace(/^-+/, '')
          .replace(/-+$/, '')
      },

      slugifyData (data) {
        for (var index in data) {
          data[index].slug = this.slugify(data[index].name)
        }
        return data
      }
    },

    computed: {
      prepareData () {
        if (this.classify_selected === null || typeof this.classify_selected === 'undefined') {
          var msg = {
            'status': 'alert',
            'message': 'Please select a category!'
          }
          this.msg = msg
          return false
        }
        if (this.title === '') {
          var msg = {
            'status': 'alert',
            'message': 'Please input a name'
          }
          this.msg = msg
          return false
        }
        var formData = new FormData
        formData.append('name', this.title)
        formData.append('description', this.description)
        formData.append('photos_id', this.gallery.toString())
        formData.append('data', JSON.stringify(this.thing_data))
        formData.append('classify_slug', this.classify_selected.slug)
        return formData
      }
    },

    created () {
      model.getClassify(data => {
        this.classifies = data
        if (this.action === 'edit') {
          model.getModel(this.id, data => {
            console.log(data)
            this.title = data.name || ''
            this.description = data.description || ''
            this.gallery = data.photos.id || 0
            this.thing_data = this.slugifyData(data.data) || []
            for (var index in this.classifies) {
              if (this.classifies[index].slug === data.classify.slug) {
                this.classify_selected = this.classifies[index]
              }
            }
          }, error => {
            console.log(error)
          })
        }
      }, error => {
        console.log(error)
      })

      Vue.component('GallerySlide', GallerySlide)
      Vue.component('Model', Model)
      this.show_component = true
    },

    mounted () {
      $(this.$el).foundation()
      $('#category-select-box').width($('#category-select-button').width() + 21)
    }
  }
</script>
<style lang="scss">
  .category-select-box {
    padding: 0px;
    background: #FFFFFF;
    .menu.medium-horizontal {
      margin: 0;
    }
    li {
      margin: 0;
      padding: 5px 10px;
      width: 100%;
      &:hover {
        background: #1779ba;
        color: #FFFFFF;
      }
    }
  }

  .select-field {
    background: #dee6e6;
    padding-top: 16px;
    padding-bottom: 16px;
    margin-right: 0.9375rem;
    margin-left: 0.9375rem;
    max-width: calc(100% - 30px);
    h4 {
      margin-bottom: 0;
    }
    .row {
      margin-left: 0px;
      margin-right: 0px;
    }
    .button {
      margin-bottom: 0px;
      margin-left: 5px;
      margin-right: 5px;
      display: block;
      float: left;
      padding: 5px;
      border-radius: 2px;
    }
  }

  .slide-fade-enter-active {
    transition: all .3s ease;
  }

  .slide-fade-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }

  .slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active below version 2.1.8 */
  {
    transform: translateY(10px);
    opacity: 0;
  }
</style>
