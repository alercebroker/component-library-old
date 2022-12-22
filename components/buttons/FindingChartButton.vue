<template>
  <v-layout wrap justify-center>
    <v-flex xs12>
      <v-btn
        small
        tile
        block
        color="cyan darken-2"
        :href="link"
        target="_blank"
      >
        <v-icon left>
          mdi-file-document-outline
        </v-icon>
        Finding Chart
      </v-btn>
    </v-flex>
  </v-layout>
</template>
<script>
import { Vue, Component, Prop } from 'nuxt-property-decorator'
@Component({})
export default class FindingChartButton extends Vue {
  @Prop({ type: String })
  oid

  @Prop({ type: Number | String, default: 0 })
  candid

  @Prop({
    type: String,
    default: 'https://findingchart.alerce.online/get_chart?',
  })
  url

  get link() {
    return this.url + 'oid=' + this.oid + '&candid=' + this.candid
  }
}
</script>
