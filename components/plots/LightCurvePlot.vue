<template>
  <div>
    <v-chart :options="scatter" autoresize @click="onClick" />
  </div>
</template>

<script>
import { Vue, Component, Prop, Watch } from 'nuxt-property-decorator'
import { jdToDate } from '../utils/AstroDates.js'

@Component
export default class LightCurvePlot extends Vue {
  @Prop({ type: Array, default: () => [] }) detections;
  @Prop({ type: Array, default: () => [] }) nonDetections;
  @Prop({ type: Number, default: 0 }) period;
  @Prop({ type: String }) type;

  showHelp = false;
  scatter = {};

  mounted () {
    this.generateOptions()
  }

  onClick (detection) {
    const date =
      jdToDate(detection.value[0])
        .toUTCString()
        .slice(0, -3) + 'UT'
    const payload = {
      mjd: detection.value[0],
      date,
      index: this.detections.findIndex(x => x.mjd === detection.value[0])
    }
    this.$emit('detectionClick', payload)
  }

  generateOptions () {
    import('./plot-types/' + this.type + '.js')
      .then((imported) => {
        const data = {
          detections: this.detections,
          nonDetections: this.nonDetections,
          period: this.period
        }
        this.scatter = imported.default(data)
      })
      .catch((error) => {
        console.error('ERROR', error)
      })
  }

  @Watch('type')
  onTypeChange (newType) {
    this.generateOptions()
  }

  @Watch('detections')
  onDetectionsChange (newDetections) {
    this.generateOptions()
  }

  @Watch('nonDetections')
  onNonDetectionsChange (newNonDetections) {
    this.generateOptions()
  }
}
</script>

<style css>
.echarts {
  margin: auto;
  width: 100%;
  height: 100%;
  min-height: 350px;
}
</style>
