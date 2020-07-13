<template>
  <v-layout
    column
    justify-center
    align-center
  >
    <alerce-header title="ALeRCE Components" :items="[{title: 'ZTF Explorer', to: 'https://alerce.online/'}, {title: 'SN Hunter', to: 'https://snhunter.alerce.online/'}]" />
    <v-container>
      <v-card>
        <result-table :page.sync="page" :perPage="perPage" :result="result" :loading="loading" :selected.sync="selected"/>
      </v-card>
    </v-container>
  </v-layout>
</template>

<script>
/* eslint-disable */
import Header from '~/components/misc/Header.vue'
import TnsInformation from '~/components/tables/TnsInformation.vue'
import DefaultSearch from '~/components/inputs/DefaultSearch.vue'
import CoordinatesSearch from '~/components/inputs/CoordinatesSearch.vue'
import DateSearch from '~/components/inputs/DateSearch.vue'
import ResultTable from '~/components/tables/ResultTable.vue'
export default {
  components: {
    'alerce-header': Header,
    TnsInformation,
    DefaultSearch,
    CoordinatesSearch,
    DateSearch,
    ResultTable
  },
  data() {
    return {
      result: {},
      perPage: 20,
      page: 1,
      loading: false,
      selected: {}
    }
  },
  mounted() {
    this.loading = true
    this.$axios
    .$get(`http://3.212.59.238:8082/objects/?page=${this.page}&page_size=${this.perPage}&count=true`)
    .then(response => {
      this.result = response
      this.loading = false
    })
  },
  watch: {
    page(val, oldVal) {
      this.loading = true
      this.$axios
        .$get(`http://3.212.59.238:8082/objects/?page=${this.page}&page_size=${this.perPage}&count=true`)
        .then(response => {
          this.result = response
          this.loading = false
      })
    }
  }
  /* eslint-enable */
}
</script>
