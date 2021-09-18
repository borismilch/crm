<template>
  <nav class="navbar orange lighten-1">
      <div class="nav-wrapper">
        <div class="navbar-left">
          <a href="#" @click.prevent="$emit('burger')">
            <i class="material-icons black-text">dehaze</i>
          </a>
          <span class="black-text">{{date | date('datetime')}}</span>
        </div>

        <ul class="right hide-on-small-and-down">
          <li>
            <a
                class="dropdown-trigger black-text"
                href="#"
                data-target="dropdown"
                ref="dropdown"
            >
              {{name}}
              <i class="material-icons right">arrow_drop_down</i>
            </a>

            <ul id='dropdown' class='dropdown-content'>
              <li>
                <router-link to="/profile" tag="a" class="black-text">
                  <i class="material-icons">account_circle</i>{{'Profile' | localize}}
                </router-link>
              </li>
              <li class="divider" tabindex="-1"></li>
              <li>
                <a  class="black-text" @click.prevent = "logout">
                  <i class="material-icons">assignment_return</i>{{'Sing_out' | localize}}
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
</template>

<script>
import M from 'materialize-css'
export default {

  name: 'NavBar',

  data: () => ({
    date: new Date(),
    interval: null,
    dropdown: null
  }),

  methods: {
    async logout () {
      await this.$store.dispatch('logout')
      this.$router.push('/auth?message=logout')
    }
  },
  computed: {
    name () { return this.$store.getters.info.name }
  },

  mounted () {
    this.dropdown = M.Dropdown.init(this.$refs.dropdown, { constrainWidth: true })
    this.interval = setInterval(() => { this.date = new Date() }, 1000)
  },

  beforeDestroy () {
    clearInterval(this.interval)
    if (this.dropdown && this.dropdown.destroy) { this.dropdown.destroy() }
  }
}
</script>

<style>
 .navbar{
   position: fixed;
   top: 0;
 }
</style>
