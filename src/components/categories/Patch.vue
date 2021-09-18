<template>
    <div class="col s12 m6">
        <div>
          <div class="page-subtitle">
            <h4>{{'Choose' | localize}}</h4>
          </div>

          <form>
            <div class="input-field" >
             <select @change="changeValues(id)" ref="select" v-model="id">
              <option v-for="{title, id} in cats" :value="id" :key="id">{{title}}</option>
            </select>

            <label>{{'Choose' | localize}}</label>
            </div>
            <div class="input-field">
              <input
                  id = "name"
                  type = "text"
                  v-model = "title"
                  :class = "{invalid: ($v.title.$dirty && !$v.title.required)}"
              >
              <label for="name">{{'Назва' | localize}}</label>
              <small v-show="($v.title.$dirty && !$v.title.required)" class="helper-text invalid">{{'WarnMessage_enterDesc' | localize}}</small>
            </div>

            <div class="input-field">
              <input
                  id="limit"
                  type="number"
                  v-model.number="limit"
                  :class = "{invalid: ($v.limit.$dirty && !$v.limit.required) || ($v.limit.$dirty && !$v.limit.minValue)}"
              >
              <label for="limit">{{'Bill_Amount' | localize}}</label>
              <small v-show=" ($v.limit.$dirty && !$v.limit.required) || ($v.limit.$dirty && !$v.limit.minValue)" class="helper-text invalid">{{'Мінімальная величина' | localize}} {{minValue}}</small>
            </div>

            <button @click.prevent="patchCategory" class="btn waves-effect waves-light" type="submit">
              {{'Update' | localize}}
              <i class="material-icons right">send</i>
            </button>
          </form>
        </div>
      </div>
</template>

<script>
import M from 'materialize-css'
import { required, minValue } from 'vuelidate/lib/validators'
export default {
  name: 'Patch',
  data: () => ({ limit: 100, id: null, title: '', current: null }),
  mounted () {
    M.FormSelect.init(this.$refs.select)
    M.updateTextFields()
  },
  created () {
    this.id = this.cats[0].id
    this.limit = +this.cats[0].limit
    this.title = this.cats[0].title
  },
  computed: {
    cats () { return this.$store.getters.curArr },
    minValue () { return this.$v.limit.$params.minValue.min }
  },
  validations: {
    limit: { required, minValue: minValue(100) },
    title: { required }
  },
  methods: {
    async patchCategory () {
      try {
        if (this.$v.$invalid) {
          this.$v.$touch()
          return ''
        }
        const categoryData = { limit: this.limit, id: this.id, title: this.title }
        this.$store.dispatch('patchCategories', categoryData)
        this.$message('Категорія успішно оновлена')
        this.$emit('updated', categoryData)
      } catch (e) { console.log(e) }
    },
    changeValues (id) {
      const idx = this.cats.findIndex(c => c.id === id)
      this.limit = +this.cats[idx].limit
      this.title = this.cats[idx].title
      M.updateTextFields()
    },
    destroyed () {
      if (this.select && this.select.destroy) {
        this.select.destroy()
      }
    }
  }

}
</script>

<style>
small{
   color: rgb(192, 14, 14) !important;
 }
</style>
