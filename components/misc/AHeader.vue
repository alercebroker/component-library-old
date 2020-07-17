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
    <bar-options :title="title" />
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
<docs>
```vue
<template>
  <div>

    <v-container>
      <v-row color="primary">
        <v-col cols="12" sm="6" md="3">
          <v-text-field
            v-model="title"
            label="Title"
          />
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <v-btn @click="items.push({title: 'Example', to: '/'})">
            Add item
          </v-btn>
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <v-btn @click="items = []; title = 'my title'">
            Clear
          </v-btn>
        </v-col>
      </v-row>
      <v-row>
        {{ items }}
      </v-row>
    </v-container>

    <v-container>
      <a-header :title="title" :items="items"/>
    </v-container>

  </div>
</template>
<script>
export default {
  data() {
    return {
      title: 'my title',
      items: [
        {
          title: 'Example',
          to: '/'
        }
      ]
    }
  }
}
</script>
```
</docs>