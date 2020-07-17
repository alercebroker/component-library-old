<template>
  <v-layout
    column
    justify-center
    align-center
  >
    <v-flex
      xs12
      sm8
      md6
    >
      <v-card>
        <stamps-card :detections="detections" :object="oid"/>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>

export default {
  /* eslint-disable */
  data() {
    return {
      detections: [],
      oid: "ZTF20aaophpu"
    }
  },
  mounted() {
    this.$axios
    .post("https://ztf.alerce.online/get_detections", { oid: this.oid })
    .then(response => {
      this.detections = response.data.result.detections;
    });
  },
  watch: {
  }
  /* eslint-enable */
}
</script>
