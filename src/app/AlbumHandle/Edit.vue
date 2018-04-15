<template>
  <album @done="done" :method="'edit'" :id="id"></album>
</template>
<script>
  /* eslint-disable */
  import Album from '../Album/components/App.vue'

  export default {
    components: {Album},

    data: () => {
      return {
        id: 0
      }
    },

    methods: {
      done(data) {
        window.location.assign('/media/gallery/'+ data.slug)
      },
    },

    created() {
      this.id = $( "#data" ).attr( "data" )
    }
  }
</script>
