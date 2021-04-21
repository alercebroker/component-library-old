<template>
  <v-footer class="caption transparent py-0">
    <span v-if="discoverer" class="mb-0">
      Discovered by {{ reporter }}
      <v-tooltip bottom max-width="400px">
        <template v-slot:activator="{ on, attrs }">
          <v-avatar size="20" v-bind="attrs" v-on="on">
            <img :src="_logo" />
          </v-avatar>
        </template>
        <span>{{ discoverer }}</span>
      </v-tooltip>
    </span>
    <v-spacer />
    <p class="mb-0">
      Provided by
      <a :href="url" target="_blank"
        >TNS
        <img
          src="https://www.wis-tns.org/sites/default/files/favicon.png"
          alt="TNS icon"
      /></a>
    </p>
  </v-footer>
</template>
<script>
import { Vue, Component, Prop } from 'nuxt-property-decorator'
@Component({})
export default class FooterTns extends Vue {
  @Prop({ type: String, default: null })
  tnsId

  @Prop({ type: String, default: null })
  reporter

  @Prop({ type: String, default: null })
  discoverer

  @Prop({ type: Boolean, default: false })
  classified

  logoWhite =
    'https://alerce-static.s3.amazonaws.com/logos/footerAlerceWhite.png'

  logoBlue = 'https://alerce-static.s3.amazonaws.com/logos/footerAlerce.png'

  get url() {
    if (this.tnsId && this.tnsId !== '-') {
      return 'https://www.wis-tns.org/object/' + this.tnsId
    } else if (this.classified) {
      return 'https://www.wis-tns.org/search?&discovered_period_value=&discovered_period_units=months&unclassified_at=0&classified_sne=1&include_frb=0&name=&name_like=0&isTNS_AT=all&public=all&ra=&decl=&radius=&coords_unit=arcsec&reporting_groupid%5B%5D=74&groupid%5B%5D=null&classifier_groupid%5B%5D=null&objtype%5B%5D=null&at_type%5B%5D=null&date_start%5Bdate%5D=&date_end%5Bdate%5D=&discovery_mag_min=&discovery_mag_max=&internal_name=&discoverer=&classifier=&spectra_count=&redshift_min=&redshift_max=&hostname=&ext_catid=&ra_range_min=&ra_range_max=&decl_range_min=&decl_range_max=&discovery_instrument%5B%5D=null&classification_instrument%5B%5D=null&associated_groups%5B%5D=null&at_rep_remarks=&class_rep_remarks=&frb_repeat=all&frb_repeater_of_objid=&frb_measured_redshift=0&frb_dm_range_min=&frb_dm_range_max=&frb_rm_range_min=&frb_rm_range_max=&frb_snr_range_min=&frb_snr_range_max=&frb_flux_range_min=&frb_flux_range_max=&num_page=50&display%5Bredshift%5D=1&display%5Bhostname%5D=1&display%5Bhost_redshift%5D=1&display%5Bsource_group_name%5D=1&display%5Bclassifying_source_group_name%5D=1&display%5Bdiscovering_instrument_name%5D=0&display%5Bclassifing_instrument_name%5D=0&display%5Bprograms_name%5D=0&display%5Binternal_name%5D=1&display%5BisTNS_AT%5D=0&display%5Bpublic%5D=1&display%5Bend_pop_period%5D=0&display%5Bspectra_count%5D=1&display%5Bdiscoverymag%5D=1&display%5Bdiscmagfilter%5D=1&display%5Bdiscoverydate%5D=1&display%5Bdiscoverer%5D=1&display%5Bremarks%5D=0&display%5Bsources%5D=0&display%5Bbibcode%5D=0&display%5Bext_catalogs%5D=0'
    } else {
      return 'https://www.wis-tns.org/'
    }
  }

  get _logo() {
    if (this.$vuetify.theme.isDark) {
      return this.logoWhite
    } else {
      return this.logoBlue
    }
  }
}
</script>
