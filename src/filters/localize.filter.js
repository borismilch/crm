import store from '../store'
import ru from '../locale/ru.json'
import eng from '../locale/eng.json'
const locales = {
  'uk-Ua': ru,
  'en-Us': eng
}
export default function localizeFilter (key) {
  const locale = store.getters.info.locale || 'ru-Ru'
  console.log(locale)
  return locales[locale][key] || '{[Localize-error]'
}
