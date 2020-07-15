<template>
  <v-layout>
    <v-flex xs3 sm3 md3>
      <v-text-field v-model="minRange" type="number" label="min" />
    </v-flex>
    <v-flex xs6 sm6 md6 pl-3 pr-3>
      <v-range-slider v-model="range" :max="max" :min="min" :step="step" />
    </v-flex>
    <v-flex xs3 sm3 md3>
      <v-text-field v-model="maxRange" type="number" label="max" />
    </v-flex>
  </v-layout>
</template>

<script>
import {
  Vue,
  Component,
  Prop
  // Model,
  // Watch,
  // Emit,
} from 'nuxt-property-decorator'
@Component
export default class SliderRange extends Vue {
  @Prop({ type: Array, default: () => [0, 1000] }) value

  @Prop({ type: Number, default: 1000 }) max

  @Prop({ type: Number, default: 0 }) min

  @Prop({ type: Number, default: 1 }) step

  get minRange () {
    return this.value[0]
  }

  set minRange (val) {
    this.$emit('input', [val, this.maxRange])
  }

  get maxRange () {
    return this.value[1]
  }

  set maxRange (val) {
    this.$emit('input', [this.minRange, val])
  }

  get range () {
    return this.value
  }

  set range (val) {
    this.$emit('input', val)
  }
}
</script>

<style></style>
