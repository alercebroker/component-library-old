<template>
  <v-data-table
    :headers="header"
    :items="items"
    :loading="loading"
    :server-items-length="total"
    :options.sync="localPaginationOptions"
    :no-data-text="noDataText"
    hide-default-footer
    dense
    @update:page="onPageChange"
    @update:sort-by="onSortByChange"
    @update:sort-desc="onSortByChange"
    @update:options="onOptionsChange"
    @click:row="onRowClicked"
  >
    <template v-slot:top>
      <slot name="top">
        <v-toolbar dense flat>
          <v-spacer></v-spacer>
          <AlercePaginationButtons
            :page="paginationOptions.page"
            :loading="loading"
            :disableNext="nextDisabled"
            @pageChange="onPaginationComponentChange"
          />
        </v-toolbar>
      </slot>
    </template>
  </v-data-table>
</template>
<script>
import { Vue, Component, Prop, Emit, Watch } from 'nuxt-property-decorator'
@Component({})
export default class ResultTable extends Vue {
  @Prop({ type: Array, default: () => [] }) items

  @Prop({ type: Boolean, default: false }) loading

  @Prop({ type: Number, default: 0 }) total

  @Prop({ type: Array, default: () => [] }) columnOptions

  @Prop({ type: Object, default: () => {} }) paginationOptions

  @Prop({ type: String, default: 'No data available' }) noDataText

  localPaginationOptions = {}

  beforeMount() {
    this.setLocalPaginationOptions()
  }

  @Watch('paginationOptions', { immediate: true, deep: true })
  setLocalPaginationOptions(val) {
    this.localPaginationOptions = { ...this.localPaginationOptions, ...val }
  }

  get header() {
    return this.columnOptions.filter((x) => {
      return x.show
    })
  }

  get nextDisabled() {
    return this.items.length < this.localPaginationOptions.itemsPerPage
  }

  @Emit('rowClicked')
  onRowClicked(item) {
    return item
  }

  @Emit('pageChange')
  onPageChange(val) {
    return val
  }

  @Emit('sortByChange')
  onSortByChange() {
    return {
      sortBy: this.localPaginationOptions.sortBy,
      sortDesc: this.localPaginationOptions.sortDesc,
    }
  }

  @Emit('optionsChange')
  onOptionsChange(val) {
    return val
  }

  onPaginationComponentChange(page) {
    this.localPaginationOptions.page = page
  }
}
</script>
