<template>
  <v-layout wrap align-center>
    <!--Object ID-->
    <v-flex xs12 sm12 md12>
      <v-text-field v-model="localValue.oid" label="Object ID" />
    </v-flex>
    <!--Classifier-->
    <v-flex xs12 sm12 md6>
      <v-select
        v-model="localValue.selectedClassifier"
        :items="_classifiers"
        label="Classifier"
        hide-no-data
      />
    </v-flex>
    <!--Class-->
    <v-flex xs12 sm12 md6>
      <v-select
        v-model="localValue.selectedClass"
        :items="_class"
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
    <slider-range v-model="localValue.ndet" />
  </v-layout>
</template>
<script>
import { Vue, Component, Prop, Watch } from 'nuxt-property-decorator'
@Component({})
export default class DefaultSearch extends Vue {
  @Prop({ type: Object, required: true }) value

  @Prop({ type: Array, default: () => [] }) classifiers

  localValue = {}

  get probLabel () {
    return this.value.probability
      ? 'Probability ≥' + this.value.probability
      : 'Probability ≥ 0.00'
  }

  get _classifiers () {
    return this.classifiers.map(x => x.name)
  }

  get _class () {
    return this.value.classifiers
      ? this.classifiers.filter(x => x.name === this.value.classifier)[0]
        .values
      : []
  }

  @Watch('value', { immediate: true, deep: true })
  onValueChange (newVal, oldVal) {
    this.localValue = { ...this.localValue, ...newVal }
  }

  @Watch('localValue', { immediate: true, deep: true })
  onLocalValueChange (newVal, oldVal) {
    this.$emit('input', newVal)
  }
}
</script>
<docs>
```vue
<template>
  <div>
    <v-container>
      <v-row>
        {{ search }}
      </v-row>
    </v-container>
    <v-container>
      <default-search :value="search"/>
    </v-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      search: {
        oid: null,
        class: null,
        classifier: null,
        probability: 0,
        ndet: [0, 1000],
      }
    }
  }
}
</script>
```
</docs>
