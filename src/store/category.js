import firebase from 'firebase/compat/app'

export default {
  state: {
    categories: []
  },
  actions: {
    async createCategory ({ commit, dispatch }, { title, limit }) {
      try {
        const uid = await dispatch('getUid')
        const category = await firebase.database().ref(`users/${uid}/categories`).push({ title, limit })
        return { title, limit, id: category.key }
      } catch (e) { commit('setError', e); throw e }
    },
    async fetchCategories ({ commit, dispatch }) {
      try {
        const uid = await dispatch('getUid')
        const categories = (await firebase.database().ref(`users/${uid}/categories`).once('value')).val()
        if (categories) {
          const cats = Object.keys(categories).map((key) => ({ ...categories[key], id: key }))
          commit('setCategory', cats)
          return cats
        }
        return []
      } catch (e) { commit('setError', e) }
    },
    async patchCategories ({ commit, dispatch }, { id, limit, title }) {
      const uid = await dispatch('getUid')
      await firebase.database().ref(`users/${uid}/categories`).child(id).update({ title, limit })
    }
  },
  getters: { curArr: s => s.categories },
  mutations: {
    pushCategory (s, cat) { s.categories.push(cat) },
    setCategory (s, cats) { s.categories = cats }
  }
}
