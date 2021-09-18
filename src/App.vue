<template>
  <div id="app">
  <component :is="layout">  <router-view/> </component>
  </div>
</template>

<script>
import 'materialize-css'
import MainLayout from './layouts/Content.vue'
import EmptyLayout from './layouts/Empty.vue'
export default {

  components: { MainLayout, EmptyLayout },
  computed: {
    layout () { return (this.$route.meta.layout || 'main') + '-layout' }
  }
}
</script>

<style lang="scss">

@import '~materialize-css';
@import './assets/index.css';

.sidenav{
  padding: 68px 0px 0px 0px;
  width: 250px !important;
}
body {

}

</style>
