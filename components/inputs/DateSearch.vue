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
            v-model="displayedMinFirstGreg"
            label="Min first greg date"
            prepend-icon="mdi-calendar"
            readonly
            v-on="on"
          />
        </template>
        <v-card>
          <v-date-picker
            v-model="minFirstGreg"
            scrollable
            first-day-of-week="1"
            :allowed-dates="minDates"
          />
          <v-time-picker v-model="minFirstTime" format="24hr" />
          <v-card-actions>
            <v-spacer />
            <v-btn text color="error" @click="clearMin">
              Clear
            </v-btn>
            <v-btn text color="primary" @click="saveMin">
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-menu>
    </v-flex>

    <v-flex xs6 pr-3>
      <v-text-field
        v-model="localValue.maxMjd"
        label="Max MJD"
        min="0"
        type="number"
        step="0.01"
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
            v-model="displayedMaxFirstGreg"
            label="Max first greg date"
            prepend-icon="mdi-calendar"
            readonly
            v-on="on"
          />
        </template>
        <v-card>
          <v-date-picker
            v-model="maxFirstGreg"
            scrollable
            actions
            first-day-of-week="1"
            :allowed-dates="maxDates"
          />
          <v-time-picker v-model="maxFirstTime" format="24hr" />
          <v-card-actions>
            <v-spacer />
            <v-btn text color="primary" @click="clearMax">
              Clear
            </v-btn>
            <v-btn text color="primary" @click="saveMax">
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-menu>
    </v-flex>
  </v-layout>
</template>
<script>
import { Vue, Component, Watch, Prop } from 'nuxt-property-decorator'
import { jdToDate, gregorianToJd } from '../utils/AstroDates'
@Component({})
export default class DateSearch extends Vue {
  @Prop({ type: Object, required: true }) value

  menuMin = false
  menuMax = false

  minGregDate = null
  maxGregDate = null
  minFirstTime = '00:00'
  maxFirstTime = '00:00'

  displayedMinFirstGreg = null
  displayedMaxFirstGreg = null

  localValue = {
    minMjd: null,
    maxMjd: null,
  }

  get maxMjd() {
    return this.value.maxMjd
  }

  set maxMjd(val) {
    this.$emit('input', { ...this.value, maxMjd: val })
  }

  minDates(val) {
    if (this.maxFirstGreg != null) {
      return val <= this.maxFirstGreg
    } else {
      return val
    }
  }

  maxDates(val) {
    if (this.minFirstGreg != null) {
      return val >= this.minFirstGreg
    } else {
      return val
    }
  }

  clearMin() {
    this.minFirstGreg = null
    this.minFirstTime = '00:00'
  }

  clearMax() {
    this.maxFirstGreg = null
    this.maxFirstTime = '00:00'
  }

  saveMin() {
    const stringDateTime = `${this.minFirstGreg} ${this.minFirstTime}`
    const dateTime = new Date(stringDateTime)
    this.minMjd = gregorianToJd(dateTime)
    this.displayedMinFirstGreg = stringDateTime
    this.menuMin = false
  }

  saveMax() {
    const stringDateTime = `${this.maxFirstGreg} ${this.maxFirstTime}`
    const dateTime = new Date(stringDateTime)
    this.maxMjd = gregorianToJd(dateTime)
    this.displayedMaxFirstGreg = stringDateTime
    this.menuMax = false
  }

  @Watch('value', { immediate: true, deep: true })
  onValueChange(val) {
    if (val.minMjd != null) {
      this.displayedMinFirstGreg = jdToDate(val.minMjd)
        .toString()
        .split(' GMT')[0]
    }
    if (val.maxMjd != null) {
      this.displayedMaxFirstGreg = jdToDate(val.maxMjd)
        .toString()
        .split(' GMT')[0]
    }
    this.localValue = { ...this.localValue, ...val }
  }

  @Watch('localValue', { immediate: true, deep: true })
  onLocalValueChange(val) {
    this.$emit('input', val)
  }

  get minFirstGreg() {
    if (!this.minGregDate) {
      return null
    }
    const year = this.minGregDate.getUTCFullYear()
    let month = this.minGregDate.getUTCMonth()
    const day = this.minGregDate.getUTCDate()
    if (month + 1 < 10) {
      month = '0' + (Number(month) + 1)
    } else {
      month = month + 1
    }
    return year + '-' + month + '-' + day
  }

  set minFirstGreg(value) {
    let date = null
    if (value) {
      const [year, month, day] = value.split('-')
      const [hour, mins] = this.minFirstTime
        ? this.minFirstTime.split(':')
        : [null, null]
      date = new Date(Date.UTC(year, month - 1, day, hour, mins))
    }
    this.minGregDate = date ? new Date(date.getTime()) : null
  }

  get maxFirstGreg() {
    if (!this.maxGregDate) {
      return null
    }
    const year = this.maxGregDate.getUTCFullYear()
    let month = this.maxGregDate.getUTCMonth()
    const day = this.maxGregDate.getUTCDate()
    if (month + 1 < 10) {
      month = '0' + (Number(month) + 1)
    } else {
      month = month + 1
    }
    return year + '-' + month + '-' + day
  }

  set maxFirstGreg(value) {
    let date = null
    if (value) {
      const [year, month, day] = value.split('-')
      const [hour, mins] = this.maxFirstTime
        ? this.maxFirstTime.split(':')
        : [null, null]
      date = new Date(Date.UTC(year, month - 1, day, hour, mins))
    }
    this.maxGregDate = date
  }
}
</script>
