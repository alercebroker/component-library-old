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
        <radar-plot :probabilities="example.probabilities" :title="example.classifier_name" />
      </v-card>

      <v-card>
        <tns-information name="2018hzd" type="SN Ia" :redshift="0.05" />
      </v-card>
    </v-flex>
    <alerce-footer social />
  </v-layout>
</template>

<script>
import Header from '~/components/misc/Header.vue'
import Footer from '~/components/misc/Footer.vue'
import RadarPlot from '~/components/plots/RadarPlot.vue'
import TnsInformation from '~/components/tables/TnsInformation.vue'
export default {
  components: {
    'alerce-header': Header,
    'alerce-footer': Footer,
    RadarPlot,
    TnsInformation
  },
  /* eslint-disable */
  data() {
    return {
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
