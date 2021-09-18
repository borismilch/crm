<template>
  <ul class="sidenav app-sidenav">

    <router-link
    v-for="{title, url} in links"
    tag="li"
    :exact="url === '/'"
    :key="title"
    active-class="active"
    :to="url"
    > <a href="#" class="waves-effect waves-orange pointer">{{title}}</a>
    </router-link>

</ul>
</template>

<script>
import localizeFilter from '@/filters/localize.filter'
export default {
  data: () => ({
    links: [
      { title: localizeFilter('Menu_Bill'), url: '/' },
      { title: localizeFilter('Menu_History'), url: '/notes-history' },
      { title: localizeFilter('Menu_Planning'), url: '/planning' },
      { title: localizeFilter('Menu_NewNote'), url: '/record' },
      { title: localizeFilter('Menu_Category'), url: '/categories' }
    ]
  }),
  name: 'SideBar'
}
</script>

<style>

</style>
