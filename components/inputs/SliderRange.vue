<template>
  <v-layout>
    <v-flex xs3 sm3 md3>
      <v-text-field v-model="minRange" type="number" label="min" :min="min" />
    </v-flex>
    <v-flex xs6 sm6 md6 pl-3 pr-3>
      <v-range-slider
        :value="value"
        :max="max"
        :min="min"
        :step="step"
        @end="setRange"
      />
    </v-flex>
    <v-flex xs3 sm3 md3>
      <v-text-field v-model="maxRange" type="number" label="max" :max="max" />
    </v-flex>
  </v-layout>
</template>

<script>
import { Vue, Component, Prop } from 'nuxt-property-decorator'
@Component
export default class SliderRange extends Vue {
  @Prop({ type: Array, default: () => [1, 2000] }) value

  @Prop({ type: Number, default: null }) max

  @Prop({ type: Number, default: null }) min

  @Prop({ type: Number, default: 1 }) step

  get minRange() {
    return this.value[0]
  }

  set minRange(val) {
    const maxRange = Math.min(this.maxRange, this.max) || this.max
    this.$emit('input', [val, maxRange])
  }

  get maxRange() {
    return this.value[1]
  }

  set maxRange(val) {
    const minRange = Math.max(this.min, this.minRange) || this.min
    this.$emit('input', [minRange, val])
  }

  setRange(val) {
    this.$emit('input', val)
  }
}
</script>
