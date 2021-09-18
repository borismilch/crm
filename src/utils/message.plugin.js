import M from 'materialize-css'
export default {
  install (Vue, options) {
    Vue.prototype.$message = html => {
      M.toast({ html })
    }

    Vue.prototype.$error = html => {
      M.toast({ html: 'Error in: ' + html })
    }
  }
}
