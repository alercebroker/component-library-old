<template>
  <v-container>
    <v-layout wrap align-center>
      <v-flex xs5>
        <v-text-field
          v-model="forms.ra"
          type="number"
          step="0.00001"
          label="RA (deg)"
        />
      </v-flex>
      <v-spacer />
      <v-flex xs5>
        <v-text-field
          v-model="forms.dec"
          label="DEC (deg)"
          type="number"
          step="0.00001"
        />
      </v-flex>
      <v-flex xs12>
        <v-text-field
          v-model="forms.radius"
          label="Radius (arcsec)"
          type="number"
          step="0.00001"
          min="0"
        />
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import { Vue, Component, Model } from 'nuxt-property-decorator'
@Component({})
export default class CoordinatesSearch extends Vue {
  @Model({ type: Object, default: { } })
  forms
}
</script>
