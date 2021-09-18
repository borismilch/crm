<template>
<div>
<div class="grey darken-1 empty-layout">

<form class="card auth-card" @submit.prevent="submitAuth">
  <div class="card-content">
    <span class="card-title">Домашняя бухгалтерия</span>
    <div class="input-field">
      <input
          id="email"
          type="text"
          v-model.trim="email"
          :class = "{invalid: ($v.email.$dirty && !$v.email.required) ||  ($v.email.$dirty && !$v.email.email)}"
      >
      <label for="email">Email</label>
      <small
      class="helper-text invalid"
      v-if="($v.email.$dirty && !$v.email.required)"
      >Будьте ласкаві ввести Email</small>
      <small
      class="helper-text invalid"
      v-else-if="($v.email.$dirty && !$v.email.email)"
      >Введіть корректний email</small>
    </div>
    <div class="input-field">
      <input
          id="password"
          type="password"
          class="validate"
          v-model.trim="password"
          :class = "{invalid: ($v.password.$dirty && !$v.password.required) ||  ($v.password.$dirty && !$v.password.minLength)}"
      >
      <label for="password">Пароль</label>
      <small v-if="($v.password.$dirty && !$v.password.required)" class="helper-text invalid-red">Будьте ласкаві ввести ПАРОЛЬ</small>
      <small v-else-if="($v.password.$dirty && !$v.password.minLength )" class="helper-text invalid-red">Довжина паролю має бути більша ніж {{minLength}} символів</small>
    </div>
  </div>
  <div class="card-action">
    <div>
      <button
          class="btn waves-effect waves-light auth-submit"
          type="submit"
          :disabled = "isSubmited"
      >
        Войти
        <i class="material-icons right">send</i>
      </button>
    </div>

    <p class="center">
      Нет аккаунта?
      <router-link to="/register">Зарегистрироваться</router-link>
    </p>
  </div>
</form>

</div>
</div>
</template>

<script>
import { email, required, minLength } from 'vuelidate/lib/validators'
import messages from '@/utils/messages'

export default {
  metaInfo () {
    return { title: this.$title('ProfileTitle') }
  },
  data: () => ({
    email: '',
    password: '',
    isSubmited: false
  }),

  mounted () {
    if (messages[this.$route.query.message]) {
      this.$message(messages[this.$route.query.message])
    }
  },

  validations: {
    email: { email, required },
    password: { required, minLength: minLength(8) }
  },

  computed: {
    minLength () { return this.$v.password.$params.minLength.min }
  },

  methods: {
    async submitAuth () {
      this.isSubmited = true
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      const Formdata = {
        email: this.email,
        password: this.password
      }

      try {
        await this.$store.dispatch('login', Formdata)
        this.$router.push('/')
      } catch (e) { console.log(e); this.isSubmited = false }
    }
  }
}
</script>

<style>
 small{
   color: rgb(192, 14, 14) !important;
 }
</style>
