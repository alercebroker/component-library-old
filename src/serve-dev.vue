<script>
import Vue from "vue";
import { CardStamps } from "@/entry";
import axios from 'axios';
export default Vue.extend({
  name: "ServeDev",
  components: {
    CardStamps
  },
  data() {
    return {
      detections: [],
      oid: "ZTF20aaophpu"
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
  </v-app>
</template>
