<template>
  <div>
    <v-btn
      elevation="2"
      icon
      small
      :disabled="loading || page == 1"
      @click="onPagePrev"
    >
      <v-icon>mdi-arrow-left</v-icon>
    </v-btn>
    <v-btn elevation="2" icon>{{ page }}</v-btn>
    <v-btn
      elevation="2"
      icon
      small
      :disabled="loading || disableNext"
      @click="onPageNext"
    >
      <v-icon>mdi-arrow-right</v-icon>
    </v-btn>
  </div>
</template>
<script>
import { Vue, Component, Prop } from 'nuxt-property-decorator'
@Component({})
export default class PaginationButtons extends Vue {
  /**
   * The current page.
   */
  @Prop({ type: Number }) page

  /**
   * disabled then true
   */
  @Prop({ type: Boolean, default: false }) loading

  /**
   * If next page is not available
   */
  @Prop({ type: Boolean, default: false }) disableNext

  onPageNext() {
    /**
     * Triggers when the page changes
     *
     * @property {number} page the new page
     */
    this.$emit('pageChange', this.page + 1)
  }

  onPagePrev() {
    /**
     * Triggers when the page changes
     *
     * @property {number} page the new page
     */
    this.$emit('pageChange', this.page > 0 ? this.page - 1 : this.page)
  }
}
</script>
