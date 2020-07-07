<template>
    <div>
        <echarts :options="polar" autoresize></echarts>
    </div>
</template>

<script>
import Echarts from "vue-echarts";
import "echarts/lib/chart/radar";
import "echarts/lib/component/toolbox";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/legend";
import "echarts/lib/component/dataZoom";
import "echarts/lib/chart/custom";
export default {
    props: {
        probabilities: {
            type: Object,
            default: {}
        },
        title: {
            type: String,
            default: ""
        },
        shape: {
            type: String,
            default: "polygon"
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
            default: "red"
        }
    },
    components: {
        Echarts
    },
    data() {
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
                    indicator: this.formatIndicator(this.probabilities),
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
        formatData(probs) {
            return {
                value: Object.keys(probs).map( k => probs[k]),
                name: "Probabilities (score)"
            }
        },
        formatIndicator(probs) {
            let indicator = Object.keys(probs).map( (k) => {  return {name: k, max: 1} });
            var max_val = Math.max.apply(Math, Object.keys(probs).map( k => probs[k]));
            return indicator.map( x => { x.max = max_val; return x})

        },
    }
};
</script>

<style scoped>
.echarts {
  width: 100%;
  height: 100%;
  min-height: 250px;
  margin-top: 15px;
}
</style>