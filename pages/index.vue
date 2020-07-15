<template>
  <v-layout
    column
    justify-center
    align-center
  >
    <a-header title="ALeRCE Components" :items="[{title: 'ZTF Explorer', to: 'https://alerce.online/'}, {title: 'SN Hunter', to: 'https://snhunter.alerce.online/'}]" />
    <v-flex
      xs12
      sm8
      md6
    >
      <v-card light>
        <radar-plot :probabilities="example.probabilities" :title="example.classifier_name" />
      </v-card>

      <v-card>
        <tns-information name="2018hzd" type="SN Ia" :redshift="0.05" />
      </v-card>

      <v-card>
        <default-search v-model="aiuda" :classifiers="classifiers" />
        <coordinates-search v-model="aiuda" />
        <date-search v-model="aiuda" />
      </v-card>

      <v-card>
        BBB: {{ aiuda }}
      </v-card>
    </v-flex>
    <a-footer social />
  </v-layout>
</template>

<script>

export default {
  /* eslint-disable */
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
