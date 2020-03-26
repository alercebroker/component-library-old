<template>
  <v-app id="app">
    <v-container>
      <v-row justify="center">
        <v-col cols="6">
          <card-stamps :detections="detections" :object="oid" flat >
          </card-stamps>
          <celestial :candidates="candidates" :selectedSN="selectedSN" />
          <v-btn @click="onClick">Select Object</v-btn>
          <aladin
            :selectedObject="selectedSN"
            :objects="candidates"
            @objectSelected="onObjectSelected"
            displayClass="class"
          />
          <select-display :options="options">
            <light-curve-plot slot="options1" :detections="detections" type="difference"></light-curve-plot>
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
  LightCurvePlot,
} from "@/entry";

import axios from "axios";
export default Vue.extend({
  name: "ServeDev",
  components: {
    CardStamps,
    Celestial,
    Aladin,
    SelectDisplay,
    LightCurvePlot,
  },
  data() {
    return {
      detections: [],
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
        { text: "Option 1", value: "options1" },
        { text: "Option 2", value: "options2" }
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
      ]
    };
  },
  mounted() {
    axios
      .post("https://ztf.alerce.online/get_detections", { oid: this.oid })
      .then(response => {
        this.detections = response.data.result.detections;
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
    }
  }
});
</script>


