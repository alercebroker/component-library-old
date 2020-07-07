<template>
  <div>
    <echarts :options="scatter" autoresize @click="onClick" />
  </div>
</template>

<script>
import { jdToDate } from "../utils/AstroDates.js";
import Echarts from "vue-echarts";
import "echarts/lib/chart/scatter";
import "echarts/lib/component/toolbox";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/legend";
import "echarts/lib/component/dataZoom";
import "echarts/lib/chart/custom";
/**
 * Component for light curve visualization
 * @displayName LightCurvePlot
 * @example ../../docs/examples/light-curve-plot.example.md
 */
export default {
  components: {
    Echarts
  },
  props: {
    /**
     * List of detections. Each detection should be an object containing at least
     * `mjd` and `candid_str`
     * Example detection object: [example](https://github.com/alercebroker/component-library/blob/master/tests/unit/detections.js)
     */
    detections: {
      type: Array,
      default: function() {
        return [];
      }
    },
    /**
     * List of Non Detections. Should contain mjd, fid and diffmaglim
     */
    nonDetections: {
      type: Array,
      default: function() {
        return [];
      }
    },
    /**
     * The period of the object. It is used only for folded light curve
     */
    period: {
      type: Number,
      default: null
    },
    /**
     * The type of plot you want to show
     * @values difference, apparent, folded
     */
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
    this.generateOptions();
  },
  methods: {
    onClick(detection) {
      let date =
        jdToDate(detection.value[0])
          .toUTCString()
          .slice(0, -3) + "UT";
      let payload = {
        mjd: detection.value[0],
        date: date,
        index: this.detections.findIndex(x => x.mjd == detection.value[0])
      }
      this.$emit("detectionClick", payload);
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
      this.generateOptions();
    },
    detections(newDetections) {
      this.generateOptions();
    },
    nonDetections(newNonDetections) {
      this.generateOptions();
    }
  }
};
</script>

<style css>
.echarts {
  margin: auto;
  width: 100%;
  height: 100%;
  min-height: 350px;
}
</style>