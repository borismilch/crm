<template>

  <div v-tooltip = "['Перейти на профіль', 'ssss'] " class="fixed-action-btn">
  <router-link class="btn-floating btn-large blue" to="/record">
    <i class="large material-icons">add</i>
  </router-link>
</div>

</template>

<script>
export default {
  name: 'AddButton'
}
</script>

<style>

</style>
