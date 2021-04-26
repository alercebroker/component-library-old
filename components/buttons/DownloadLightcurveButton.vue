<template>
  <v-btn outlined small @click="downloadLightcurve">
    <v-icon left small>mdi-cloud-download</v-icon>Download
  </v-btn>
</template>
<script>
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import { download } from '../utils/DownloadData'
/**
 * Component used to download the passed detections and non detections.
 * Formatting is done by the component and file name is made using object id and date.
 */
@Component({})
export default class DownloadLightcurveButton extends Vue {
  /**
   * Object Id
   */
  @Prop({ type: String }) oid
  /**
   * Detections of the light curve
   */
  @Prop({ type: Array, default: () => [] }) detections
  /**
   * Non detections of the light curve
   */
  @Prop({ type: Array, default: () => [] }) nonDetections

  get isDownloable() {
    return this.lightcurve !== undefined && this.oid != null
  }

  downloadLightcurve() {
    download(this.oid, this.detections, this.nonDetections)
  }
}
</script>
