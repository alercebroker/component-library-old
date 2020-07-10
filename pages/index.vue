<template>
  <v-layout
    column
    justify-center
    align-center
  >
    <a-header title="ALeRCE Components" :items="[{title: 'ZTF Explorer', to: 'https://alerce.online/'}, {title: 'SN Hunter', to: 'https://snhunter.alerce.online/'}]" />
    <v-flex
      xs12
      sm8
      md6
    >
      <v-card light>
        <radar-plot :probabilities="example.probabilities" :title="example.classifier_name" />
      </v-card>

      <v-card>
        <tns-information name="2018hzd" type="SN Ia" :redshift="0.05" />
      </v-card>

      <v-card>
        <default-search v-model="aiuda" :classifiers="classifiers" />
        <coordinates-search v-model="aiuda" />
        <date-search v-model="aiuda" />
      </v-card>

      <v-card>
        BBB: {{ aiuda }}
      </v-card>
    </v-flex>
    <a-footer social />
  </v-layout>
</template>

<script>

export default {
  /* eslint-disable */
  data() {
    return {
      aiuda: {
        ndet: [null, null],
        oid: null
      },
      classifiers: [
        {
          name: "Late Classifier",
          values: ["AGN", "SNe", "Asteroide", "Pluto", "Example"]
        },
        {
          name: "Early Classifier",
          values: ["A", "B", "C", "D", "E"]
        }
      ],
      example: {
        'classifier_name': 'Late',
        'class_name': 'EBSD/D',
        'probability': '0.28086',
        'probabilities': {
          'Ceph': 0.05952,
          'DSCT': 0.1767,
          'EBC': 0.2232,
          'EBSD/D': 0.28086,
          'Periodic-Other': 0.11904,
          'RRL': 0.07068,
          'AGN-I': 0.00132,
          'Blazar': 0.0066,
          'CV/Nova': 0.01032,
          'LPV': 0.00132,
          'QSO-I': 0.00036,
          'RS-CVn': 0.04008,
          'SLSN': 0.00262,
          'SNII': 0.0029,
          'SNIa': 0.00196,
          'SNIbc': 0.00252
        }
      }
    }
  }
  /* eslint-enable */
}
</script>
