<template>

<div>
<div>
  <div class="page-title">
    <h3>{{'History_Notes' | localize}}</h3>
    <a v-if="notes.length" class="waves-effect waves-light btn"
    @click.prevent="changePie(!pieCharm); pieCharm = !pieCharm"
    :class="pieCharm ? 'red' : 'green'"
    >{{pieCharm ? 'Outcomes' :
      'Incomes'}}</a>
  </div>
    <div v-if="notes.length" class="history-chart" >
    <canvas ref="canvas"></canvas>
  </div>
</div>

<Loader v-if="loading" />
<h6 v-else-if="!notes.length" >{{'History_Empty' | localize}}, <router-link to="/record" tag="a">{{'Add' | localize}}</router-link> </h6>

<section v-else>
 <HistoryTable :notes="notes ? notes : [] " />
</section>

</div>

</template>

<script>
import HistoryTable from '@/components/history/history.table.vue'
import { Pie } from 'vue-chartjs'
export default {
  metaInfo () {
    return { title: this.$title('History_Notes') }
  },
  extends: Pie,
  computed: {
    // costall () { }
  },
  components: { HistoryTable },
  data: () => ({
    notes: [],
    pieCharm: true,
    loading: true,
    categories: [],
    costs: []
  }),
  async mounted () {
    this.notes = (await this.$store.dispatch('fetchNotes')).reverse()
    this.categories = (await this.$store.dispatch('fetchCategories'))
    if (this.notes.length) {
      this.notes = this.notes.map(note => ({ ...note, type: note.come === 'income' ? 'Прибуток' : 'Витрати', typeColor: note.come === 'income' ? 'green' : 'red' }))
      this.changePie(true)
    }
    this.loading = false
  },
  methods: {
    pageChangeHandler () { console.log('page change') },
    changePie (data) {
      const costs = this.categories.map(cat => {
        const spend = this.notes
          .filter(note => note.category === cat.id)
          .filter(note => data ? note.come === 'outcome' : note.come === 'income')
          .reduce((acc, i) => acc + +i.limit, 0)
        return spend
      })
      this.renderChart({
        labels: this.categories.map(n => n.title),
        datasets: [{
          label: 'Витрати по категоріям',
          data: costs,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      })
    }
  }
}

</script>

<style>
  tbody { overflow: auto !important; max-height: 100px !important; }
</style>
