```vue
<template>
    <light-curve-plot
      :detections="detections"
      :nonDetections="nonDetections"
      type="difference">
    </light-curve-plot>
</template>
<script>

import axios from "axios";

export default {
  data() {
    return {
        detections: [],
        nonDetections: [],
        oid: "ZTF20aaophpu"
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
  }
}
</script>
```