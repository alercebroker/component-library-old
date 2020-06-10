<script lang="ts">
import Vue from 'vue';
import axios from "@/utils/axios";
import { AlerceComponentsSample, LightCurve } from '@/entry';

export default Vue.extend({
  name: 'ServeDev',
    data() {
    return {
        detections: [],
        nonDetections: [],
        oid: "ZTF20aaophpu"
    }
  },
  components: {
    AlerceComponentsSample,
    LightCurve
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
});
</script>

<template>
  <div id="app">
    <alerce-components-sample />
    <light-curve :detections="detections" :nonDetections="nonDetections"/>
  </div>
</template>
