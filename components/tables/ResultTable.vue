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
        :items="items"
        :items-per-page="perPage"
        :loading="loading"
        class="elevation-0"
        hide-default-footer
        dense
        @click:row="onRowClicked"
      />
    </v-row>
  </v-container>
</template>
<script>
import { Vue, Component, Prop, PropSync, Emit } from 'nuxt-property-decorator'
@Component({})
export default class ResultTable extends Vue {
  @PropSync('page', { type: Number, default: 0 }) pageSync;

  @Prop('selected', { type: Object, default: () => {} }) selected;

  @Prop({ type: Array, default: () => [] }) items;

  @Prop({ type: Number, default: 1 }) perPage;

  @Prop({ type: Boolean, default: false }) loading;

  @Prop({ type: Number, default: 0 }) total;

  get numPages () {
    return this.total / this.perPage
  }

  get header () {
    return this.selectedColumnOptions.filter((x) => {
      return x.show
    })
  }

  // get tableItems() {
  //   if (this.items) {
  //     const keys = Object.keys(this.items[0])
  //     return this.items.map((obj) => {
  //       keys.forEach((key) => {
  //         if (typeof obj[key] === 'number' && !Number.isInteger(obj[key])) {
  //           obj[key] = obj[key].toFixed(3)
  //         }
  //       })
  //       obj.radec =
  //         obj.meanra && obj.meandec ? `${obj.meanra},\t ${obj.meandec}` : ''
  //       return obj
  //     })
  //   }
  //   return []
  // }

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
  ];

  get message () {
    return this.items.length
      ? `Found ${this.total.toLocaleString()} results`
      : 'No results found'
  }
}
</script>
