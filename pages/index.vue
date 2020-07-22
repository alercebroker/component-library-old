<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <v-card>
        <stamps-card
          v-model="detection"
          :detections="detections"
          :object="oid"
        />
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      detections: [],
      oid: 'ZTF20aaophpu',
      detection: 1,
    }
  },
  mounted() {
    this.$axios
      .post('https://ztf.alerce.online/get_detections', { oid: this.oid })
      .then((response) => {
        this.detections = response.data.result.detections
      })
  },
}
</script>
