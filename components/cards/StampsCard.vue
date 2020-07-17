<template>
  <v-card flat>
    <v-toolbar dense flat>
      <v-row align="center">
        <v-col cols="3">
          <v-toolbar-title>Stamps</v-toolbar-title>
        </v-col>
        <v-col cols="5" class="mt-4">
          <v-select
            :items="dates"
            item-value="index"
            item-text="date"
            data-test="dateSelect"
            :value="stateSelectedDetection"
            @change="onDateSelected"
          ></v-select>
        </v-col>
        <v-col cols="2">
          <v-icon @click="prevStamp" data-test="prevIcon">mdi-arrow-left-drop-circle</v-icon>
          <v-icon @click="nextStamp" data-test="nextIcon">mdi-arrow-right-drop-circle</v-icon>
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="1" v-if="hasFullscreenListener">
          <v-icon @click="fullscreen">{{fullscreenIcon}}</v-icon>
        </v-col>
        <v-col cols="1">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-icon v-on="on">mdi-information</v-icon>
            </template>
            <span>Use the tool icons below to change between zoom or crosshair modes</span>
          </v-tooltip>
        </v-col>
      </v-row>
    </v-toolbar>
    <v-divider></v-divider>
    <v-card-text>
      <v-row justify="center">
        <v-col cols="4" class="text-center">
          <h5>
            Science
            <v-btn x-small outlined color="primary" :href="download('science')">
              <v-icon left small>mdi-cloud-download</v-icon>Download
            </v-btn>
          </h5>
        </v-col>
        <v-col cols="4" class="text-center">
          <h5>
            Template
            <v-btn x-small outlined color="primary" :href="download('template')">
              <v-icon left small>mdi-cloud-download</v-icon>Download
            </v-btn>
          </h5>
        </v-col>
        <v-col cols="4" class="text-center">
          <h5>
            Difference
            <v-btn x-small outlined color="primary" :href="download('difference')">
              <v-icon left small>mdi-cloud-download</v-icon>Download
            </v-btn>
          </h5>
        </v-col>
      </v-row>
      <v-row class="pa-0">
        <v-col cols="12" v-if="stampComponent === 'zoom'">
          <zoom-on-hover :images="[science,template,difference]" :disabled="isFullscreen"></zoom-on-hover>
        </v-col>
        <v-col cols="12" v-if="stampComponent === 'crosshair'">
          <crosshair :images="[science, template, difference]" :fullscreen="isFullscreen"></crosshair>
        </v-col>
      </v-row>
      <v-row align="start" style="max-height:20px" class="pa-0" justify="center">
        <v-col v-for="tool in tools" :key="tool.id" style="max-height:20px" cols="1" class="pa-0">
          <slot :name="'btn-'+tool.id" :tool="tool" :selectTool="selectTool">
            <v-icon @click="selectTool(tool.id)">{{tool.icon}}</v-icon>
          </slot>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
<script>
import { Vue, Component, Prop, Watch } from 'nuxt-property-decorator'
import { jdToDate } from '../utils/AstroDates.js'
@Component({})
export default class StampCards extends Vue {
  @Prop({ type: Array, default: () => [] })
  detections

  @Prop({ type: String, default: '' })
  object

  @Prop({ type: Number, default: 0 })
  selectedDetection

  @Prop({
    type: Array,
    default: () => [
      {
        id: 'zoom',
        text: 'Zoom',
        icon: 'mdi-magnify-plus'
      },
      {
        id: 'crosshair',
        text: 'Crosshair',
        icon: 'mdi-crosshairs'
      }
    ]
  })
  tools

  isFullscreen = false
  stampComponent = 'crosshair'
  stateSelectedDetection = this.selectedDetection

  created () {
    this.stateSelectedDetection = this.selectedDetection
  }

  prevStamp () {
    if (this.stateSelectedDetection > 0) {
      this.stateSelectedDetection -= 1
      /**
       * Event triggered when a detection is selected
       * @arg {number} index of the selected detection
       */
      this.$emit('selectDetection', this.selectedDetection - 1)
    }
  }

  nextStamp () {
    if (this.stateSelectedDetection + 1 < this.detections.length) {
      this.stateSelectedDetection += 1
      /**
       * Event triggered when a detection is selected
       * @arg {number} index of the selected detection
       */
      this.$emit('selectDetection', this.selectedDetection + 1)
    }
  }

  getCandid (index) {
    if (this.detections && this.detections.length) {
      return this.detections[index].candid_str
    } else {
      return ''
    }
  }

  download (type) {
    const link =
      'http://avro.alerce.online/get_stamp?oid=' +
      this.object +
      '&candid=' +
      this.getCandid(this.selectedDetection) +
      '&type=' +
      type +
      '&format=fits'
    return link
  }

  fullscreen () {
    this.$emit('fullscreen')
  }

  selectTool (id) {
    this.stampComponent = id
  }

  onDateSelected (date) {
    this.stateSelectedDetection = date
    /**
     * Event triggered when a detection is selected
     * @arg {number} index of the selected detection
     */
    this.$emit('selectDetection', date)
  }

  getScienceURL (object, candid) {
    return (
      'https://avro.alerce.online/get_stamp?oid=' +
      object +
      '&candid=' +
      candid +
      '&type=science&format=png'
    )
  }

  getTemplateURL (object, candid) {
    return (
      'https://avro.alerce.online/get_stamp?oid=' +
      object +
      '&candid=' +
      candid +
      '&type=template&format=png'
    )
  }

  getDifferenceURL (object, candid) {
    return (
      'https://avro.alerce.online/get_stamp?oid=' +
      object +
      '&candid=' +
      candid +
      '&type=difference&format=png'
    )
  }

  get dates () {
    if (this.detections) {
      return this.detections.map((x, i) => {
        return {
          date:
            jdToDate(x.mjd)
              .toUTCString()
              .slice(0, -3) + 'UT',
          index: i
        }
      })
    }
    return []
  }

  get science () {
    return this.getScienceURL(
      this.object,
      this.getCandid(this.stateSelectedDetection)
    )
  }

  get difference () {
    return this.getDifferenceURL(
      this.object,
      this.getCandid(this.stateSelectedDetection)
    )
  }

  get template () {
    return this.getTemplateURL(
      this.object,
      this.getCandid(this.stateSelectedDetection)
    )
  }

  get fullscreenIcon () {
    return this.isFullscreen ? 'mdi-fullscreen-exit' : 'mdi-fullscreen'
  }

  get hasFullscreenListener () {
    return this.$listeners && this.$listeners.fullscreen
  }

  @Watch('selectedDetection')
  onSelectedDetection (newVal) {
    this.stateSelectedDetection = newVal
  }
}
</script>
