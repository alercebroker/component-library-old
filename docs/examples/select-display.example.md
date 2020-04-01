```vue
<template>
  <select-display :options="options">
    <light-curve-plot
      slot="difference"
      :detections="detections"
      :nonDetections="nonDetections"
      type="difference"
    >
    </light-curve-plot>
    <light-curve-plot 
      slot="apparent" 
      :detections="detections" 
      type="apparent">
    </light-curve-plot>
    <light-curve-plot
      slot="folded"
      :detections="detections"
      :period="period"
      type="folded"
    >
    </light-curve-plot>
  </select-display>
</template>
<script>
import axios from "axios";
export default {
  data(){
    return {
      detections: [],
      nonDetections: [],
      period: null,
      oid: "ZTF20aaophpu",
      options: [
        { text: "Difference Magnitude", value: "difference" },
        { text: "Apparent Magnitude", value: "apparent" },
        { text: "Folded", value: "folded"}
      ]
    }
  },
  mounted(){
    axios
    .post("https://ztf.alerce.online/get_detections", { oid: this.oid })
    .then(response => {
      this.detections = response.data.result.detections;
    });
    axios
    .post("https://ztf.alerce.online/get_non_detections", { oid: this.oid })
    .then(response => {
      this.nonDetections = response.data.result.non_detections;
    });
    axios
    .post("https://ztf.alerce.online/get_period", {oid: this.oid})
    .then(response => {
      this.period = response.data.result.period;
    })
  }
}
</script>
```