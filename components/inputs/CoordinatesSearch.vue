<template>
  <v-layout wrap align-center>
    <!--Target Name-->
    <v-flex xs10 sm12 md12>
      <v-row>
        <v-col lg="6" md="12">
        <v-text-field
          v-model="targetName"
          label="Target Name"
        />
        </v-col>
      <!--BOTON-->
        <v-col lg="6" md="12" mt ="5">
          <v-btn @click="obtenerInfo" :loading="isLoading" color="normal" block margin-top = "4" >
            Resolve
          </v-btn>
        </v-col> 
      </v-row>
    </v-flex> 
    <!--PROVIDED BY-->
    <v-flex xs10 sm12 md12>
    <v-row>
      <v-col md="7" lg="12" class="pa-0 caption transparent py-0 ">
        <p class="mb-0 mr-3 text-right">
          Provided by
          <a href="https://vizier.cds.unistra.fr/vizier/doc/sesame.htx" target="_blank">
            Sesame
          </a>
        </p>
      </v-col>
    </v-row>
    </v-flex>
    <!--RA--> 
    <v-flex xs5>      
      <v-text-field
        v-model="localValue.ra"
        type="number"
        step="0.00001"
        label="RA (deg)"
        :error-messages="validationErrors.conesearch"
      />
    </v-flex>
    <v-spacer />
    <!--DEC--> 
    <v-flex xs5> 
      <v-text-field
        v-model="localValue.dec"
        label="DEC (deg)"
        type="number"
        step="0.00001"
        :error-messages="validationErrors.conesearch"
      />
    </v-flex>
    <!--RADIUS-->      
    <v-flex xs12> 
      <v-text-field
        v-model="localValue.radius"
        label="Radius (arcsec)"
        type="number"
        step="0.00001"
        min="0"
        :error-messages="
          validationErrors.conesearch || validationErrors.radiusPositive
        "
      />
    </v-flex>
  </v-layout>
</template>
<script>
import { Vue, Component, Prop, Watch } from 'nuxt-property-decorator'
import { hmstoRaDec } from '../utils/AstroDates.js'
import axios from "axios"
@Component({})
export default class CoordinatesSearch extends Vue {
  /**
   * Object with ra, dec and radius keys
   */
  @Prop({ type: Object, required: true }) value
  @Prop({ type: Object, default: () => {} }) validationErrors

  localValue = {}
  targetName = ""
  isLoading = false

  @Watch('value', { immediate: true, deep: true })
  onValueChange(val) {
    this.localValue = { ...this.localValue, ...val }
  }

  @Watch('localValue', { immediate: true, deep: true })
  onLocalValueChange(val) {
    this.$emit('input', val)
  }

  obtenerInfo() {
    this.isLoading = true;
    axios.get(`https://cds.unistra.fr/cgi-bin/nph-sesame/-ox?${this.targetName}`).then((result) => {
      let parser = new DOMParser();
      let xmlDom = parser.parseFromString(result.data , 'application/xml');
      let jra = xmlDom.querySelector('jradeg').innerHTML;
      let jdec = xmlDom.querySelector('jdedeg').innerHTML;
      console.log(jra, jdec);
      this.localValue = {...this.localValue, ra:(+jra), dec:+jdec}
      this.isLoading = false;
    })
  }
}
</script>
