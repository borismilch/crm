export default function currencyFilter (value, currency = 'UAH') {
  return new Intl.NumberFormat('ru-Ru', {
    style: 'currency',
    currency
  }).format(value)
}
