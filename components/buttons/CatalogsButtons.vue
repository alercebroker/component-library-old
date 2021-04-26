<template>
  <v-layout v-if="ra != null && dec != null" wrap justify-center>
    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn small tile block color="blue" v-bind="attrs" v-on="on">{{
          title
        }}</v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="item in links"
          :key="item.name"
          @click="openPage(item.link)"
        >
          <v-list-item-title>{{ item.name }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-layout>
</template>
<script>
import { Vue, Component, Prop } from 'nuxt-property-decorator'
/**
 * This component uses coordinates to search in other catalogs.
 * Available catalogs are: NED, SIMBAD, TNS, PanSTARRS and SDSS DR16
 */
@Component({})
export default class ColumnsoptionsButton extends Vue {
  /**
   * Right assention in degrees
   */
  @Prop({ type: Number, default: 0 }) ra

  /**
   * Declination in degrees
   */
  @Prop({ type: Number, default: 0 }) dec

  /**
   * Button text
   */
  @Prop({ type: String, default: 'External Catalogs' }) title

  get links() {
    return [
      {
        name: 'NED',
        link:
          'https://ned.ipac.caltech.edu/conesearch?search_type=Near+Position+Search&iau_style=liberal&objname=&coordinates=' +
          Math.round(this.ra * 1000) / 1000 +
          'd,' +
          Math.round(this.dec * 1000) / 1000 +
          'd&iau_name=&radius=0.17&in_csys=Equatorial&in_equinox=J2000&in_csys_IAU=Equatorial&in_equinox_IAU=B1950&z_constraint=Unconstrained&z_value1=&z_value2=&z_unit=z&ot_include=ANY&nmp_op=ANY&hconst=67.8&omegam=0.308&omegav=0.692&wmap=4&corr_z=1&out_csys=Same+as+Input&out_equinox=Same+as+Input&obj_sort=Distance+to+search+center&op=Go&form_build_id=form-a28snc2SSIQl3faGUe4otq7_NcjnMwxxxPoVxw5LHzg&form_id=conesearch',
      },
      {
        name: 'SIMBAD',
        link:
          'http://simbad.u-strasbg.fr/simbad/sim-coo?Coord=' +
          this.ra +
          '%20' +
          this.dec +
          '&Radius.unit=arcsec&Radius=10',
      },
      {
        name: 'TNS',
        link:
          'https://www.wis-tns.org/search?ra=' +
          this.ra +
          '&decl=' +
          this.dec +
          '&radius=10&coords_unit=arcsec',
      },
      {
        name: 'PanSTARRS',
        link:
          'http://ps1images.stsci.edu/cgi-bin/ps1cutouts?pos=' +
          this.ra +
          (this.dec > 0 ? '+' + this.dec : this.dec) +
          '&filter=color',
      },
      {
        name: 'SDSS DR16',
        link:
          'http://skyserver.sdss.org/dr16/en/tools/chart/navi.aspx?ra=' +
          this.ra +
          '&dec=' +
          this.dec,
      },
    ]
  }

  openPage(url) {
    const win = window.open(url, '_blank')
    win.focus()
  }
}
</script>
