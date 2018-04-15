<template>
  <div class="gallery_browser">
    <div class="grid-x grid-padding-x">
      <div class="small-3">
        <a href="#" class="button expanded" @click="showModal()">Create</a>
      </div>
      <div class="small-9">
        <input type="email" class="form-control" placeholder="Type your idea here..." v-model="keyword"
               @change="search">
      </div>
    </div>
    <swiper :options="swiperOption" ref="mySwiper">
      <swiper-slide v-for="photo in photos" :key="photo.id">
        <div class="selectable" v-bind:class="{'selected': isSelected(photo.id)}">
          <img :src="photo.featured.path.medium_square_crop" @click="select(photo)">
          <span class="check"><i class="fa fa-check" aria-hidden="true"></i></span>
        </div>
      </swiper-slide>
      <!-- Optional controls -->
      <div class="swiper-pagination" slot="pagination"></div>
      <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next" @click="next()"></div>
    </swiper>
    <div class="full reveal" id="gallery_browser" data-reveal>
      <div class="media_browser">
        <h2 class="title">Create Gallery</h2>
        <album @done="done" @close="showModal()" :method="'create'"></album>
      </div>
      <button class="close-button" type="button" @click="closeModal()">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  </div>
</template>

<script>
  /* eslint-disable */
  import album from '../Album/store'
  import Album from '../Album/components/App.vue'
  import gallery from '../../api/gallery'
  import NProgress from 'nprogress'

  export default {
    store: album,

    components: {Album},

    props: ['selected'],

    data() {
      return {
        data: null,
        page: 1,
        keyword: '',
        photos: [],
        gallery_id: 0,
        swiperOption: {
          lazy: true,
          slidesPerView: 4,
          spaceBetween: 15,
          slidesPerGroup: 4,
          loop: true,
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
    },

    methods: {
      toSlide(i) {
        this.$refs.mySwiper.swiper.slideTo(i, 0)
      },

      select(photo) {
        if (this.isSelected(photo.id)) {
          this.gallery_id = 0
          this.$emit('done', this.gallery_id)
        } else {
          this.gallery_id = photo.id
          this.$emit('done', this.gallery_id)
        }
      },

      isSelected(id) {
        if (this.gallery_id === 0) {
          return false
        } else {
          return id === this.gallery_id
        }
      },

      done(data) {
        this.photos = [];
        this.fetchData(1, data.title);
        console.log(data)
        this.gallery_id = data.id;
        this.$emit('done', this.gallery_id)
        this.closeModal()
      },

      showModal() {
        $('#gallery_browser').foundation('open')
      },

      closeModal() {
        $('#gallery_browser').foundation('close')
      },

      fetchData(page, kw) {
        NProgress.start();
        gallery.getAll(page, kw,
          data => {
            this.data = data;
            this.photos = this.photos.concat(data.results);
            NProgress.done();
            NProgress.remove();
          },
          error => {
            this.$emit('error', error)
          });
      },

      search() {
        this.page = 1;
        this.photos = [];
        this.fetchData(1, this.keyword);
      },

      next() {
        this.page++
        if (this.data.next !== null) {
          this.fetchData(this.page, this.keyword)
        }
      }
    },

    created() {
      this.gallery_id = this.selected
      this.fetchData(1, '')
    },

    mounted() {
      $($(this.$el)).foundation()
    }
  }
</script>



