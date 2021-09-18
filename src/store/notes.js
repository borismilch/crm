import firebase from 'firebase/compat/app'

export default {
  actions: {
    async addNewNote ({ dispatch, commit, getters }, { desc, limit, come, category, date, catName }) {
      const uid = await dispatch('getUid')
      const amount = come === 'income' ? limit : -limit
      const info = await { ...getters.info, bill: +getters.info.bill + amount }
      await firebase.database().ref(`users/${uid}/info`).update(info)
      await firebase.database().ref(`users/${uid}/notes`).push({ desc, limit, come, date, category, catName })
      commit('setInfo', info)
    },
    async fetchNotes ({ dispatch, commit, getters }) {
      try {
        const uid = await dispatch('getUid')
        try {
          const notes = (await firebase.database().ref(`users/${uid}/notes`).once('value')).val()
          const ntc = Object.keys(notes).map((key) => ({ ...notes[key], id: key }))
          return ntc
        } catch { return [] }
      } catch (e) { commit('setError', e) }
    }
  },
  getters: {},
  mutations: {}
}
