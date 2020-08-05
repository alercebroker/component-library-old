<template>
  <v-btn @click="downloadLightcurve" outlined small>
    <v-icon left small>cloud_download</v-icon>Download
  </v-btn>
</template>
<script>
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import { download } from '../utils/DownloadData'
@Component({})
export default class DownloadLightcurveButton extends Vue {
  @Prop({ type: Object }) lightcurve
  @Prop({ type: String }) oid

  get isDownloable() {
    return this.lightcurve !== undefined && this.oid != null
  }

  downloadLightcurve() {
    download(this.oid, this.lightcurve)
  }
}
</script>
