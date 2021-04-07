<template>
  <div>
    <v-btn
      elevation="2"
      icon
      small
      :disabled="loading || page == 1"
      @click="onPagePrev"
      ><v-icon>mdi-arrow-left</v-icon></v-btn
    >
    <v-btn elevation="2" icon>{{ page }}</v-btn>
    <v-btn
      elevation="2"
      icon
      small
      :disabled="loading || disableNext"
      @click="onPageNext"
      ><v-icon>mdi-arrow-right</v-icon></v-btn
    >
  </div>
</template>
<script>
import { Vue, Component, Prop, Emit } from 'nuxt-property-decorator'
@Component({})
export default class PaginationButtons extends Vue {
  @Prop({ type: Number }) page

  @Prop({ type: Boolean, default: false }) loading

  @Prop({ type: Boolean, default: false }) disableNext

  @Emit('pageChange')
  onPageNext() {
    return this.page + 1
  }

  @Emit('pageChange')
  onPagePrev() {
    return this.page > 0 ? this.page - 1 : this.page
  }
}
</script>
