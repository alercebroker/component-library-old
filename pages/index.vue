<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <v-card>
        <mag-stats :stats="stats" />
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
      stats: [
        {
          stat: 'mean',
          g: 1,
          b: 2,
        },
        {
          stat: 'max',
          g: 1,
          b: 2,
        },
      ],
    }
  },
  mounted() {},
}
</script>
