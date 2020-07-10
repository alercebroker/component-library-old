<template>
  <div>
    <v-chart :options="chartOptions.options" autoresize @click="onClick" />
  </div>
</template>

<script>
import { Vue, Component, Prop, Watch, Emit } from 'nuxt-property-decorator'
import Echarts from 'vue-echarts'
import { jdToDate } from '../utils/AstroDates.js'
import { DifferenceLightCurveOptions } from './plot-types/difference'
import { ApparentLightCurveOptions } from './plot-types/apparent'
import { FoldedLightCurveOptions } from './plot-types/folded'
import { LightCurveOptions } from './plot-types/utils/light-curve-utils'
import 'echarts/lib/chart/scatter'
import 'echarts/lib/component/toolbox'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/dataZoom'
import 'echarts/lib/chart/custom'

@Component({
  components: {
    'v-chart': Echarts
  }
})
export default class LightCurvePlot extends Vue {
  @Prop({ type: Array, default: () => [] }) detections;
  @Prop({ type: Array, default: () => [] }) nonDetections;
  @Prop({ type: Number, default: 0 }) period;
  @Prop({ type: String }) type;

  showHelp = false;
  chartOptions = new LightCurveOptions();

  mounted () {
    this.generateOptions()
  }

  @Emit('detectionClick')
  onClick (detection) {
    const date =
      jdToDate(detection.value[0])
        .toUTCString()
        .slice(0, -3) + 'UT'
    return {
      mjd: detection.value[0],
      date,
      index: this.detections.findIndex(x => x.mjd === detection.value[0])
    }
  }

  generateOptions (type, detections, nonDetections, period) {
    if (type === 'difference') {
      const differenceLightCurveOptions = new DifferenceLightCurveOptions(detections, nonDetections)
      differenceLightCurveOptions.getSeries()
      differenceLightCurveOptions.getLegend()
      this.chartOptions = differenceLightCurveOptions
    }
    if (type === 'apparent') {
      const apparentLightCurveOptions = new ApparentLightCurveOptions(detections, nonDetections)
      apparentLightCurveOptions.getSeries()
      apparentLightCurveOptions.getLegend()
      this.chartOptions = apparentLightCurveOptions
    }
    if (type === 'folded') {
      const foldedLightCurveOptions = new FoldedLightCurveOptions(detections, nonDetections, period)
      foldedLightCurveOptions.getSeries()
      foldedLightCurveOptions.getLegend()
      this.chartOptions = foldedLightCurveOptions
    }
  }

  @Watch('type')
  onTypeChange (newType) {
    this.generateOptions(newType, this.detections, this.nonDetections, this.period)
  }

  @Watch('detections')
  onDetectionsChange (newDetections) {
    this.generateOptions(this.type, newDetections, this.nonDetections, this.period)
  }

  @Watch('nonDetections')
  onNonDetectionsChange (newNonDetections) {
    this.generateOptions(this.type, this.detections, newNonDetections, this.period)
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

