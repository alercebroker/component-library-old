<template>
  <v-btn outlined small @click="downloadLightcurve">
    <v-icon left small>mdi-cloud-download</v-icon>Download
  </v-btn>
</template>
<script>
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import { download } from '../utils/DownloadData'
@Component({})
export default class DownloadLightcurveButton extends Vue {
  @Prop({ type: String }) oid
  @Prop({ type: Array, default: () => [] }) detections
  @Prop({ type: Array, default: () => [] }) nonDetections

  get isDownloable() {
    return this.lightcurve !== undefined && this.oid != null
  }

  downloadLightcurve() {
    download(this.oid, this.detections, this.nonDetections)
  }
}
</script>
