<script>
import Vue from "vue";
import { CardStamps, Celestial, Aladin} from "@/entry";
import axios from "axios";
export default Vue.extend({
  name: "ServeDev",
  components: {
    CardStamps,
    Celestial,
    Aladin
  },
  data() {
    return {
      detections: [],
      oid: "ZTF20aaophpu",
      candidates: {
        ZTF20aaophpu: {
          pclassearly: 1,
          meanra: 10,
          meandec: 20,
          oid: "ZTF20aaophpu"
        }
      },
      selectedSN: null
    };
  },
  mounted() {
    axios
      .post("https://ztf.alerce.online/get_detections", { oid: this.oid })
      .then(response => {
        this.detections = response.data.result.detections;
      });
  },
  methods:{
    onClick(){
      this.selectedSN = {
        oid: "ZTF20aaophpu",
        meanra:10,
        meandec:20
      }
    },
    onObjectSelected(object){
      this.selectedSN = object;
    }
  }
});
</script>

<template>
  <v-app id="app">
    <v-container>
      <v-row justify="center">
        <v-col cols="6">
          <card-stamps :detections="detections" :object="oid" flat></card-stamps>
          <celestial :candidates="candidates" :selectedSN="selectedSN"/>
          <v-btn @click="onClick">Select Object</v-btn>
          <aladin :selectedObject="selectedSN" :objects="candidates" @objectSelected="onObjectSelected"/>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>
