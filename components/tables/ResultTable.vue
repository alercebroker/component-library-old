<template>
  <v-data-table
    :headers="header"
    :items="items"
    :loading="loading"
    :no-data-text="localMessage"
    :server-items-length="total"
    :options.sync="localPaginationOptions"
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
        <v-toolbar v-show="items.length > 0" dense flat>
          {{ paginationMessage }}
          <v-spacer></v-spacer>
          <v-pagination
            v-show="$vuetify.breakpoint.mdAndUp"
            v-model="localPaginationOptions.page"
            :length="numPages"
            :total-visible="8"
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

  @Prop({ type: String, default: 'Your results will appear here' })
  defaultMessage

  paginationMessage = ''

  localMessage = ''

  localPaginationOptions = {}

  beforeMount() {
    this.setLocalMessage()
    this.setLocalPaginationOptions()
    this.setPaginationMessage()
  }

  setPaginationMessage() {
    if (this.items) {
      this.onItemsChange(this.items)
    }
  }

  setLocalMessage() {
    if (this.items.length) {
      this.localMessage = `Found ${this.total.toLocaleString()} results`
    } else this.localMessage = this.defaultMessage
  }

  @Watch('paginationOptions', { immediate: true, deep: true })
  setLocalPaginationOptions(val) {
    this.localPaginationOptions = { ...this.localPaginationOptions, ...val }
  }

  get numPages() {
    return Math.round(this.total / this.localPaginationOptions.itemsPerPage)
  }

  get header() {
    return this.columnOptions.filter((x) => {
      return x.show
    })
  }

  @Emit('rowClicked')
  onRowClicked(item) {
    return item
  }

  @Watch('items')
  onItemsChange(val) {
    this.paginationMessage = val.length
      ? `Found ${this.total.toLocaleString()} results`
      : 'No results found'
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
}
</script>
