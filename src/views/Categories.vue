<template>

<div>
  <div class="page-title">
    <h3>{{'Categories' | localize}}</h3>
  </div>
  <Loader v-if = "loading" />
  <section v-else>
    <div class="row">
     <Create @create = "addCategory" />
     <Patch v-if="categories.length" @updated = "updateCats" :key="categories.length + updateCount" />
     <h4 class="center" v-else>{{'Categories_Empty' | localize}}</h4>
    </div>
  </section>
</div>
</template>

<script>
// @ is an alias to /src
import Create from '@/components/categories/Create.vue'
import Patch from '@/components/categories/Patch.vue'
import Loader from '../components/Loader.vue'
export default {
  metaInfo () {
    return { title: this.$title('Categories') }
  },
  name: 'Home',
  components: { Create, Patch, Loader },
  data: () => ({
    categories: [],
    loading: true,
    updateCount: 0
  }),
  async mounted () {
    this.categories = await this.$store.dispatch('fetchCategories')
    console.log(this.categories)
    this.loading = false
  },
  methods: {
    addCategory (category) { this.categories.push(category) },
    updateCats ({ id, title, limit }) {
      const idx = this.categories.findIndex(c => c.id === id)
      this.categories[idx].title = title
      this.categories[idx].limit = limit
      this.updateCount++
    }
  }

}
</script>
