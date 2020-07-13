<template>
  <v-container>
    <v-row>
      <v-col cols="8">
        <v-flex xs6 md6>
          <v-subheader>
            {{ message }}
          </v-subheader>
        </v-flex>
        <v-flex xs6 md6>
          <columns-options-button :columns="selectedColumnOptions" />
        </v-flex>
      </v-col>

      <v-col cols="4">
        <v-pagination
          v-model="syncPage"
          :length="numPages"
          :total-visible="5"
          v-show="$vuetify.breakpoint.mdAndUp"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-container fluid>
        <v-data-table
          :headers="header"
          :items="items"
          :items-per-page="perPage"
          :loading="loading"
          @click:row="onRowClicked"
          class="elevation-0"
          hide-default-footer
          dense
        />
      </v-container>
    </v-row>
  </v-container>
</template>
<script>
import { Vue, Component, Prop, PropSync } from 'nuxt-property-decorator'
@Component({})
export default class ResultTable extends Vue {
  @PropSync('page', { type: Number, default: 0 })
  syncPage

  @PropSync('selected', { type: Object, default: () => {} })
  syncSelected

  @Prop({ type: Object, default: {} })
  result

  @Prop({ type: Number, default: 0 })
  perPage

  @Prop({ type: Boolean, default: false })
  loading

  get numPages () {
    return this.result.total ? Math.ceil(this.result.total / this.perPage) : 0
  }

  get header () {
    return this.selectedColumnOptions.filter((x) => { return x.show })
  }

  get items () {
    if (this.result.items) {
      const keys = Object.keys(this.result.items[0])
      return this.result.items.map((obj) => {
        keys.forEach((key) => {
          if (typeof obj[key] === 'number' && !Number.isInteger(obj[key])) {
            obj[key] = obj[key].toFixed(3)
          }
        })
        obj.radec = obj.meanra && obj.meandec
          ? `${obj.meanra},\t ${obj.meandec}`
          : ''
        return obj
      })
    }
    return []
  }

  onRowClicked (item) {
    this.syncSelected = item
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
      text: 'Observations',
      show: true
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
      value: 'classxmatch',
      sortable: false,
      text: 'Crossmatch',
      show: true
    },
    {
      value: 'classearly',
      sortable: false,
      text: 'Stamp Classifier Class',
      show: true
    },
    {
      value: 'pclassearly',
      sortable: true,
      text: 'Stamp Classifier Probability',
      show: true
    },
    {
      value: 'classrf',
      sortable: false,
      text: 'Light Curve Classifier Class',
      show: true
    },
    {
      value: 'pclassrf',
      sortable: true,
      text: 'Light Curve Classifier Probability',
      show: true
    },
    {
      value: 'deltajd',
      text: 'DeltaMJD (days)',
      show: false
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
      value: 'first_magpsf_g',
      text: 'FirstMagG',
      show: false
    },
    {
      value: 'last_magpsf_g',
      text: 'LastMagG',
      show: false
    },
    {
      value: 'min_magpsf_g',
      text: 'MinG',
      sortable: true,
      show: false
    },
    {
      value: 'max_magpsf_g',
      text: 'MaxG',
      show: false
    },
    {
      value: 'mean_magpsf_g',
      text: 'MeanG',
      show: false
    },
    {
      value: 'median_magpsf_g',
      text: 'MedianG',
      show: false
    },
    {
      value: 'last_magpsf_r',
      text: 'LastMagR',
      show: false
    },
    {
      value: 'first_magpsf_r',
      text: 'FirstMagR',
      show: false
    },
    {
      value: 'min_magpsf_r',
      text: 'MinR',
      sortable: true,
      show: false
    },
    {
      value: 'max_magpsf_r',
      text: 'MaxR',
      show: false
    },
    {
      value: 'mean_magpsf_r',
      text: 'MeanR',
      show: false
    },
    {
      value: 'median_magpsf_r',
      text: 'MedianR',
      show: false
    }
  ]

  get message () {
    if (this.result) {
      return this.result.total
        ? `Found ${this.result.total.toLocaleString()} results`
        : 'No results found'
    } else {
      return 'Your results will appear here'
    }
  }
}
</script>
