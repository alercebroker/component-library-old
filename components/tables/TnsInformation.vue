<template>
  <v-flex>
    <v-data-table
      :headers="headers"
      :items="values"
      :mobile-breakpoint="250"
      dense
      hide-default-footer
    />
    <footer-tns :tns_id="name" />
  </v-flex>
</template>
<script>
import { Vue, Component, Prop } from 'nuxt-property-decorator'
@Component
export default class TnsInformation extends Vue {
  @Prop({ type: String, default: '-' })
  type

  @Prop({ type: String, default: '-' })
  name

  @Prop({ type: Number, default: 0 })
  redshift

  headers = [
    { text: 'Type', value: 'type', sortable: false, align: 'center' },
    { text: 'Name', value: 'name', sortable: false, align: 'center' },
    { text: 'Redshift', value: 'redshift', sortable: false, align: 'center' }
  ]

  get values () {
    return [
      {
        type: this.type,
        name: this.name,
        redshift: this.redshift
      }
    ]
  }
}
</script>
<docs>
```vue
<template>
  <v-card>
    <tns-information name="2018hzd" :redshift="0.054" type="SN Ia"/>
  </v-card>
</template>
```
</docs>
