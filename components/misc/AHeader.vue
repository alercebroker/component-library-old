<template>
  <v-app-bar dense>
    <a :to="{'path':'/'}">
      <v-img :src="_logo" max-width="40px" class="mr-4" />
    </a>
    <v-toolbar-title class="mr-4">
      {{ title }}
    </v-toolbar-title>
    <v-spacer />
    <v-toolbar-items v-if="items">
      <v-btn
        v-for="item in items"
        :key="item.to"
        :href="item.to"
        class="pl-5 pr-5 d-none d-md-flex text-capitalize"
        target="_blank"
        text
      >
        {{ item.title }}
      </v-btn>
    </v-toolbar-items>
    <alerce-bar-options :title="title" />
  </v-app-bar>
</template>
<script>
import { Vue, Component, Prop } from 'nuxt-property-decorator'
@Component({})
export default class AHeader extends Vue {
  @Prop({ type: String, default: 'ALeRCE Title' })
  title

  @Prop({ type: Array, default: () => [] })
  items

  logoWhite = 'https://alerce-static.s3.amazonaws.com/logos/footerAlerceWhite.png'
  logoBlue = 'https://alerce-static.s3.amazonaws.com/logos/footerAlerce.png'

  get _logo () {
    if (this.$vuetify.theme.isDark) {
      return this.logoWhite
    } else {
      return this.logoBlue
    }
  }
}
</script>
