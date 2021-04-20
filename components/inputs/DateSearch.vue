<template>
  <v-layout wrap align-center>
    <!-- input for min modified julian dates-->
    <v-flex xs6 pr-3>
      <v-text-field
        v-model="localValue.minMjd"
        label="Min MJD"
        min="0"
        type="number"
        step="0.01"
        :error-messages="validationErrors.date"
      />
    </v-flex>
    <!-- calendar for min modified julian dates-->
    <v-flex xs6 pl-3>
      <v-menu
        v-model="menuMin"
        :close-on-content-click="false"
        transition="scale-transition"
        offset-y
        min-width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="minDateText"
            label="Min first greg date"
            prepend-icon="mdi-calendar"
            readonly
            v-on="on"
          />
        </template>
        <alerce-date-time-picker v-model="minDatetime" :open.sync="menuMin" />
      </v-menu>
    </v-flex>

    <v-flex xs6 pr-3>
      <v-text-field
        v-model="localValue.maxMjd"
        label="Max MJD"
        min="0"
        type="number"
        step="0.01"
        :error-messages="validationErrors.date"
      />
    </v-flex>

    <v-flex xs6 pl-3>
      <v-menu
        v-model="menuMax"
        :close-on-content-click="false"
        transition="scale-transition"
        offset-y
        min-width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="maxDateText"
            label="Max first greg date"
            prepend-icon="mdi-calendar"
            readonly
            v-on="on"
          />
        </template>
        <alerce-date-time-picker v-model="maxDatetime" :open.sync="menuMax" />
      </v-menu>
    </v-flex>
  </v-layout>
</template>
<script>
import moment from 'moment'
import { Vue, Component, Prop, Watch } from 'nuxt-property-decorator'
import { jdToDate, gregorianToJd } from '../utils/AstroDates'
@Component
export default class DateSearch extends Vue {
  @Prop({ type: Object, required: true }) value
  @Prop({ type: Object, default: () => {} }) validationErrors

  menuMin = false
  menuMax = false

  localValue = {
    minMjd: null,
    maxMjd: null,
  }

  minDatetime = null
  maxDatetime = null

  @Watch('value', { deep: true, immediate: true })
  onValueChange(val) {
    this.localValue.minMjd = val.minMjd
    this.localValue.maxMjd = val.maxMjd
  }

  @Watch('minDatetime')
  onMinDatetimeChange(val) {
    this.localValue.minMjd = gregorianToJd(val)
  }

  @Watch('maxDatetime')
  onNaxDatetimeChange(val) {
    this.localValue.maxMjd = gregorianToJd(val)
  }

  @Watch('localValue', { deep: true, immediate: true })
  onLocalValueChange(val) {
    const minDate = jdToDate(val.minMjd)
    const maxDate = jdToDate(val.maxMjd)
    this.minDatetime = this.getUTCDate(minDate)
    this.maxDatetime = this.getUTCDate(maxDate)
    this.$emit('input', val)
  }

  getUTCDate(date) {
    if (!date) return null
    const dateStr = date.toUTCString()
    return moment.utc(dateStr).toDate()
  }

  get minDateText() {
    if (!this.minDatetime) return null
    return moment.utc(this.minDatetime).format()
  }

  get maxDateText() {
    if (!this.maxDatetime) return null
    return moment.utc(this.maxDatetime).format()
  }
}
</script>
