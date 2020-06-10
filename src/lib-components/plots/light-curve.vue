<template>
    <div class="ec">
      <div class="vue-echarts" ref="plot"></div>
    </div>
</template>

<style scoped>
.vue-echarts {
  min-height: 100px;
  min-width: 100px;
}

.ec {
  width: 90vw;
  height: 80vh;
}
</style>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';

import * as echarts from 'echarts';
import ECharts = echarts.ECharts;
import EChartOption = echarts.EChartOption;


declare global { interface Window { attachEvent(type: string, callback: any): void; detachEvent(type: string, callback: any): void; } }

interface Detection {
  mjd: number;
  magnitude: number;
  upper_error: number;
  lower_error: number;
}

interface EchartsInitOption {
  devicePixelRatio?: number;
  renderer?: string;
  width?: number | string;
  height?: number | string;
}

@Component
export default class LightCurve extends Vue {
  private echartsInstance!: ECharts;
  private ei!: ECharts;
  private option = {
      xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
          type: 'value'
      },
      series: [{
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line'
      }]
  };
  private theme?: string;
  private initOption?: EchartsInitOption;
  @Prop({default: []}) detections!: any[];
  @Prop({default: []}) nonDetections!: any[];


  @Watch("option", { deep: true })
  optionChanged(v: EChartOption, oldV: EChartOption) {
    this.renderEcharts();
  }
  resizeEventHandler(): void {
    this.echartsInstance.resize();
  }
  Init() {
    if (this.option) {
      this.echartsInstance = echarts.init(
        this.$refs.plot as HTMLDivElement,
        this.theme,
        this.initOption
      );
      this.$emit("update:ei", this.echartsInstance);
      if (window.addEventListener) {
        window.addEventListener("resize", this.resizeEventHandler, false);
      } else if (window.attachEvent) {
        const that = this;
        window.attachEvent("resize", that.resizeEventHandler);
      }
    }
  }

  renderEcharts() {
    if (this.option && this.echartsInstance) {
      this.echartsInstance.setOption(this.option);
      this.$emit("instance", this.echartsInstance);
    }
  }

  mounted() {
    this.Init();
    this.renderEcharts();
  }
}
</script>