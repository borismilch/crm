<template>

<div>
  <Loader v-if="loading" />

  <div v-else-if="currNote">
    <div class="breadcrumb-wrap">
      <router-link to="/notes-history" class="breadcrumb" tag="a">{{"History_Notes" | localize}}</router-link>
      <a class="breadcrumb">
        {{currNote.type | localize}}
      </a>
    </div>
    <div class="row">
      <div class="col s12 m6">
        <div class="card" :class="currNote.typeColor">
          <div class="card-content white-text">
            <p>{{"Bill_Desc" | localize}}: {{currNote.desc}} </p>
            <p>{{"Bill_Amount" | localize}}: {{currNote.limit}} </p>
            <p>{{"Bill_Category" | localize}}: {{currNote.catName}}</p>
            <small> {{currNote.date | date}}</small>
          </div>
        </div>
      </div>
    </div>
  </div>
  <h6 v-else class="center">Запись із id = <strong>{{this.$route.params.id}} не знайдено, перевірте свою голов і не вводьте некоректний ID у адресній строці</strong></h6>
</div>

</template>

<script>
export default {
  metaInfo () {
    return { title: this.$title('Detail_title') }
  },
  data: () => ({
    notes: [],
    loading: true,
    currNote: {}
  }),
  async mounted () {
    this.notes = (await this.$store.dispatch('fetchNotes')).reverse()
    this.notes = this.notes.map(note => ({ ...note, type: note.come === 'income' ? 'Прибуток' : 'Витрати', typeColor: note.come === 'income' ? 'green' : 'red' }))
    console.log(this.notes)
    setTimeout(() => {
      this.currNote = this.notes.find(note => note.id === this.$route.params.id)
      console.log(this.currNote, this.$route.params.id)
      this.loading = false
    }, 0)
  }
}
</script>

<style>

</style>
