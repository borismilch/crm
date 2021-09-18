<template>
 <div class="col s12 m6 l4">
    <div class="card light-blue bill-card">
    <div class="card-content white-text">
        <span class="card-title">{{'Bill_Your-Bill' | localize}}</span>
        <div class="reverse">
        <p class="currency-line" v-for="cur in currencies" :key="cur">
        <span>{{ getCurrency(cur) | currency(cur) }} </span>
        </p>
        </div>
    </div>
    </div>
</div>
</template>

<script>
export default {
  name: 'ValletCount',
  data: () => ({
    currencies: ['USD', 'EUR', 'UAH']
  }),
  computed: {
    moneyCount () { return this.$store.getters.info.bill },
    courses () { return this.$store.getters.currency },
    rates () { return this.courses.rates }
  },
  methods: {
    getCurrency (cur) { return Math.floor((this.moneyCount / this.rates.UAH) * this.rates[cur]) }
  }
}
</script>

<style>
.reverse{
  display: flex;
  flex-direction: column-reverse;
}
</style>
