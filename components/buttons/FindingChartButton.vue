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
        <slot name="icon">
          <v-icon v-if="useIcon" left>
            mdi-file-document-outline
          </v-icon>
        </slot>
        {{ title }}
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

  @Prop({ type: String, default: 'Finding Chart' }) title

  @Prop({
    type: String,
    default: 'https://www.findingchart.alerce.online/get_chart?',
  })
  url

  @Prop({
    type: Boolean,
    default: true,
  })
  useIcon

  get link() {
    return this.url + 'oid=' + this.oid + '&candid=' + this.candid
  }
}
</script>
