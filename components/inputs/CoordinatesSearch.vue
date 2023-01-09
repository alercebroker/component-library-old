<template>
  <v-layout wrap align-center>
    <!--Target Name-->
    <v-flex xs10 sm12 md12>
      <v-row>
        <v-col lg="6" md="11">
          <v-text-field v-model="localValue.targetName" label="Target Name" :error-messages="error" />
        </v-col>
        <!--BOTON-->
        <v-col lg="6" md="13" mt="5">
          <v-btn @click="obtenerInfo" :loading="isLoading" color="normal" block margin-top="4">
            Resolve
          </v-btn>
    <!--PROVIDED BY-->
          <v-col lg="12" class="pa-0 caption transparent py-0 ">
            <p class="mb-0 mt-1">
              Provided by
              <a href="https://vizier.cds.unistra.fr/vizier/doc/sesame.htx" target="_blank">
                Sesame
              </a>
            </p>
          </v-col>
        </v-col>
      </v-row>
    </v-flex>
    <!--CHECKBOX-->
    <v-flex xs10 sm12 md12>
      <v-row>
      <v-col lg="12">
        <v-checkbox
          v-model="usingHMS"
          :label="usingHMS ?`HMS` : `Degrees`">
        </v-checkbox>
      </v-col>
    </v-row>
    </v-flex>

    <!--RA-->
    <v-flex xs5>
      <v-text-field v-model="localValue.ra" :label="usingHMS ?`RA(hms)` : `RA(deg)` " type="text"
        :error-messages="validationErrors.conesearch" />
    </v-flex>
    <v-spacer />
    <!--DEC-->
    <v-flex xs5>
      <v-text-field v-model="localValue.dec" :label="usingHMS ?`DEC(hms)` : `DEC(deg)` " type="text"
        :error-messages="validationErrors.conesearch" />
    </v-flex>
    <!--RADIUS-->
    <v-flex xs12>
      <v-text-field v-model="localValue.radius" label="Radius (arcsec)" type="number" step="0.00001" min="0"
        :error-messages="
  validationErrors.conesearch || validationErrors.radiusPositive
        " />
    </v-flex>
  </v-layout>
</template>
<script>
import { Vue, Component, Prop, Watch } from 'nuxt-property-decorator'
import { hmsToDegrees } from '../utils/AstroDates.js'
import axios from "axios"
@Component({})
export default class CoordinatesSearch extends Vue {
  /**
   * Object with ra, dec and radius keys
   */
  @Prop({ type: Object, required: true }) value
  @Prop({ type: Object, default: () => { } }) validationErrors

  localValue = {}
  isLoading = false
  error = []
  usingHMS = false

  @Watch('value', { immediate: true, deep: true })
  onValueChange(val) {
    this.localValue = { ...this.localValue, ...val }
  }

  @Watch('localValue', { immediate: true, deep: true })
  onLocalValueChange(val) {
    if(this.usingHMS){
      const raDec = this.conversionRaDec(String(val.ra), String(val.dec))
      this.$emit('input', {...val, ...raDec})
    }
    else{
      this.$emit('input', val)
    }
  }

  conversionRaDec(hmsRa, hmsDec){
    const hmsR = hmsRa?.split(":").map(x => +x)
    const hmsD = hmsDec?.split(":").map(x => +x)

    if(!hmsR || hmsR.length !== 3 || hmsR.find(x => isNaN(x))){
      console.log("Invalid Format for Ra")
      return null
    }
    if(!hmsD || hmsD.length !== 3 || hmsD.find(x => isNaN(x))){
      console.log("Invalid Format for Dec")
      return null
    }
    const[decH, decM, decS] = hmsD
    const[raH, raM, raS] = hmsR
    const degR = hmsToDegrees(raH, raM, raS)
    const degD = hmsToDegrees(decH, decM, decS)
    return {ra: degR, dec: degD}
  }

  obtenerInfo() {
    this.isLoading = true;
    axios.get(`https://cds.unistra.fr/cgi-bin/nph-sesame/-ox?${this.localValue.targetName}`).then((result) => {
      let parser = new DOMParser();
      let xmlDom = parser.parseFromString(result.data, 'application/xml');
      let jra = xmlDom.querySelector('jradeg')?.innerHTML;
      let jdec = xmlDom.querySelector('jdedeg')?.innerHTML;

      if (!jra || !jdec) {
        this.error = ["Object not found"];
      }

      else {
        this.localValue = {
          ...this.localValue,
          ra: +jra,
          dec: +jdec,
          radius: 1.5
        }
        this.error = []
      }
      this.isLoading = false;
    })
  }
}
</script>
