<template>
  <div>
    <v-chart :options="scatter" autoresize @click="onClick" />
  </div>
</template>

<script>
import { jdToDate } from "./utils/AstroDates.js";
import Echarts from "vue-echarts";
import "echarts/lib/chart/scatter";
import "echarts/lib/component/toolbox";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/legend";
import "echarts/lib/component/dataZoom";
import "echarts/lib/chart/custom";
export default {
  name: "light-curve-plot",
  components: {
    "v-chart": Echarts
  },
  props: {
    detections: {
      type: Array,
      default: function() {
        return [];
      }
    },
    nonDetections: {
      type: Array,
      default: function() {
        return [];
      }
    },
    period: {
      type: Number,
      default: null
    },
    type: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      showHelp: false,
      scatter: {}
    };
  },
  mounted() {
    this.generateOptions()
  },
  methods: {
    onClick() {
      let date =
        jdToDate(detection.value[0])
          .toUTCString()
          .slice(0, -3) + "UT";
      this.$emit("detectionClick", date);
    },
    generateOptions() {
      let options = import("./plot-types/" + this.type + ".js")
        .then(imported => {
          let data = {
            detections: this.detections,
            nonDetections: this.nonDetections,
            period: this.period
          };
          this.scatter = imported.default(data);
        })
        .catch(error => {
          console.error("ERROR", error);
        });
    }
  },
  computed: {},
  watch: {
    type(newType) {
      this.generateOptions()
    }
  }
};
</script>

<style>
</style>