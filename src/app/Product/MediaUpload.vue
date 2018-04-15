<template>
  <upload @done="uploadDone"></upload>
</template>
<script>
  /* eslint-disable */
  import Upload from '../Upload/Upload.vue'
   export default {
     components: {Upload},
     methods: {
       uploadDone (data) {
         window.location.assign('/media/'+ data.id)
       },
       uploadFail (out) {
         console.log(out)
       }
     }
   }
</script>
