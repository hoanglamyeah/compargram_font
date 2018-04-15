<template>
  <album @done="done" :method="'create'"></album>
</template>
<script>
  /* eslint-disable */
  import Album from '../Album/components/App.vue'
   export default {
     components: {Album},
     methods: {
       done (data) {
         window.location.assign('/media/gallery/'+ data.slug)
       },
     }
   }
</script>
