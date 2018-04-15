<template>
  <section class="compare-search">
    <div class="input-group">
      <input class="input-group-field first" type="text" placeholder="You" v-model="first_in"
             @keypress="fetchData(first_in)" @click="selectIn('first')">
      <span class="input-group-label"> vs </span>
      <input class="input-group-field last" type="text" placeholder="Me" v-model="second_in"
             @keypress="fetchData(second_in)" @click="selectIn('second')">
    </div>
    <p class="text-center">
      <a class="button button-compare" :href="isReady" v-if="isReady">Compare</a>
      <button class="button button-compare" v-else>Compare</button>
    </p>
    <div class="result-box" v-if="things.length !== 0 && things">
      <div class="row small-up-2 medium-up-5 large-up-5 small-12 compare-list">
        <div class="column clickable" v-for="item in things" :key="item.id" @click="selectThing(item)">
          <div class="compare-card">
            <div class="small-12 compare-card-top">
              <img :src="item.photos.featured.path.medium_square_crop" alt="">
            </div>
            <div class="small-12 compare-card-middle">
              <a :href="item.classify.slug + '/item/' +item.slug">{{item.name}}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import model from '../api/model'

export default {
  name: 'compare-box',

  data: () => {
    return {
      select_first: false,
      select_second: false,
      first: null,
      second: null,
      first_in: null,
      second_in: null,
      classify: '',
      things: false
    }
  },

  methods: {
    isSelected (item_id) {
      return item_id === this.first.id || item_id === this.second.id
    },

    fetchData (input) {
      model.getListThing(input, this.classify, 1, data => {
        this.things = data.results
      }, error => {
        console.log(error)
      })
    },

    selectThing (thing) {
      if (this.select_first) {
        this.first = thing
        this.first_in = thing.name
      }
      if (this.select_second) {
        this.second = thing
        this.second_in = thing.name
      }
      this.classify = thing.classify.slug
    },

    selectIn (str) {
      if (str === 'first') {
        this.select_first = true
        this.select_second = false
      } else if (str === 'second') {
        this.select_first = false
        this.select_second = true
      } else {

      }
    }
  },

  computed: {
    isReady () {
      if (this.first !== null && this.second !== null) {
        return '/' + this.first.classify.master_parent.slug + '/' + this.first.slug + '-and-' + this.second.slug + '/'
      } else {
        return false
      }
    }
  },

  updated: function () {
    if (this.first_in === '' && this.second_in === '') {
      this.classify = ''
      this.things = []
    }
  }
}
</script>

<style scoped>
  .result-box {
    background: #3e352f;
    padding-top: 20px;
    padding-bottom: 20px;
    border-radius: 3px;
  }
</style>
