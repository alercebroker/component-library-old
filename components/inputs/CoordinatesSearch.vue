<template>
  <v-layout wrap align-center>
    <v-flex xs5>
      <v-text-field
        v-model="localValue.ra"
        type="number"
        step="0.00001"
        label="RA (deg)"
      />
    </v-flex>
    <v-spacer />
    <v-flex xs5>
      <v-text-field
        v-model="localValue.dec"
        label="DEC (deg)"
        type="number"
        step="0.00001"
      />
    </v-flex>
    <v-flex xs12>
      <v-text-field
        v-model="localValue.radius"
        label="Radius (arcsec)"
        type="number"
        step="0.00001"
        min="0"
      />
    </v-flex>
  </v-layout>
</template>
<script>
import { Vue, Component, Prop, Watch } from 'nuxt-property-decorator'
@Component({})
export default class CoordinatesSearch extends Vue {
  @Prop({ type: Object, required: true }) value

  localValue = { }

  @Watch('value', { immediate: true, deep: true })
  onValueChange (val) {
    this.localValue = { ...this.localValue, ...val }
  }

  @Watch('localValue', { immediate: true, deep: true })
  onLocalValueChange (val) {
    this.$emit('input', val)
  }
}
</script>
