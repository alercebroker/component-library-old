<template>
  <div>
    <v-chart :options="polar" autoresize />
  </div>
</template>

<script>
export default {
  props: {
    probabilities: {
      type: Function,
      default: () => { return {} }
    },
    title: {
      type: String,
      default: ''
    },
    shape: {
      type: String,
      default: 'polygon'
    },
    tooltip: {
      type: Boolean,
      default: false
    },
    legend: {
      type: Boolean,
      default: false
    },
    splitNumber: {
      type: Number,
      default: 3
    },
    filled: {
      type: String,
      default: 'red'
    }
  },
  data () {
    return {
      polar: {
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
          indicator: this.formatIndicator(this.probabilities)
        },
        series: [{
          name: 'Probabilities (Score)',
          type: 'radar',
          areaStyle: {},
          data: [
            this.formatData(this.probabilities)
          ]
        }]
      }
    }
  },
  methods: {
    formatData (probs) {
      return {
        value: Object.keys(probs).map(k => probs[k]),
        name: 'Probabilities (score)'
      }
    },
    formatIndicator (probs) {
      const indicator = Object.keys(probs).map((k) => { return { name: k, max: 1 } })
      const maxVal = Math.max.apply(Math, Object.keys(probs).map(k => probs[k]))
      return indicator.map((x) => { x.max = maxVal; return x })
    }
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
