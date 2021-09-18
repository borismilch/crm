<template>
   <div class="col s12 m6">
        <div>
          <div class="page-subtitle">
            <h4>{{'Create' | localize}}</h4>
          </div>

          <form>
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
                  v-model = "limit"
                  :class = "{invalid: ($v.limit.$dirty && !$v.limit.required) || ($v.limit.$dirty && !$v.limit.minValue)}"
              >
              <label for="limit">{{'Bill_Amount' | localize}}</label>
              <small v-show=" ($v.limit.$dirty && !$v.limit.required) || ($v.limit.$dirty && !$v.limit.minValue)" class="helper-text invalid">{{'Мінімальная величина' | localize}} {{minValue}}</small>
            </div>

            <button class="btn waves-effect waves-light" @click.prevent="createNewCategory" type="submit">
              {{'Create' | localize}}
              <i class="material-icons right">send</i>
            </button>
          </form>
        </div>
      </div>
</template>

<script>
import { required, minValue } from 'vuelidate/lib/validators'
import M from 'materialize-css'
export default {
  name: 'Create',
  data: () => ({
    title: '',
    limit: 100
  }),
  validations: {
    title: { required },
    limit: { required, minValue: minValue(100) }
  },
  computed: {
    minValue () { return this.$v.limit.$params.minValue.min }
  },
  methods: {
    async createNewCategory () {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return ''
      }
      try {
        const formData = { title: this.title, limit: this.limit }
        const category = await this.$store.dispatch('createCategory', formData)
        this.title = ''
        this.limit = 100
        this.$v.$reset()
        this.$emit('create', category)
        this.$message('Нова категорія успішно створена')
      } catch (e) { console.log(e) }
    }
  },
  mounted () {
    M.updateTextFields()
  }
}
</script>

<style>
small{
   color: rgb(192, 14, 14) !important;
 }
</style>
