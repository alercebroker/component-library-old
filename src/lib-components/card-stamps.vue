<template>
  <v-card height="100%">
    <v-toolbar dense flat :dark="dark">
      <v-row align="center">
        <v-col cols="3">
          <v-toolbar-title>Stamps</v-toolbar-title>
        </v-col>
        <v-col cols="5" class="mt-4">
          <v-select
            :items="dates"
            item-value="index"
            item-text="date"
            :value="selectedStamp"
            @change="onDateSelected"
          ></v-select>
        </v-col>
        <v-col cols="2">
          <v-icon @click="prevStamp">mdi-arrow-left-drop-circle</v-icon>
          <v-icon @click="nextStamp">mdi-arrow-right-drop-circle</v-icon>
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="1" v-if="hasFullscreenListener">
          <v-icon @click="fullscreen">{{fullscreenIcon}}</v-icon>
        </v-col>
        <v-col cols="1">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-icon v-on="on">mdi-information</v-icon>
            </template>
            <span>Use the tool icons below to change between zoom or crosshair modes</span>
          </v-tooltip>
        </v-col>
      </v-row>
    </v-toolbar>
    <v-divider></v-divider>
    <v-card-text>
      <v-row justify="center">
        <v-col cols="4" class="text-center">
          <h5>
            Science
            <v-btn x-small outlined color="primary" :href="download('science')">
              <v-icon left small>mdi-cloud-download</v-icon>Download
            </v-btn>
          </h5>
        </v-col>
        <v-col cols="4" class="text-center">
          <h5>
            Template
            <v-btn x-small outlined color="primary" :href="download('template')">
              <v-icon left small>mdi-cloud-download</v-icon>Download
            </v-btn>
          </h5>
        </v-col>
        <v-col cols="4" class="text-center">
          <h5>
            Difference
            <v-btn x-small outlined color="primary" :href="download('difference')">
              <v-icon left small>mdi-cloud-download</v-icon>Download
            </v-btn>
          </h5>
        </v-col>
      </v-row>
      <v-row class="pa-0">
        <v-col cols="12" v-if="stampComponent === 'zoom'">
          <zoom-on-hover :images="[science,template,difference]" :disabled="isFullscreen"></zoom-on-hover>
        </v-col>
        <v-col cols="12" v-if="stampComponent === 'crosshair'">
          <crosshair :images="[science, template, difference]" :fullscreen="isFullscreen"></crosshair>
        </v-col>
      </v-row>
      <v-row align="start" style="max-height:20px;" class="pa-0" justify="center">
        <v-col style="max-height:20px;" cols="1" class="pa-0">
          <v-icon @click="selectZoom">mdi-magnify-plus</v-icon>
          <v-icon @click="selectCrosshair">mdi-crosshairs</v-icon>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import { jdToDate } from "./utils/AstroDates.js";
import ZoomOnHover from "./utils/ZoomOnHover.vue";
import Crosshair from "./utils/Crosshair.vue";
export default {
  name: "card-stamps",
  components: {
    ZoomOnHover,
    Crosshair
  },
  props: {
    dark: {
      type: Boolean,
      default: true
    },
    detections: {
      type: Array,
      default: function() {
        return [];
      }
    },
    object: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      isFullscreen: false,
      stampComponent: "crosshair",
      currentStamp: 0,
      selectedStamp: 0
    };
  },
  methods: {
    prevStamp() {
      if (this.currentStamp > 0) {
        this.currentStamp -= 1;
        this.selectedStamp -= 1;
      }
    },
    nextStamp() {
      if (this.currentStamp + 1 < this.detections.length) {
        this.currentStamp += 1;
        this.selectedStamp += 1;
      }
    },
    getCandid(index) {
      if (this.detections && this.detections.length) {
        return this.detections[index].candid_str;
      } else {
        return "";
      }
    },
    download(type) {
      let link =
        "http://avro.alerce.online/get_stamp?oid=" +
        this.object +
        "&candid=" +
        this.getCandid(this.currentStamp) +
        "&type=" +
        type +
        "&format=fits";
      return link;
    },
    fullscreen() {
      this.isFullscreen = !this.isFullscreen;
      this.$emit("fullscreen", { id: 7, value: this.isFullscreen });
    },
    selectZoom() {
      this.stampComponent = "zoom";
    },
    selectCrosshair() {
      this.stampComponent = "crosshair";
    },
    onDateSelected(date) {
      this.currentStamp = date;
      this.selectedStamp = date;
    },
    getScienceURL(object, candid) {
      return (
        "https://avro.alerce.online/get_stamp?oid=" +
        object +
        "&candid=" +
        candid +
        "&type=science&format=png"
      );
    },
    getTemplateURL(object, candid) {
      return (
        "https://avro.alerce.online/get_stamp?oid=" +
        object +
        "&candid=" +
        candid +
        "&type=template&format=png"
      );
    },
    getDifferenceURL(object, candid) {
      return (
        "https://avro.alerce.online/get_stamp?oid=" +
        object +
        "&candid=" +
        candid +
        "&type=difference&format=png"
      );
    }
  },
  computed: {
    dates() {
      if (this.detections) {
        return this.detections.map((x, i) => {
          return {
            date:
              jdToDate(x.mjd)
                .toUTCString()
                .slice(0, -3) + "UT",
            index: i
          };
        });
      }
      return [];
    },
    science() {
      return this.getScienceURL(
        this.object,
        this.getCandid(this.currentStamp)
      );
    },
    difference() {
      return this.getDifferenceURL(
        this.object,
        this.getCandid(this.currentStamp)
      );
    },
    template() {
      return this.getTemplateURL(
        this.object,
        this.getCandid(this.currentStamp)
      );
    },
    fullscreenIcon() {
      return this.isFullscreen ? "mdi-fullscreen-exit" : "mdi-fullscreen";
    },
    hasFullscreenListener() {
      return this.$listeners && this.$listeners.fullscreen;
    }
  }
};
</script>

<style scoped>
</style>
