// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
/* eslint-disable */
import './foundation'
import $ from 'jquery'
import Vue from 'vue'
import App from './App'
import CompareBox from './components/Compare-box'
// import router from './router'
import './scss/_app.scss'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import MediaUpload from './app/Product/MediaUpload.vue'
import AlbumEditor from './app/AlbumHandle/Edit.vue'
import AlbumCreator from './app/AlbumHandle/Create.vue'
import ModelHandle from './app/ModelHandle/App.vue'
import GallerySlide from './app/GallerySlide/App.vue'
import Like from './app/Like/App.vue'
import album from './app/Album/store'
Vue.config.productionTip = false
Vue.use(VueAwesomeSwiper)

new Vue({
  el: '#app',
  // router,
  components: {App, CompareBox},
  template: '<App/>'
})

$(document).foundation()

if ($('#compare-box').length) {
  new Vue({
    el: '#compare-box',
    template: '<CompareBox/>',
    components: {CompareBox}
  })
}

if ($('#model_gallery').length) {
  new Vue({
    el: '#model_gallery',

    data () {
      return {
        swiperOption: {
          lazy: true,
          slidesPerView: 4,
          spaceBetween: 15,
          slidesPerGroup: 4,
          loop: false,
          loopFillGroupWithBlank: true,
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          }
        }
      }
    }
  })
}

if ($('#action_like').length) {
  new Vue({
    el: '#action_like',
    components: {Like: Like},
  })
}

if ($('#gallery_create').length) {
  new Vue({
    el: '#gallery_create',
    store: album,
    render: h => h(AlbumCreator),
    mounted: function () {
      $(this.$el).foundation();
    }
  });
}

if ($('#gallery_edit').length) {
  new Vue({
    el: '#gallery_edit',
    store: album,
    render: h => h(AlbumEditor),
    mounted: function () {
      $(this.$el).foundation();
    }
  });
}

if ($('#upload').length) {
  new Vue({
    el: '#upload',
    template: '<MediaUpload/>',
    components: {MediaUpload},
  });
}

if ($('#model_handle').length) {
  new Vue({
    el: '#model_handle',
    components: {ModelHandle: ModelHandle},
  });
}

if ($('#gallery_slider').length) {
  new Vue({
    el: '#gallery_slider',
    template: '<GallerySlide/>',
    components: {GallerySlide},
    mounted: function () {
      $(this.$el).foundation();
    }
  });
}
