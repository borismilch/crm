<template>

<div>
  <div class="page-title">
    <h3>{{'ProfileTitle' | localize}}</h3>
  </div>

  <form class="form">
    <div class="input-field">
      <input
        id="description"
        type="text"
        v-model="name"
        :class = "{invalid: ($v.name.$dirty && !$v.name.required)}"
      >
      <label for="description">{{'Name' | localize}}</label>
      <small v-show="($v.name.$dirty && !$v.name.required)" class="helper-text invalid">{{'WarnMessage_enterName' | localize}}</small>
    </div>
   <div @click="!lang" class="switch">
    <label>
      Eng
      <input v-model="lang" type="checkbox">
      <span class="lever"></span>
      Українська
    </label>
  </div>
    <button @click.prevent="updateName()" class="btn waves-effect waves-light" type="submit">
      {{'Update' | localize}}
      <i class="material-icons right">send</i>
    </button>
  </form>
</div>

</template>

<script>
import M from 'materialize-css'
import { required } from 'vuelidate/lib/validators'
import { mapGetters, mapActions } from 'vuex'
export default {
  metaInfo () {
    return { title: this.$title('ProfileTitle') }
  },
  data: () => ({
    name: '',
    lang: true
  }),
  mounted () {
    this.name = this.info.name
    this.lang = this.info.locale === 'uk-Ua'
    setTimeout(() => M.updateTextFields())
  },
  computed: {
    ...mapGetters(['info'])
  },
  validations: {
    name: { required }
  },
  methods: {
    ...mapActions(['updateInfo']),
    async updateName () {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return ''
      }
      await this.updateInfo({ name: this.name, locale: this.lang ? 'uk-Ua' : 'en-Us' })
      const localeValue = this.lang ? 'Мову будо змінено на Українську' : 'Language was switched on English' || 'ffff'
      this.$message(localeValue)

      try { console.log(this.name) } catch (e) { console.log(e) }
    }
  }
}
</script>

<style>
 .switch{
   margin: 0px 0px 2rem 0px;
 }
 small{
   color: rgb(192, 14, 14) !important;
 }
</style>
