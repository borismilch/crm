import M from 'materialize-css'

export default {
  bind (el, value) {
    M.Tooltip.init(el, { html: value.value, position: 'top', margin: 3 })
    console.log(value)
  },
  unbind (el) {
    const tooltip = M.Tooltip.getInstance(el)
    if (tooltip && tooltip.destroy) { tooltip.destroy() }
  }
}
