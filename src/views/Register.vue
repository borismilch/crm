<template>
<div>

<form class="card auth-card" @submit.prevent="submitRegister">
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
          v-model.trim="password"
          :class = "{invalid: ($v.password.$dirty && !$v.password.required) ||  ($v.password.$dirty && !$v.password.minLength)}"
      >
      <label for="password">Пароль</label>

      <small v-if="($v.password.$dirty && !$v.password.required)" class="helper-text invalid-red">Будьте ласкаві ввести ПАРОЛЬ</small>
      <small v-else-if="($v.password.$dirty && !$v.password.minLength )" class="helper-text invalid-red">Довжина паролю має бути більша ніж {{minLengthP}} символів</small>
    </div>

    <div class="input-field">
      <input
          id="name"
          type="text"
          v-model.trim="name"
          :class = "{invalid: ($v.name.$dirty && !$v.name.required) ||  ($v.name.$dirty && !$v.name.minLength)}"
      >
      <label for="name">Имя</label>
      <small v-if="($v.name.$dirty && !$v.name.required)" class="helper-text invalid-red">Будьте ласкаві ввести своє Ім'я</small>
      <small v-else-if="($v.name.$dirty && !$v.name.minLength )" class="helper-text invalid-red">Довжина шмені має бути більша ніж {{minLengthN}} символів</small>
    </div>
    <p>
      <label>
        <input type="checkbox" @change="confirmed = !confirmed" />
        <span>С правилами согласен</span>
      </label>
    </p>
  </div>
  <div class="card-action">
    <div>
      <button
        class="btn waves-effect waves-light auth-submit"
        type="submit"
        :disabled = "!confirmed || isSubmited"
        :class = "{invalid: ($v.password.$dirty && !$v.password.required) ||  ($v.password.$dirty && !$v.password.minLength)}"
      >
        Зарегистрироваться
        <i class="material-icons right">send</i>
      </button>
    </div>

    <p class="center">
      Уже есть аккаунт?
      <router-link to="/auth">Войти!</router-link>
    </p>
  </div>
</form>

</div>

</template>

<script>
import { email, required, minLength } from 'vuelidate/lib/validators'

export default {
  metaInfo () {
    return { title: this.$title('ProfileTitle') }
  },
  data: () => ({
    email: '',
    password: '',
    name: '',
    confirmed: false,
    isSubmited: false
  }),

  computed: {
    minLengthP () { return this.$v.password.$params.minLength.min },
    minLengthN () { return this.$v.name.$params.minLength.min }
  },

  validations: {
    email: { email, required },
    password: { required, minLength: minLength(6) },
    name: { required, minLength: minLength(4) }
  },

  methods: {
    async submitRegister () {
      this.isSubmited = true
      if (this.$v.$invalid) {
        this.$v.$touch()
        this.isSubmited = false
        return
      }

      const Formdata = {
        email: this.email,
        password: this.password,
        name: this.name
      }
      try {
        await this.$store.dispatch('register', Formdata)
        this.$router.push('/')
      } catch (e) { console.log(e); this.isSubmited = false }
    }
  }
}
</script>

<style>

</style>
