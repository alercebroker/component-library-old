<template>
  <v-flex>
    <v-data-table
      :headers="headers"
      :items="values"
      :mobile-breakpoint="250"
      :loading="loading"
      dense
      hide-default-footer
    />
    <alerce-footer-tns
      :discoverer="discoverer"
      :reporter="reporter"
      :tnsId="name"
    />
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

  @Prop({ type: Number | String, default: null })
  redshift

  @Prop({ type: String, default: null })
  discoverer

  @Prop({ type: String, default: null })
  reporter

  @Prop({ type: Boolean })
  loading

  headers = [
    { text: 'Type', value: 'type', sortable: false, align: 'center' },
    { text: 'Name', value: 'name', sortable: false, align: 'center' },
    { text: 'Redshift', value: 'redshift', sortable: false, align: 'center' },
  ]

  get values() {
    return [
      {
        type: this.type,
        name: this.name,
        redshift: this.redshift,
      },
    ]
  }
}
</script>
