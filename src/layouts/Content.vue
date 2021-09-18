<template>
<div>

<Loader v-if = "loading" />

<div v-else class="app-main-layout">
<NavBar @burger = "isOpen = !isOpen"></NavBar>
<SideBar :class="!isOpen ? 'open' : ''" :key="locale"></SideBar>
<AddButton></AddButton>

<main class="app-content" :class="{'full' : isOpen }">
<div class="app-page">

<router-view/>

</div>
</main>

</div>
</div>
</template>

<script>
import AddButton from '../components/AddButton.vue'
import NavBar from '../components/NavBar.vue'
import SideBar from '../components/SideBar.vue'
import messages from '@/utils/messages'
export default {
  name: 'Elems',
  data: () => ({
    isOpen: false,
    loading: true
  }),
  async mounted () {
    if (!Object.keys(this.$store.getters.info).length) {
      await this.$store.dispatch('fetchInfo')
    }
    this.loading = false
  },
  components: { NavBar, SideBar, AddButton },
  computed: {
    error () { return this.$store.getters.error },
    locale () { return this.$store.getters.info.locale }
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
