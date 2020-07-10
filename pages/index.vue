<template>
  <v-layout
    column
    justify-center
    align-center
  >
    <alerce-header title="ALeRCE Components" :items="[{title: 'ZTF Explorer', to: 'https://alerce.online/'}, {title: 'SN Hunter', to: 'https://snhunter.alerce.online/'}]" />
    <v-flex
      xs12
      sm8
      md6
    >
      <v-card light>
        <h1>Hi dklasjdklas </h1>
        <h2>jahjdklsadjkl</h2>
        <basic-information :information="example_object"/>
      </v-card>

      <v-card>
        <tns-information name="2018hzd" type="SN Ia" :redshift="0.05" />
      </v-card>

      <v-card>
        <default-search v-model="aiuda" :classifiers="classifiers" />
        <coordinates-search v-model="aiuda"/>
        <date-search v-model="aiuda" />
      </v-card>

      <v-card>
        BBB: {{ aiuda }}
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import Header from '~/components/misc/Header.vue'
import BasicInformation from '~/components/tables/BasicInformation.vue'
import TnsInformation from '~/components/tables/TnsInformation.vue'
import DefaultSearch from '~/components/inputs/DefaultSearch.vue'
import CoordinatesSearch from '~/components/inputs/CoordinatesSearch.vue'
import DateSearch from '~/components/inputs/DateSearch.vue'
export default {
  components: {
    'alerce-header': Header,
    TnsInformation,
    DefaultSearch,
    CoordinatesSearch,
    DateSearch,
    BasicInformation
  },
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
      },
      example_object: {
        "oid": "ZTF17aaaajjv",
        "ndethist": "1045",
        "ncovhist": 1768,
        "jdstarthist": null,
        "jdendhist": null,
        "corrected": true,
        "stellar": true,
        "ndet": 397,
        "firstmjd": 58279.4494906999,
        "lastmjd": 59010.4779977002,
        "deltamjd": 731.028507000301,
        "meanra": 321.297601901511,
        "meandec": 47.3457661989925,
        "sigmara": 0.0000983016954640438,
        "sigmadec": 0.0000546554774116514
      }
    }
  }
  /* eslint-enable */
}
</script>
