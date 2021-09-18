<template>

<div>
<div class="page-title">
    <h3>{{'Menu_Bill' | localize}}</h3>

    <button @click="refresh" class="btn waves-effect waves-light btn-small">
      <i class="material-icons">refresh</i>
    </button>
  </div>

  <Loader v-if="isLoading" />
  <div v-else class="row">
  <ValletCount/>
  <ValletCourses/>
  </div>
</div>

</template>

<script>

import ValletCount from '../components/count/ValletCount.vue'
import ValletCourses from '../components/count/ValletCourses.vue'
export default {
  metaInfo () {
    return { title: this.$title('Bill_Bill') }
  },
  data: () => ({ isLoading: true }),
  components: { ValletCount, ValletCourses },
  async mounted () {
    await this.$store.dispatch('fetchCurrency')
    this.isLoading = false
  },
  methods: {
    async refresh () {
      this.isLoading = true
      this.currency = await this.$store.dispatch('fetchCurrency')
      this.delay()
    },
    delay () {
      setTimeout(() => { this.isLoading = false }, 1000)
    }
  }

}
</script>

<style>

</style>
