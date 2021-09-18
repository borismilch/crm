import localizeFilter from '@/filters/localize.filter'

export default {
  install (Vue) {
    Vue.prototype.$title = titleKey => {
      const appName = 'CRM'
      return `${localizeFilter(titleKey)} | ${appName}`
    }
  }
}
