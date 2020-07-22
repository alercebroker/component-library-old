<template>
  <div>
    <v-chart :options="polar" autoresize />
  </div>
</template>

<script>
import { Vue, Component, Prop } from 'nuxt-property-decorator'
@Component
export default class RadarPlot extends Vue {
  @Prop({ type: Array, default: () => [] })
  data

  @Prop({ type: String, default: '' })
  title

  @Prop({ type: String, default: 'polygon' })
  shape

  @Prop({ type: Boolean, default: false })
  tooltip

  @Prop({ type: Boolean, default: false })
  legend

  @Prop({ type: Number, default: 3 })
  splitNumber

  @Prop({ type: String, default: 'red' })
  filled

  mounted() {
    console.log(this.data)
  }

  get polar () {
    return {
      title: {
        text: this.title
      },
      tooltip: {
      },
      legend: {
        data: [this.title],
        show: this.legend
      },
      radar: {
        shape: this.shape,
        splitNumber: this.splitNumber,
        backgroundColor: this.filled,
        name: {
          textStyle: {
            color: '#fff',
            backgroundColor: '#999',
            borderRadius: 3,
            padding: [3, 5]
          }
        },
        indicator: this.formatIndicator(this.data)
      },
      series: [{
        name: 'Probabilities (Score)',
        type: 'radar',
        areaStyle: {},
        data: [
          this.formatData(this.data)
        ]
      }]
    }
  }

  formatData (probs) {
    return {
      value: probs.map(k => k.value),
    }
  }

  formatIndicator (probs) {
    const indicator = probs.map((k) => { return { name: k.name, max: 1 } })
    const maxVal = Math.max.apply(Math, probs.map((k) => k.value))
    return indicator.map((x) => { x.max = maxVal; return x })
  }
}
</script>

<style scoped>
.echarts {
  width: 100%;
  height: 100%;
  min-height: 250px;
  min-width: 250px;
}
</style>
