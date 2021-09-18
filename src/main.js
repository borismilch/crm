import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import router from './router'
import store from './store'
import VueMeta from 'vue-meta'
import currencyFilter from '@/filters/currency.filter'
import dateFilter from '@/filters/date.filter'
import messagePlugin from '@/utils/message.plugin'
import titlePlugin from '@/utils/title.plugin'
import tooltipDirective from '@/directives/tooltip.directive.js'
import Paginate from 'vuejs-paginate'
import localizeFilter from '@/filters/localize.filter'
import './registerServiceWorker'
import 'materialize-css/dist/js/materialize'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/database'

import Loader from '@/components/Loader'
Vue.config.productionTip = false

Vue.use(VueMeta)
Vue.use(messagePlugin)
Vue.use(titlePlugin)
Vue.use(Vuelidate)
Vue.filter('date', dateFilter)
Vue.filter('currency', currencyFilter)
Vue.filter('localize', localizeFilter)
Vue.directive('tooltip', tooltipDirective)
Vue.component('Loader', Loader)
Vue.component('Paginate', Paginate)
firebase.initializeApp({
  apiKey: 'AIzaSyAWrmKp76IP4unwoYNr27SeL9gR-cYLaFU',
  authDomain: 'crm-system-cdb9d.firebaseapp.com',
  projectId: 'crm-system-cdb9d',
  storageBucket: 'crm-system-cdb9d.appspot.com',
  messagingSenderId: '1096636983100',
  appId: '1:1096636983100:web:bcafde623e65c9a6ce6039'
})

let app

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})
