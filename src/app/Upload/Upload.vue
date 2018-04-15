<template>
  <div>
    <div class="row" v-if="error">
      <div class="warning callout small-12 columns" data-closable>
        <h5 class="alert-heading">Warning!</h5>
        <ul v-if="error.path">
          <li v-for="e in error.path">{{ e }}</li>
        </ul>
        <ul v-if="error.title">
          <li v-for="e in error.title">Title: {{ e }}</li>
        </ul>
        <button class="close-button" aria-label="Dismiss warning" type="button" data-close @click="removeError()">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    </div>
    <form :id="upload_form" class="row upload-media-form" method="post" enctype="multipart/form-data">
      <div class="large-5 medium-5 small-12 columns">
        <div class="upload-input" v-bind:class="{'hide': !check }">
          <label class="upload-button">
            <i class="fa fa-upload" aria-hidden="true"></i>
          </label>
          <input class="input-file" name="path" type="file" @change="getFile($event)" required>
        </div>
        <div class="result" v-if="!check">
            <span class="cancel">
              <i class="fa fa-times-circle" aria-hidden="true" @click="changeCheck()"></i>
            </span>
          <div class="result-image">
            <img :src="temp"/>
          </div>
        </div>
      </div>
      <div class="large-7 medium-7 small-12 columns">
        <label>Title:</label>
        <input class="form-control" maxlength="160" name="title" type="text" required v-model="title">
        <label>Description:</label>
        <textarea class="form-control" name="description" v-model="description" required>
            </textarea>
        <div class="inline-group">
          <a href="#" class="button" @click="upload()">Upload</a>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
  /* eslint-disable */
  import photo from '../../api/photo'
  import NProgress from 'nprogress'

  export default {

    name: 'Upload',
    props: ['id'],

    data: function () {
      return {
        title: null,
        description: null,
        file: null,
        temp: '',
        error: null,
        check: true,
        upload_form: 'upload-form'
      }
    },

    methods: {
      getFile(event) {
        this.readFile(event.target.files[0])
        this.check = false
      },

      upload() {
        var testForm = document.getElementById(this.upload_form);
        var formData = new FormData(testForm);
        NProgress.start()
        photo.uploadPhoto(formData, data => {
          this.$emit('done', data);
          this.temp = '';
          this.check = true;
          testForm.reset()
          NProgress.done()
          NProgress.remove()
        }, error => {
          this.error = error.data
          this.temp = '';
          this.check = true;
          testForm.reset()
        })
      },

      readFile(input) {
        var reader = new FileReader();
        reader.onload = function (e) {
          this.temp = e.target.result
        }.bind(this)
        reader.readAsDataURL(input);
      },
      removeError() {
        this.error = null
      },

      changeCheck() {
        this.check = true
        $('#input-file').val("");
      }
    },

    created() {
      this.upload_form = this.upload_form + '_' + this.id
    },
  }
</script>
