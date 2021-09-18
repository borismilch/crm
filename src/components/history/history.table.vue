<template>
    <section>
    <table>
      <thead>
      <tr>
        <th>#</th>
        <th>{{"Bill_Amount" | localize}}</th>
        <th>{{"Bill_Data" | localize}}</th>
        <th>{{"Bill_Category" | localize}}</th>
        <th>{{"Bill_Type" | localize}}</th>
        <th>{{"Bill_Open" | localize}}</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(note, idx) in notes" :key="idx">
        <td>{{idx + 1}}</td>
        <td>{{note.limit}}</td>
        <td>{{note.date | date}}</td>
        <td>{{note.catName}}</td>
        <td>
          <span
          class="white-text badge"
          :class="note.typeColor"
          >{{note.type | localize }}</span>
        </td>
        <td>
          <router-link v-tooltip = "[viev]" tag="button" :to="'/history/' + note.id" class="btn-small btn">
            <i class="material-icons">open_in_new</i>
          </router-link>
        </td>
      </tr>
      </tbody>
    </table>
  </section>
</template>

<script>
import localizeFilter from '@/filters/localize.filter'
export default {
  props: ['notes'],
  computed: {
    viev () { return localizeFilter('Переглянути запись') }
  }
}
</script>
