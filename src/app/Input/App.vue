<template>
  <div class="input-group-field">
    <input v-if="inputType==='image'" type="text" :value="value_temp.full_size" v-bind:style="{ paddingLeft: padding + 'px' }"
           placeholder="Place your image url or upload!" @change="out()">
    <textarea v-else-if="inputType==='text'" v-model="value_temp"
           v-bind:style="{ paddingLeft: padding + 'px' , margin: 0 + 'px'}"
              placeholder="" @change="out()"></textarea>
    <input-tag v-else-if="inputType==='list'" @update:tags="outList" :tags.sync="value_temp"
               v-bind:style="{ paddingLeft: padding + 'px' }">
    </input-tag>
    <input v-else type="text" :name="name" v-model="value_temp" v-bind:style="{ paddingLeft: padding + 'px' }"
           @change="out()">
    <div ref="test" class="input-group-icon">
      <p v-if="!selecting">
        <i class="fa" v-bind:class="classIcon" aria-hidden="true" @click="browseType()"></i>
      </p>
      <p v-else>
        <i class="fa fa-file-image-o" aria-hidden="true" @click="selectType('image')"></i>
        <i class="fa fa-list" aria-hidden="true" @click="selectType('list')"></i>
        <i class="fa fa-pencil" aria-hidden="true" @click="selectType('text')"></i>
        <i class="fa fa-tag" aria-hidden="true" @click="selectType('tag')"></i>
      </p>
    </div>
    <div v-if="inputType==='image'" class="input-group-upload">
      <i class="fa fa-upload" aria-hidden="true" @click="showModal()"></i>
    </div>
    <div :id="media_browser" class="full reveal media_browser_input" data-reveal>
      <div class="modal-dialog modal-dialog-centered media_browser_dialog" role="document">
        <div class="modal-content">
          <media-browser :id="id" :type="'one'" @done="update_value_image"></media-browser>
        </div>
      </div>
      <button class="close-button clickable" @click="hideModal()" type="button">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
  import InputTag from 'vue-input-tag'
  import MediaBrowser from '../Album/components/MediaBrowser.vue'
  import album from '../Album/store'
  import until from '../../api/utils'
  import {mapGetters} from 'vuex'

  export default {
    name: 'InputModel',

    store: album,

    components: {InputTag: InputTag, MediaBrowser: MediaBrowser},

    props: ['name', 'value', 'id', 'type'],

    data: () => {
      return {
        value_temp: null,
        selecting: false,
        inputType: 'text',
        padding: 37,
        output: {},
        media_browser: 'media-browser',
      }
    },

    computed: {
      classIcon() {
        if (this.inputType === 'image') {
          return 'fa-file-image-o'
        } else if (this.inputType === 'list') {
          return 'fa-list'
        } else if (this.inputType === 'text') {
          return 'fa-pencil'
        } else if (this.inputType === 'tag') {
          return 'fa-tag'
        }
      },

      ...mapGetters({
        one: 'getOne',
      }),

    },

    updated() {
      this.padding = this.$refs.test.clientWidth
    },

    methods: {
      showModal() {
        $('#' + this.media_browser).foundation('open')
      },

      update_value_image(data) {
        this.value_temp = this.one.path
        this.out()
        this.hideModal()
      },

      hideModal() {
        $('#' + this.media_browser).foundation('close')
      },

      browseType() {
        this.selecting = true
      },

      selectType(type) {
        if (type === 'list') {
          this.value_temp = []
        } else {
          this.value_temp = ''
        }
        this.inputType = type
        this.selecting = false
        this.out()
      },

      out() {
        this.output.name = this.name
        this.output.type = this.inputType
        this.output.data = this.value_temp
        this.$emit('done', this.output)
      },

      outList(temp) {
        this.output.name = this.name
        this.output.type = this.inputType
        this.output.data = temp
        this.$emit('done', this.output)
      },
    },

    created() {
      if (typeof this.type === 'undefined') {
        this.inputType = "tag"
        this.value_temp = ""
      } else {
        this.inputType = this.type
        this.value_temp = this.value
      }
    },

    // watch: {
    //   value: function (value) {
    //     this.loadData(value)
    //   }
    // },

    mounted: function () {
      $(this.$el).foundation()
      this.media_browser = until.slugify(this.media_browser + '-' + this.id)
    }
  }
</script>

<style lang="scss">

  .input-group-field {
    position: relative;
    .input-group-icon {
      position: absolute;
      top: 6px;
      left: 10px;
      border-right: 0;
      border-left: 0;
      padding-left: 0px;
      padding-right: 10px;
      p {
        margin: 0;
        padding: 0;
      }
      i {
        font-size: 16px;
        margin-right: 0px;
        cursor: pointer;
        border-radius: 100%;
        width: 27px;
        height: 27px;
      }
    }

    .input-group-upload {
      position: absolute;
      top: 6px;
      padding: 0 10px;
      right: 3px;
      font-size: 16px;
      background: #ffffff;
      cursor: pointer;
    }

    .vue-input-tag-wrapper {
      -webkit-box-shadow: inset 0 1px 2px rgba(10, 10, 10, 0.1);
      box-shadow: inset 0 1px 2px rgba(10, 10, 10, 0.1);
      padding-top: 0px;
      .new-tag {
        float: left;
        height: 22px;
        width: 30px;
        box-shadow: none;
      }
      .input-tag {
        float: left;
        margin-top: 2px;
        padding: 0px 10px;
      }
    }

    input {
      margin-bottom: 0px;
      padding-left: 35px;
      height: 32px;
      padding: 5px;
    }
  }

  .bounce-enter-active {
    animation: bounce-in .5s;
  }

  .bounce-leave-active {
    animation: bounce-in .5s reverse;
  }

  @keyframes bounce-in {
    0% {
      transform: scale(0);
    }
    50% {
      transform: scale(1.5);
    }
    100% {
      transform: scale(1);
    }
  }

</style>
