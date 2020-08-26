<template>
  <v-layout wrap align-center>
    <!--Objects ID-->
    <v-flex xs12 sm12 md12>
      <v-combobox
        v-model="localOids"
        label="Object ID"
        append-icon=" "
        :delimiters="delimiters"
        clearable
        deletable-chips
        multiple
        small-chips
      />
    </v-flex>
    <!--Classifier-->
    <v-flex xs12 sm12 md6 lg6>
      <v-select
        v-model="localValue.selectedClassifier"
        :items="_classifiers"
        item-value="value"
        item-text="name"
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
import { formatClassifierName } from '../utils/Formatters'
@Component({})
export default class DefaultSearch extends Vue {
  @Prop({ type: Object, required: true }) value

  @Prop({ type: Array, default: () => [] }) classifiers

  @Prop({ type: Array, default: () => [] }) classes

  @Prop({ type: Array, default: () => [1, 2000] }) limitNdet

  localValue = {}
  oids = []
  delimiters = [' ', ',', ';']

  get localOids() {
    return this.localValue.oid
  }

  set localOids(val) {
    this.oids = this.formatOids(val)
    this.localValue.oid = this.oids
  }

  get probLabel() {
    return this.value.probability
      ? 'Probability ≥' + this.value.probability
      : 'Probability ≥ 0.00'
  }

  get _classifiers() {
    return this.classifiers.map((x) => {
      return {
        name: formatClassifierName(x),
        value: x,
      }
    })
  }

  formatOids(listOfOids) {
    const reducer = (accumulator, current) =>
      accumulator.concat(current.split(/[,;]*\s|\s|\n/g))
    let oids = listOfOids.reduce(reducer, [])
    oids = oids.map((x) => x.trim())
    oids = Array.from(new Set(oids))
    return oids
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
