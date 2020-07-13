<template>
  <v-container>
    <v-layout wrap align-center>
      <!--Object ID-->
      <v-flex xs12 sm12 md12>
        <v-text-field
          v-model="forms.oid"
          label="Object ID"
        />
      </v-flex>
      <!--Classifier-->
      <v-flex xs12 sm12 md6>
        <v-select
          v-model="forms.classifier"
          :items="_classifiers"
          label="Classifier"
          hide-no-data
        />
      </v-flex>
      <!--Class-->
      <v-flex xs12 sm12 md6>
        <v-select
          v-model="forms.class"
          :items="_class"
          :disabled="!forms.classifier"
          label="Class"
        />
      </v-flex>
      <!--Probabilities-->
      <v-flex xs12 sm12 md12>
        <v-slider
          v-model="forms.probability_class"
          :label="probLabel"
          :max="1"
          :step="0.01"
        />
      </v-flex>
      <!--Detections-->
      <v-flex xs12>
        Number of detections range
      </v-flex>
      <v-flex xs3 sm3 md3>
        <v-text-field
          v-model="forms.ndet[0]"
          type="number"
          label="min"
        />
      </v-flex>
      <v-flex xs6 sm6 md6 pl-3 pr-3>
        <v-range-slider
          v-model="ndet"
          :max="maxNobs"
          :min="minNobs"
          :step="1"
        />
      </v-flex>
      <v-flex xs3 sm3 md3>
        <v-text-field
          v-model="forms.ndet[1]"
          type="number"
          label="max"
        />
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import { Vue, Component, Model, Prop } from 'nuxt-property-decorator'
@Component({ })
export default class DefaultSearch extends Vue {
  @Model({ type: Object, default: { } })
  forms

  @Prop({ type: Array, default: [] })
  classifiers

  minNobs = 0
  maxNobs = 1000

  get probLabel () {
    return this.forms.probability_class ? 'Probability ≥' + this.forms.probability_class : 'Probability ≥ 0.00'
  }

  get _classifiers () {
    return this.classifiers.map(x => x.name)
  }

  get _class () {
    return this.forms.classifier ? this.classifiers.filter(x => x.name === this.forms.classifier)[0].values : null
  }

  get ndet () {
    if (this.forms.ndet[0] == null || this.forms.ndet[1] == null) {
      return [0, 1000]
    }
    return this.forms.ndet
  }

  set ndet (val) {
    this.forms.ndet = val
  }
}
</script>
