<template>
  <v-layout wrap align-center>
    <!--Target Name-->
    <v-flex xs10 sm12 md12>
      <v-row>
        <v-col lg="5" md="11">
          <v-text-field v-model="localValue.targetName" label="Target Name" :error-messages="error" />
        </v-col>
    <!--BOTON RESOLVE-->
        <v-col lg="7" md="13" mt="5">
          <v-btn @click="obtenerInfo" :loading="isLoading" color="normal" block margin-top="4">
            Resolve
          </v-btn>
    <!--PROVIDED BY SESAME-->
          <v-col lg="12" class="pa-0 caption transparent py-0 ">
            <p class="mb-0 mt-1 text-right">
              Provided by
              <a href="https://vizier.cds.unistra.fr/vizier/doc/sesame.htx" target="_blank">
                Sesame
              </a>
            </p>
          </v-col>
        </v-col>
      </v-row>
    </v-flex>
    <!--RADIO BUTTON-->
    <v-flex xs10 sm12 md12>
      <v-row class="mt-2">
        <v-col lg="12">
          <input class="mr-1" type="radio" id="degrees" :value="false" v-model="usingHMS">
          <label class="mr-12" for="degrees"> 
            Degrees
          </label>
          <input class="mr-1" type="radio" id="hms" :value="true" v-model="usingHMS">
          <label for="hms">
            HMS/DMS
          </label>
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
      <v-text-field v-model="localValue.dec" :label="usingHMS ?`DEC(dms)` : `DEC(deg)` " type="text"
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
import { raDectoHMS } from '../utils/AstroDates.js'
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
    if(this.usingHMS){
      if(!val.ra && !val.dec){
        this.usingHMS = false
        this.localValue = {
          ...this.localValue,
          ...val
        }
      }
      console.log(val)
      return
    }  
    console.log(val)
    this.localValue = {
        ...this.localValue,
        ...val
      }
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

  @Watch('usingHMS')
  onFormatChange(isHMS){
    if (this.localValue.ra === null && this.localValue.dec === null){
      return 
    }
    if(!isHMS) {
      this.localValue = {
        ...this.localValue,
        ...this.value
      }
      return
    }
    else {
      const raDecHMS = raDectoHMS(this.localValue.ra, this.localValue.dec, 6).split(" ")
      this.localValue = {
        ...this.localValue, 
        ra: raDecHMS[0].slice(1), 
        dec: raDecHMS[1]
      }
      return raDecHMS
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
    return {ra: degR * 15 , dec: degD }
  }

  obtenerInfo() {
    this.isLoading = true;
    axios.get(`https://cds.unistra.fr/cgi-bin/nph-sesame/-ox?${this.localValue.targetName}`).then((result) => {
      let parser = new DOMParser();
      let xmlDom = parser.parseFromString(result.data, 'application/xml');
      let jra = xmlDom.querySelector('jradeg')?.innerHTML;
      let jdec = xmlDom.querySelector('jdedeg')?.innerHTML;

      if (jra || jdec) {
        this.localValue = {
          ...this.localValue,
          ra: +jra,
          dec: +jdec,
          radius: 1.5
        }
        this.error = []
        if(this.usingHMS === true){
          const raDecHMS = raDectoHMS(this.localValue.ra, this.localValue.dec, 6).split(" ")
          this.localValue = {
            ...this.localValue,
            ra: raDecHMS[0].slice(1),
            dec:raDecHMS[1]
          }
          this.usingHMS = true
        }
        
      }
      else {
        this.error = ["Object not found"];
      }
      this.isLoading = false;
    })
  }
}
</script>
