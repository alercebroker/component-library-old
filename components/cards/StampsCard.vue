<template>
  <v-card flat>
    <v-toolbar flat>
      <v-row align="center">
        <v-col cols="6" class="mt-4">
          <v-select
            dense
            label="date"
            :items="dates"
            item-value="index"
            item-text="date"
            data-test="dateSelect"
            :value="stateSelectedDetection"
            @change="onDateSelected"
          ></v-select>
        </v-col>
        <v-col cols="3">
          <v-icon data-test="prevIcon" @click="prevStamp"
            >mdi-arrow-left-drop-circle</v-icon
          >
          <v-icon data-test="nextIcon" @click="nextStamp"
            >mdi-arrow-right-drop-circle</v-icon
          >
        </v-col>
        <v-col cols="1">
          <v-btn small rounded color="indigo" @click="onAvroClick">AVRO</v-btn>
        </v-col>
        <v-spacer></v-spacer>
        <v-col v-if="hasFullscreenListener" cols="1">
          <v-icon @click="fullscreen">{{ fullscreenIcon }}</v-icon>
        </v-col>
        <v-col cols="1">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-icon v-on="on">mdi-information</v-icon>
            </template>
            <span
              >Use the tool icons below to change between zoom or crosshair
              modes</span
            >
          </v-tooltip>
        </v-col>
      </v-row>
    </v-toolbar>
    <v-divider></v-divider>
    <v-card-text>
      <v-row justify="center">
        <v-col cols="4" class="py-0 text-center">
          <h5>
            Science
            <v-btn x-small outlined color="primary" :href="download('science')">
              <v-icon left small>mdi-cloud-download</v-icon>Download
            </v-btn>
          </h5>
        </v-col>
        <v-col cols="4" class="py-0 text-center">
          <h5>
            Template
            <v-btn
              x-small
              outlined
              color="primary"
              :href="download('template')"
            >
              <v-icon left small>mdi-cloud-download</v-icon>Download
            </v-btn>
          </h5>
        </v-col>
        <v-col cols="4" class="py-0 text-center">
          <h5>
            Difference
            <v-btn
              x-small
              outlined
              color="primary"
              :href="download('difference')"
            >
              <v-icon left small>mdi-cloud-download</v-icon>Download
            </v-btn>
          </h5>
        </v-col>
      </v-row>
      <v-row class="pa-0">
        <v-col v-if="stampComponent === 'zoom'" cols="12">
          <alerce-zoom-on-hover
            :images="[science, template, difference]"
            :disabled="isFullscreen"
          ></alerce-zoom-on-hover>
        </v-col>
        <v-col v-if="stampComponent === 'crosshair'" cols="12">
          <alerce-crosshair
            :images="[science, template, difference]"
            :fullscreen="isFullscreen"
            :cross-hair-space="crossHairSpace"
          ></alerce-crosshair>
        </v-col>
      </v-row>
      <v-row
        align="start"
        style="max-height: 20px"
        class="pa-0"
        justify="center"
      >
        <v-col
          v-for="tool in tools"
          :key="tool.id"
          style="max-height: 20px"
          cols="1"
          class="pa-0"
        >
          <slot :name="'btn-' + tool.id" :tool="tool" :selectTool="selectTool">
            <v-icon @click="selectTool(tool.id)">{{ tool.icon }}</v-icon>
          </slot>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
<script>
import {
  Vue,
  Component,
  Prop,
  Watch,
  Emit,
  Model,
} from 'nuxt-property-decorator'
import { jdToDate } from '../utils/AstroDates.js'
@Component
export default class StampCard extends Vue {
  @Prop({ type: Array, default: () => [] }) detections

  @Prop({ type: String, default: '' }) object

  @Model('selectDetection', { type: Number, default: 0 }) selectedDetection

  @Prop({
    type: Array,
    default: () => [
      {
        id: 'zoom',
        text: 'Zoom',
        icon: 'mdi-magnify-plus',
      },
      {
        id: 'crosshair',
        text: 'Crosshair',
        icon: 'mdi-crosshairs',
      },
    ],
  })
  tools

  @Prop({ type: Number }) crossHairSpace

  isFullscreen = false
  stampComponent = 'crosshair'
  stateSelectedDetection = null

  created() {
    this.stateSelectedDetection = this.selectedDetection
  }

  @Emit('selectDetection')
  prevStamp() {
    if (this.stateSelectedDetection > 0) {
      /**
       * Event triggered when a detection is selected
       * @arg {number} index of the selected detection
       */
      this.stateSelectedDetection -= 1
    }
    return this.stateSelectedDetection
  }

  @Emit('selectDetection')
  nextStamp() {
    if (this.stateSelectedDetection + 1 < this.detections.length) {
      /**
       * Event triggered when a detection is selected
       * @arg {number} index of the selected detection
       */
      this.stateSelectedDetection += 1
    }
    return this.stateSelectedDetection
  }

  getCandid(index) {
    if (this.detections && this.detections.length) {
      return this.detections[index].candid
    } else {
      return ''
    }
  }

  download(type) {
    const link =
      'http://avro.alerce.online/get_stamp?oid=' +
      this.object +
      '&candid=' +
      this.getCandid(this.stateSelectedDetection) +
      '&type=' +
      type +
      '&format=fits'
    return link
  }

  fullscreen() {
    this.$emit('fullscreen')
  }

  selectTool(id) {
    this.stampComponent = id
  }

  @Emit('selectDetection')
  onDateSelected(date) {
    /**
     * Event triggered when a detection is selected
     * @arg {number} index of the selected detection
     */
    this.stateSelectedDetection = date
    return date
  }

  getScienceURL(object, candid) {
    if (!candid) {
      return 'https://via.placeholder.com/300'
    }
    return (
      'https://avro.alerce.online/get_stamp?oid=' +
      object +
      '&candid=' +
      candid +
      '&type=science&format=png'
    )
  }

  getTemplateURL(object, candid) {
    if (!candid) {
      return 'https://via.placeholder.com/300'
    }
    return (
      'https://avro.alerce.online/get_stamp?oid=' +
      object +
      '&candid=' +
      candid +
      '&type=template&format=png'
    )
  }

  getDifferenceURL(object, candid) {
    if (!candid) {
      return 'https://via.placeholder.com/300'
    }
    return (
      'https://avro.alerce.online/get_stamp?oid=' +
      object +
      '&candid=' +
      candid +
      '&type=difference&format=png'
    )
  }

  get dates() {
    if (this.detections) {
      return this.detections.map((x, i) => {
        return {
          date: jdToDate(x.mjd).toUTCString().slice(0, -3) + 'UT',
          index: i,
        }
      })
    }
    return []
  }

  get science() {
    return this.getScienceURL(
      this.object,
      this.getCandid(this.stateSelectedDetection)
    )
  }

  get difference() {
    return this.getDifferenceURL(
      this.object,
      this.getCandid(this.stateSelectedDetection)
    )
  }

  get template() {
    return this.getTemplateURL(
      this.object,
      this.getCandid(this.stateSelectedDetection)
    )
  }

  get fullscreenIcon() {
    return this.isFullscreen ? 'mdi-fullscreen-exit' : 'mdi-fullscreen'
  }

  get hasFullscreenListener() {
    return this.$listeners && this.$listeners.fullscreen
  }

  @Watch('selectedDetection')
  onSelectedDetection(newVal) {
    this.stateSelectedDetection = newVal
  }

  @Emit('avroClick')
  onAvroClick(event) {
    return this.selectedDetection
  }
}
</script>
