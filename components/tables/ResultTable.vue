<template>
  <v-container>
    <v-row>
      <v-col cols="8">
        <v-flex xs6 md6>
          <v-subheader>{{ message }}</v-subheader>
        </v-flex>
        <v-flex xs6 md6>
          <!-- <columns-options-button :columns="selectedColumnOptions" /> -->
        </v-flex>
      </v-col>

      <v-col cols="4">
        <v-pagination
          v-show="$vuetify.breakpoint.mdAndUp"
          v-model="pageSync"
          :length="numPages"
          :total-visible="5"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-data-table
        :headers="header"
        :items="tableItems"
        :items-per-page="perPage"
        :loading="loading"
        hide-default-footer
        dense
        @click:row="onRowClicked"
      />
    </v-row>
  </v-container>
</template>
<script>
import { Vue, Component, Prop, PropSync, Emit, Watch } from 'nuxt-property-decorator'
@Component({})
export default class ResultTable extends Vue {
  @PropSync('page', { type: Number, default: 1 }) pageSync;

  @Prop('selected', { type: Object, default: () => {} }) selected;

  @Prop({ type: Array, default: () => [] }) items;

  @Prop({ type: Number, default: 10 }) perPage;

  @Prop({ type: Boolean, default: false }) loading;

  @Prop({ type: Number, default: 0 }) total;

  message = 'Your results will appear here'

  get numPages () {
    return Math.round(this.total / this.perPage) + 1
  }

  get header () {
    return this.selectedColumnOptions.filter((x) => {
      return x.show
    })
  }

  get tableItems () {
    if (this.items && this.items.length) {
      const keys = Object.keys(this.items[0])
      return this.items.map((obj) => {
        const objCopy = Object.assign({}, obj)
        keys.forEach((key) => {
          if (typeof obj[key] === 'number' && !Number.isInteger(obj[key])) {
            objCopy[key] = objCopy[key].toFixed(3)
          }
        })
        objCopy.radec =
          objCopy.meanra && objCopy.meandec ? `${objCopy.meanra},\t ${objCopy.meandec}` : ''
        return objCopy
      })
    }
    return []
  }

  @Emit('rowClicked')
  onRowClicked (item) {
    return item
  }

  selectedColumnOptions = [
    {
      value: 'oid',
      sortable: false,
      text: 'Object ID',
      show: true
    },
    {
      value: 'ndet',
      sortable: true,
      text: 'Number of detections',
      show: true
    },
    {
      value: 'ndethist',
      sortable: true,
      text: 'Number of detections history',
      show: false
    },
    {
      value: 'ncovhist',
      sortable: true,
      text: 'ncovhist',
      show: false
    },
    {
      value: 'jdstarthist',
      sortable: true,
      text: 'jdstarthist',
      show: false
    },
    {
      value: 'jdendhist',
      sortable: true,
      text: 'jdendhist',
      show: false
    },
    {
      value: 'corrected',
      sortable: true,
      text: 'jdendhist',
      show: false
    },
    {
      value: 'stellar',
      sortable: true,
      text: 'stellar',
      show: false
    },
    {
      value: 'firstmjd',
      text: 'FirstMJD',
      sortable: true,
      show: true
    },
    {
      value: 'lastmjd',
      sortable: true,
      text: 'LastMJD',
      show: true
    },
    {
      value: 'radec',
      text: 'RA/Dec (degrees)',
      sortable: false,
      show: true
    },
    {
      value: 'class',
      sortable: false,
      text: 'Highest Probability Class',
      show: true
    },
    {
      value: 'probability',
      sortable: true,
      text: 'Highest Probability',
      show: true
    },
    {
      value: 'deltamjd',
      text: 'DeltaMJD (days)',
      show: true
    },
    {
      value: 'meandec',
      text: 'Dec (degrees)',
      sortable: false,
      show: false
    },
    {
      value: 'meanra',
      text: 'RA (degrees)',
      sortable: false,
      show: false
    },
    {
      value: 'sigmara',
      text: 'Sigma RA',
      sortable: false,
      show: false
    },
    {
      value: 'sigmadec',
      text: 'Sigma DEC',
      sortable: false,
      show: false
    }

  ];

  @Watch('items')
  onItemsChange (val) {
    console.log('onItemsChange')
    this.message = val.length
      ? `Found ${this.total.toLocaleString()} results`
      : 'No results found'
  }
}
</script>
