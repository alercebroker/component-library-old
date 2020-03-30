<template>
  <v-app id="app">
    <v-container>
      <v-row justify="center">
        <v-col cols="6">
          <card-stamps :detections="detections" :object="oid" flat></card-stamps>
          <celestial :candidates="candidates" :selectedSN="selectedSN" />
          <v-btn @click="onClick">Select Object</v-btn>
          <aladin
            v-if="ok"
            :selectedObject="selectedSN"
            :objects="candidates"
            @objectSelected="onObjectSelected"
            displayClass="class"
          />
          <select-display :options="options">
            <light-curve-plot
              slot="difference"
              :detections="detections"
              :nonDetections="non_detections"
              type="difference"
            ></light-curve-plot>
            <light-curve-plot slot="apparent" :detections="detections" type="apparent"></light-curve-plot>
          </select-display>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import Vue from "vue";
import {
  CardStamps,
  Celestial,
  Aladin,
  SelectDisplay,
  LightCurvePlot
} from "@/entry";

import axios from "axios";
export default Vue.extend({
  name: "ServeDev",
  components: {
    CardStamps,
    Celestial,
    Aladin,
    SelectDisplay,
    LightCurvePlot
  },
  data() {
    return {
      detections: [],
      non_detections: [],
      oid: "ZTF20aaophpu",
      candidates: [
        {
          class: "SN",
          meanra: 120.2053139,
          meandec: 27.4985753733333,
          oid: "ZTF20aaophpu"
        }
      ],
      selectedSN: null,
      options: [
        { text: "Difference Magnitude", value: "difference" },
        { text: "Apparent Magnitude", value: "apparent" }
      ],
      tools: [
        {
          id: "zoom",
          text: "Zoom",
          icon: "mdi-magnify-plus"
        },
        {
          id: "crosshair",
          text: "Crosshair",
          icon: "mdi-crosshairs"
        }
      ],
      ok: false
    };
  },
  beforeMount() {
    this.addAladinScript();
  },
  mounted() {
    axios
      .post("https://ztf.alerce.online/get_detections", { oid: this.oid })
      .then(response => {
        this.detections = response.data.result.detections;
      });
    axios
      .post("https://ztf.alerce.online/get_non_detections", { oid: this.oid })
      .then(response => {
        this.non_detections = response.data.result.non_detections;
      });
  },
  methods: {
    onClick() {
      this.selectedSN = {
        oid: "ZTF20aaophpu",
        meanra: 10,
        meandec: 20
      };
    },
    onObjectSelected(object) {
      this.selectedSN = object;
    },
    addAladinScript() {
      let scriptTag = document.createElement("script");
      scriptTag.src = "https://code.jquery.com/jquery-1.12.1.min.js";
      document.getElementsByTagName("head")[0].appendChild(scriptTag);
      scriptTag = document.createElement("script");
      scriptTag.src =
        "https://aladin.u-strasbg.fr/AladinLite/api/v2/latest/aladin.min.js";
      scriptTag.id = "aladin-script";
      document.getElementsByTagName("head")[0].appendChild(scriptTag);
      let t = this;
      scriptTag.onload = () => {
        t.ok = true;
      };
    }
  }
});
</script>
<style>
@import "https://aladin.u-strasbg.fr/AladinLite/api/v2/latest/aladin.min.css";
</style>

