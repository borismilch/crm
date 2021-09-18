<template>
  <div class="grey darken-1 empty-layout"><slot></slot></div>
</template>

<script>
import messages from '@/utils/messages'

export default {
  name: 'Empty',
  computed: {
    error () { return this.$store.getters.error }
  },

  watch: {
    error (fbError) {
      console.log(fbError)
      this.$error(messages[fbError] || 'Щось пішло не так')
    }
  }
}
</script>

<style>

</style>
