<template>
  <v-footer app padless>
    <v-card flat tile width="100%" class="white--text text-center">
      <v-card-text v-if="social">
        <v-btn
          v-for="link in links"
          :key="link.icon"
          class="mx-4 white--text"
          icon
          :href="link.to"
          target="_blank"
        >
          <v-icon size="24px">
            {{ link.icon }}
          </v-icon>
        </v-btn>
      </v-card-text>
      <v-divider v-if="social" />
      <v-card-text class="white--text">
        {{ new Date().getFullYear() }} —
        <strong>ALeRCE</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>
<script>
import { Vue, Component, Prop } from 'nuxt-property-decorator'
@Component({})
export default class Footer extends Vue {
  @Prop({ type: Boolean, default: false })
  social;

  links = [
    {
      to: 'https://github.com/alercebroker/',
      icon: 'mdi-github'
    },
    {
      to: 'https://twitter.com/alercebroker',
      icon: 'mdi-twitter'
    },
    {
      to: 'https://instagram.com/alercebroker',
      icon: 'mdi-instagram'
    },
    {
      to: '',
      icon: 'mdi-slack'
    }
  ]
}
</script>
