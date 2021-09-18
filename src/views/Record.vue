<template>
  <div>

  <div class="page-title">
    <h3>{{"New_Note" | localize}}</h3>
  </div>
  <Loader v-if="loading" />

  <h6 v-else-if="!categories.length" class="center">{{"Categories_Empty" | localize}}<router-link tag="a" to="/categories">{{"Add" | localize}}</router-link></h6>

  <form @submit.prevent="submitHandler" v-else class="form">
    <div class="input-field" >
      <select ref="select" v-model="category" >
        <option v-for="{title, id} in categories" :value="id" :key="id" >{{title}}</option>
      </select>
      <label>{{"Choose" | localize}}</label>
    </div>

    <p>
      <label>
        <input
            class="with-gap"
            name="type"
            type="radio"
            value="income"
            v-model="come"
            @change="showCome"
        />
        <span>{{"Прибуток" | localize}}</span>
      </label>
    </p>

    <p>
      <label>
        <input
            class="with-gap"
            name="type"
            type="radio"
            value="outcome"
            v-model="come"
            @change="showCome"
        />
        <span>{{"Витрати" | localize}}</span>
      </label>
    </p>

    <div class="input-field">
      <input
          id="amount"
          type="number"
          v-model.number="limit"
          :class = "{invalid: ($v.limit.$dirty && !$v.limit.required) || ($v.limit.$dirty && !$v.limit.minValue)}">

       <label for="amount">{{"Bill_Amount" | localize}}</label>
       <small v-show=" ($v.limit.$dirty && !$v.limit.required) || ($v.limit.$dirty && !$v.limit.minValue)" class="helper-text invalid">{{'Мінімальная величина' | localize}} {{minValue}}</small></div>

    <div class="input-field">
      <input
          id="description"
          type="text"
          v-model="title"
          :class = "{invalid: ($v.title.$dirty && !$v.title.required)}"

      >
      <label for="description">{{'Bill_Desc' | localize}}</label>
      <small v-show="($v.title.$dirty && !$v.title.required)" class="helper-text invalid">{{'WarnMessage_enterDesc' | localize}}</small>

      <small v-show="($v.come.$dirty && !$v.come.required)" class="helper-text invalid">{{'WarnMessage_enterType' | localize}}</small>
    </div>

    <button class="btn waves-effect waves-light" type="submit">
      {{'Create' | localize}}
      <i class="material-icons right">send</i>
    </button>
  </form>
</div>
</template>

<script>
import M from 'materialize-css'
import { mapGetters } from 'vuex'
import { required, minValue } from 'vuelidate/lib/validators'
import Loader from '../components/Loader.vue'
export default {
  metaInfo () {
    return { title: this.$title('Menu_NewNote') }
  },
  name: 'Record',
  components: { Loader },
  data: () => ({
    categories: [],
    category: null,
    loading: true,
    come: '',
    select: null,
    limit: 1,
    title: ''
  }),
  async mounted () {
    this.categories = await this.$store.dispatch('fetchCategories')
    if (this.categories.length) this.category = this.categories[0].id
    this.loading = false
    setTimeout(() => { this.select = M.FormSelect.init(this.$refs.select); M.updateTextFields() })
  },
  methods: {
    showCome () { console.log(this.come) },
    async submitHandler () {
      try {
        if (this.$v.$invalid) {
          this.$v.$touch()
          return ''
        }

        if (this.canCreateRecord) {
          const idx = this.categories.findIndex(i => i.id === this.category)
          const formData = { desc: this.title, limit: this.limit, come: this.come, category: this.category, date: new Date().toJSON(), catName: this.categories[idx].title }
          await this.$store.dispatch('addNewNote', formData)
          this.$message('Запись успішно зроблено')
          this.$v.$reset()
          this.title = ''
          this.limit = 1
        } else throw new Error(`Вам не вистачає: ${this.limit - this.info.bill} грн`)
      } catch (e) { this.$message(e.message) }
    }
  },
  destroyed () {
    if (this.select && this.select.destroy) {
      this.select.destroy()
    }
  },
  validations: {
    limit: { required, minValue: minValue(1) },
    title: { required },
    come: { required }
  },
  computed: {
    ...mapGetters(['info']),
    minValue () { return this.$v.limit.$params.minValue.min },
    canCreateRecord () {
      if (this.come === 'income') return true
      else { return this.info.bill >= this.limit }
    }
  }
}
</script>

<style>
small{
   color: rgb(192, 14, 14) !important;
 }
</style>
