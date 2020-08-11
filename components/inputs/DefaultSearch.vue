<template>
  <v-layout wrap align-center>
    <!--Object ID-->
    <v-flex xs12 sm12 md12>
      <v-text-field v-model="localValue.oid" label="Object ID" />
    </v-flex>
    <!--Classifier-->
    <v-flex xs12 sm12 md6 lg6>
      <v-select
        v-model="localValue.selectedClassifier"
        :items="classifiers"
        label="Classifier"
        hide-no-data
      />
    </v-flex>
    <!--Class-->
    <v-flex xs12 sm12 md6 lg6>
      <v-select
        v-model="localValue.selectedClass"
        :items="classes"
        label="Class"
      />
    </v-flex>
    <!--Probabilities-->
    <v-flex xs12 sm12 md12>
      <v-slider
        v-model="localValue.probability"
        :label="probLabel"
        :max="1"
        :step="0.01"
      />
    </v-flex>
    <!--Detections-->
    <v-flex xs12>
      Number of detections range
    </v-flex>
    <alerce-slider-range
      v-model="localValue.ndet"
      :max="limitNdet[1]"
      :min="limitNdet[0]"
    />
  </v-layout>
</template>
<script>
import { Vue, Component, Prop, Watch } from 'nuxt-property-decorator'
@Component({})
export default class DefaultSearch extends Vue {
  @Prop({ type: Object, required: true }) value

  @Prop({ type: Array, default: () => [] }) classifiers

  @Prop({ type: Array, default: () => [] }) classes

  @Prop({ type: Array, default: () => [1, 2000] }) limitNdet

  localValue = {}

  get probLabel() {
    return this.value.probability
      ? 'Probability ≥' + this.value.probability
      : 'Probability ≥ 0.00'
  }

  @Watch('value', { immediate: true, deep: true })
  onValueChange(newVal, oldVal) {
    this.localValue = { ...this.localValue, ...newVal }
  }

  @Watch('localValue', { immediate: true, deep: true })
  onLocalValueChange(newVal, oldVal) {
    this.$emit('input', newVal)
  }
}
</script>
