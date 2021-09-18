<template>
  <div class="col s12 m6 l8">
      <div class="card orange darken-3 bill-card">
        <div class="card-content white-text">
          <div class="card-header">
            <span class="card-title">{{'Bill_Courses' | localize}}</span>
          </div>
          <table>
            <thead>
            <tr>
              <th>{{'Bill_Vallet' | localize}}</th>
              <th>{{'Bill_Course' | localize}}</th>
              <th>{{'Bill_Data' | localize}}</th>
            </tr>
            </thead>

            <tbody>
            <tr v-for="(cur) in currencies" :key="cur">
              <td>{{cur}}</td>
              <td>{{rates[cur]}}</td>
              <td>{{course.date | date()}}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'ValletCourses',
  computed: {
    course () { return this.$store.getters.currency },
    rates () { return this.course.rates }
  },
  data: () => ({
    currencies: ['UAH', 'USD', 'EUR']
  }),
  mounted () {
    console.log(this.course)
  }
}
</script>

<style>

</style>
