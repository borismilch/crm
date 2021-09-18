import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import info from './info'
import category from './category'
import notes from './notes'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    error: null

  },
  mutations: {
    setError (state, error) {
      state.error = error
    },
    clearError (state, error) {
      state.error = null
    },
    setCourse (state, courses) {
      state.currency = courses
    }
  },
  actions: {
    async fetchCurrency ({ commit }) {
      const key = process.env.VUE_APP_FIXER
      let response = await fetch(`http://data.fixer.io/api/latest?access_key=${key}&format=1&symbols=USD,EUR,UAH`)
      response = await response.json()
      commit('setCourse', response)
    }
  },
  getters: {
    error: s => s.error,
    currency: s => s.currency
  },
  modules: {
    auth,
    info,
    category,
    notes
  }
})
