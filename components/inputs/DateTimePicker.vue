<template>
  <v-card>
    <v-card-text class="px-0 py-0">
      <v-tabs v-model="activeTab" fixed-tabs>
        <v-tab key="calendar">
          <slot name="dateIcon">
            <v-icon>mdi-calendar</v-icon>
          </slot>
        </v-tab>
        <v-tab key="timer">
          <slot name="timeIcon">
            <v-icon>mdi-clock</v-icon>
          </slot>
        </v-tab>
        <v-tab-item key="calendar">
          <v-date-picker
            v-model="date"
            v-bind="datePickerProps"
            :show-current="false"
          ></v-date-picker>
        </v-tab-item>
        <v-tab-item key="timer">
          <v-time-picker
            v-model="time"
            v-bind="timePickerProps"
          ></v-time-picker>
        </v-tab-item>
      </v-tabs>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <slot name="actions" :parent="this">
        <v-btn color="grey lighten-1" text @click.native="clearHandler">
          {{ clearText }}
        </v-btn>
        <v-btn color="green darken-1" text @click="okHandler">
          {{ okText }}
        </v-btn>
      </slot>
    </v-card-actions>
  </v-card>
</template>

<script>
import {
  Vue,
  Component,
  Prop,
  Model,
  Watch,
  PropSync,
} from 'nuxt-property-decorator'
import moment from 'moment'
@Component
export default class DateTimePicker extends Vue {
  @Prop({ type: String, default: 'Clear' }) clearText
  @Prop({ type: String, default: 'Save' }) okText
  @Prop({ type: Object, default: () => {} }) datePickerProps
  @Prop({ type: Object, default: () => {} }) timePickerProps
  @PropSync('open', { type: Boolean, default: false }) openSync
  @Model('datetime-changed', { type: Date || null }) datetime

  date = null
  time = null
  localDatetime = null
  activeTab = null

  extractDate(datetime) {
    if (!datetime) return null
    return moment.utc(datetime).format('YYYY-MM-DD')
  }

  extractTime(datetime) {
    if (!datetime) return null
    return moment.utc(datetime).format('HH:mm')
  }

  convertToDate(date, time) {
    let strDate = date + '-' + time
    if (date && !time) {
      strDate = date + '-' + '00:00'
    }
    if (!date) {
      return null
    }
    return moment.utc(strDate, 'YYYY-MM-DD-HH:mm').toDate()
  }

  @Watch('datetime', { immediate: true })
  onDatetimeChange(val, oldVal) {
    this.date = this.extractDate(val)
    this.time = this.extractTime(val)
    this.localDatetime = this.datetime
  }

  @Watch('date')
  onDateChange(val) {
    this.localDatetime = this.convertToDate(val, this.time)
  }

  @Watch('time')
  onTimeChange(val) {
    this.localDatetime = this.convertToDate(this.date, val)
  }

  @Watch('localDatetime')
  onLocalDatetimeChange(val) {
    this.$emit('datetime-changed', val)
  }

  okHandler() {
    this.openSync = false
  }

  clearHandler() {
    this.date = null
    this.time = null
    this.openSync = false
  }
}
</script>
