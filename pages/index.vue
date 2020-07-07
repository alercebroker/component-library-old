<template>
  <v-layout
    justify-center
    align-center
  >
    <a-header title="ALeRCE Components" :items="[{title: 'ZTF Explorer', to: 'https://alerce.online/'}, {title: 'SN Hunter', to: 'https://snhunter.alerce.online/'}]"></a-header>
    <v-flex
      xs12
      sm8
      md6
    >
      <v-card>
        <tns-information name="2018hzd" type="SN Ia" :redshift="0.05"></tns-information>
      </v-card>
    

      <v-card>
        <catalogs-buttons :ra="0.56" :dec="90.7"></catalogs-buttons>
      </v-card>
    </v-flex>
    <a-footer social></a-footer>
  </v-layout>
</template>

<script>
import AHeader from '~/components/misc/AHeader.vue'
import AFooter from '~/components/misc/AFooter.vue'

import TnsInformation from '~/components/tables/TnsInformation.vue'
import CatalogsButtons from '~/components/buttons/CatalogsButtons.vue'

export default {
  components: {
    AHeader,
    AFooter,
    TnsInformation,
    CatalogsButtons
  }
}
</script>
