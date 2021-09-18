<template>

<div>
  <div class="page-title">
    <h3>{{'Planning' | localize}}</h3>
    <h4>{{info.bill | currency}} </h4>
  </div>
  <Loader v-if="loading" />
  <h6 v-else-if="!categories.length" class="center">{{"Categories_Empty" | localize}}<router-link tag="a" to="/categories">{{"Add" | localize}}</router-link></h6>
  <section v-else>
    <div v-for = "({title, id, limit, progressPercent, progressColor, spend, tooltip}) in categories" :key="id" :id="id">
      <p>
        <strong>{{title}}:</strong>
        {{spend | currency }} {{"of" | localize}} {{limit | currency}}
      </p>
      <div class="progress" v-tooltip ="tooltip">
        <div
            class="determinate"
            :style="{ width: `${progressPercent}%`}"
            :class="[progressColor]"
        ></div>
      </div>
    </div>
  </section>
</div>

</template>

<script>
import { mapGetters } from 'vuex'
import currencyFilter from '@/filters/currency.filter.js'
export default {
  metaInfo () {
    return { title: this.$title('Menu_Planning') }
  },
  name: 'Planning',
  data: () => ({
    categories: [],
    loading: true,
    notes: [],
    costs: []
  }),
  async mounted () {
    this.notes = await this.$store.dispatch('fetchNotes')
    this.categories = await this.$store.dispatch('fetchCategories')
    this.categories = this.categories.map(cat => {
      const spend = this.notes
        .filter(note => note.category === cat.id)
        .filter(note => note.come === 'outcome')
        .reduce((acc, i) => acc + +i.limit, 0)
      const percent = 100 * spend / cat.limit
      const progressPercent = percent > 100 ? 100 : percent
      const numb = cat.limit - spend
      const tooltip = `${spend < cat.limit ? 'Залишилось: ' : 'Перевищено на: '}  ${currencyFilter(Math.abs(numb))}`
      const progressColor = percent < 60
        ? 'green'
        : percent < 100
          ? 'yellow'
          : 'red'

      return { spend, progressPercent, progressColor, ...cat, tooltip }
    })
    console.log(this.costs)
    this.loading = false
  },
  computed: {
    ...mapGetters(['info'])

  }

}
</script>

<style>
.progress{
  cursor: pointer;
}
</style>
