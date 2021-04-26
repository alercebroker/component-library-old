<template>
  <v-footer padless>
    <v-card tile width="100%" class="text-center">
      <v-card-text v-if="social">
        <v-btn
          v-for="link in links"
          :key="link.icon"
          class="mx-4"
          icon
          :href="link.to"
          target="_blank"
        >
          <v-icon size="24px">{{ link.icon }}</v-icon>
        </v-btn>
      </v-card-text>
      <v-divider v-if="social" />
      <v-card-text>
        {{ new Date().getFullYear() }} —
        <strong>ALeRCE</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>
<script>
import { Vue, Component, Prop } from 'nuxt-property-decorator'
@Component
export default class AFooter extends Vue {
  @Prop({ type: Boolean, default: false }) social

  links = [
    {
      to: 'https://github.com/alercebroker/',
      icon: 'mdi-github',
    },
    {
      to: 'https://twitter.com/alercebroker',
      icon: 'mdi-twitter',
    },
    {
      to: 'https://instagram.com/alercebroker',
      icon: 'mdi-instagram',
    },
    {
      to: '',
      icon: 'mdi-slack',
    },
  ]
}
</script>
<docs>
```vue
<template>
  <div>

    <v-container>
      <v-row color="primary">
        <v-col cols="12" sm="6" md="3">
          <v-switch
            v-model="social"
            label="Social"
          />
        </v-col>

      </v-row>
    </v-container>

    <v-container>
      <a-footer :social="social"/>
    </v-container>

  </div>
</template>
<script>
export default {
  data() {
    return {
      social: false,
    }
  },
}
</script>
```
</docs>
