<script>
import Vue from "vue";
import { CardStamps } from "@/entry";
import { Celestial } from "@/entry";
import axios from 'axios';
export default Vue.extend({
  name: "ServeDev",
  components: {
    CardStamps,
    Celestial
  },
  data() {
    return {
      detections: [],
      oid: "ZTF20aaophpu",
      candidates: {
        "ZTF20aaophpu": {
          pclassearly:1,
          meanra:10,
          meandec:20
        }
      }
    };
  },
  mounted() {
    axios
      .post("https://ztf.alerce.online/get_detections", { oid: this.oid })
      .then(response => {
        this.detections = response.data.result.detections;
      });
  }
});
</script>

<template>
  <v-app id="app">
    <card-stamps :detections="detections" :object="oid"></card-stamps>
    <celestial :candidates="candidates"/>
  </v-app>
</template>
