<template>
  <div>
    <v-bottom-sheet v-model="sheet" inset>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          outlined
          small
          :disabled="datarelease.length == 0"
          :loading="loading"
          v-bind="attrs"
          v-on="on"
          @click="checkFirstTime"
        >
          <v-icon left small>mdi-eye</v-icon>Display DR
        </v-btn>
      </template>

      <v-sheet class="text-center">
        <v-card>
          <v-toolbar dark> Select elements to display of ZTF DR5 </v-toolbar>
          <v-card-text>
            <v-data-table
              v-model="selected"
              dense
              show-select
              multi-sort
              hide-default-footer
              item-key="_id"
              :sort-by="['filterid', 'nepochs']"
              :sort-desc="[false, true]"
              :headers="headers"
              :items="datarelease"
            />
          </v-card-text>
          <v-card-actions class="justify-end">
            <v-btn text @click="sheet = false">Close</v-btn>
          </v-card-actions>
        </v-card>
      </v-sheet>
    </v-bottom-sheet>
  </div>
</template>
<script>
import { Vue, Component, Prop, Watch } from 'nuxt-property-decorator'
/**
 * Component used to download the passed detections and non detections.
 * Formatting is done by the component and file name is made using object id and date.
 */
@Component({})
export default class DisplayDataRelease extends Vue {
  @Prop({ type: Array, required: true }) value
  /**
   * Detections of the light curve
   */
  @Prop({ type: Array, default: () => [] }) datarelease

  /**
   *
   */
  @Prop({ type: Boolean, default: () => [] }) loading

  /**
   *
   */
  @Prop({ type: String, default: 'difference' }) plot

  firstTime = true

  selected = []

  sheet = false

  headers = [
    {
      text: 'objectid',
      value: '_id',
      align: 'center',
    },
    {
      text: 'filterid',
      value: 'filterid',
      align: 'center',
    },
    {
      text: 'nepochs',
      value: 'nepochs',
      align: 'center',
    },
    {
      text: 'fieldid',
      value: 'fieldid',
      align: 'center',
    },
    {
      text: 'rcid',
      value: 'rcid',
      align: 'center',
    },
  ]

  parseObject(objectLightCurve) {
    const drMjd = objectLightCurve.hmjd
    const drMag = objectLightCurve.mag
    const drMagError = objectLightCurve.magerr
    const drFid = 100 + objectLightCurve.filterid
    const drField = objectLightCurve.fieldid
    const drId = objectLightCurve._id
    return drMjd.map((mjd, index) => {
      return {
        mjd,
        magpsf_corr: drMag[index],
        sigmapsf_corr_ext: drMagError[index],
        fid: drFid,
        field: drField,
        objectid: drId,
        corrected: true,
      }
    })
  }

  parseLightCurve(lightcurves) {
    const lcs = lightcurves.map((x) => this.parseObject(x))
    return lcs.flat(1)
  }

  checkFirstTime() {
    if (this.firstTime) {
      this.firstTime = false
      this.selected = this.datarelease
    }

    if (this.plot === 'difference') {
      this.$emit('update-plot', 'apparent')
    }
  }

  @Watch('selected')
  onSelected(val) {
    const parsed = this.parseLightCurve(val)
    this.$emit('input', parsed)
  }
}
</script>
