<template>
  <v-layout justify-center>
    <v-btn
      x-small
      block
      tile
      color="cyan darken-2"
      :href="link"
      target="_blank"
    >
      <!-- @slot icon slot, usually a v-icon -->
      <slot name="icon">
        <v-icon v-if="useIcon" left>mdi-file-document-outline</v-icon>
      </slot>
      {{ title }}
    </v-btn>
  </v-layout>
</template>
<script>
import { Vue, Component, Prop } from 'nuxt-property-decorator'
/**
 * Button that downloads a finding chart pdf using object id and candid
 */
@Component({})
export default class FindingChartButton extends Vue {
  /**
   * Object id
   */
  @Prop({ type: String }) oid
  /**
   * Candidate id
   */
  @Prop({ type: Number | String, default: 0 }) candid

  /**
   * Button text
   */
  @Prop({ type: String, default: 'Finding Chart' }) title

  /**
   * Url of the finding chart API
   */
  @Prop({
    type: String,
    default: 'https://www.findingchart.alerce.online/get_chart?',
  })
  url

  /**
   * Enable or disable icon
   */
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
