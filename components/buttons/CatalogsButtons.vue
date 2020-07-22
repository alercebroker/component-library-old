<template>
  <v-layout v-if="ra != null && dec != null" wrap justify-center>
    <v-flex
      v-for="item in links"
      :key="item.name"
      xs12
      sm4
      pl-1
      pr-1
      pt-2
      class="text-md-center"
    >
      <v-btn
        color="primary"
        block
        small
        depressed
        :href="item.link"
        target="_blank"
      >
        <div class="text-capitalize">{{ item.name }}</div>
      </v-btn>
    </v-flex>
  </v-layout>
</template>
<script>
export default {
  props: {
    ra: { type: Number, default: 0 },
    dec: { type: Number, default: 0 }
  },
  computed: {
    links() {
      return [
        {
          name: 'NED',
          link:
            'https://ned.ipac.caltech.edu/conesearch?search_type=Near+Position+Search&iau_style=liberal&objname=&coordinates=' +
            Math.round(this.ra * 1000) / 1000 +
            'd,' +
            Math.round(this.dec * 1000) / 1000 +
            'd&iau_name=&radius=0.17&in_csys=Equatorial&in_equinox=J2000&in_csys_IAU=Equatorial&in_equinox_IAU=B1950&z_constraint=Unconstrained&z_value1=&z_value2=&z_unit=z&ot_include=ANY&nmp_op=ANY&hconst=67.8&omegam=0.308&omegav=0.692&wmap=4&corr_z=1&out_csys=Same+as+Input&out_equinox=Same+as+Input&obj_sort=Distance+to+search+center&op=Go&form_build_id=form-a28snc2SSIQl3faGUe4otq7_NcjnMwxxxPoVxw5LHzg&form_id=conesearch'
        },
        {
          name: 'SIMBAD',
          link:
            'http://simbad.u-strasbg.fr/simbad/sim-coo?Coord=' +
            this.ra +
            '%20' +
            this.dec +
            '&Radius.unit=arcsec&Radius=10'
        },
        {
          name: 'TNS',
          link:
            'https://wis-tns.weizmann.ac.il/search?ra=' +
            this.ra +
            '&decl=' +
            this.dec +
            '&radius=10&coords_unit=arcsec'
        },
        {
          name: 'PanSTARRS',
          link:
            'http://ps1images.stsci.edu/cgi-bin/ps1cutouts?pos=' +
            this.ra +
            (this.dec > 0 ? '+' + this.dec : this.dec) +
            '&filter=color'
        },
        {
          name: 'SDSS DR15',
          link:
            'http://skyserver.sdss.org/dr15/en/tools/chart/navi.aspx?ra=' +
            this.ra +
            '&dec=' +
            this.dec
        }
      ]
    }
  }
}
</script>
<!-- <docs>
     ```vue
     <template>
     <v-container>
     <v-row>
     <v-col cols="12" sm="6" md="3">
     <v-text-field
     v-model="ra"
     label="RA"
     />
     </v-col>

     <v-col cols="12" sm="6" md="3">
     <v-text-field
     v-model="dec"
     label="DEC"
     />
     </v-col>
     </v-row>
     <v-row>
     <catalogs-buttons :ra="ra" :dec="dec" />
     </v-row>
     </v-container>
     </template>
     <script>
     export default {
     data() {
     return {
     ra: 0,
     dec: 0
     }
     }
     }
     </script>

     ```
     </docs> -->
