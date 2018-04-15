<template>
    <div class="vote-button switch">
      <input class="switch-input" :id="vote_button_id" type="checkbox" :name="vote_button_id" v-model="like">
      <label class="switch-paddle" :for="vote_button_id" @click="doLike">
        <span class="switch-active"><i class="fa fa-thumbs-up" aria-hidden="true"></i></span>
        <span class="switch-inactive"><i class="fa fa-thumbs-down" aria-hidden="true"></i></span>
        <span class="count">{{ count }}</span>
      </label>
    </div>
</template>

<script>
  /* eslint-disable */
  import like from '../../api/like'

  export default {

    props: ['name', 'slug'],

    data: () => {
      return {
        like: true,
        count: 0,
        vote_button_id: 'vote-button'
      }
    },

    updated() {
      this.countLike()
    },

    methods: {
      doLike() {
        like.like(this.name, this.slug, data => {
          this.countLike()
        }, error => {
          console.log(error)
        })
      },

      countLike() {
        like.countLike(this.name, this.slug, data => {
          this.count = data.count
          this.like = !data.liked
        }, error => {
          console.log(error)
        })
      }
    },

    created() {
      this.countLike()
      this.vote_button_id = this.vote_button_id + '-' + this.slug
    }

  }
</script>
