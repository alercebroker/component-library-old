<template>
  <v-card>
    <slot name="title">
      <v-card-title>
        <span class="headline">{{ title }}</span>
      </v-card-title>
    </slot>
    <v-card-text>
      <slot name="description">
        <p>
          For more information read
          <a
            target="_blank"
            href="https://zwickytransientfacility.github.io/ztf-avro-alert/schema.html"
            >the ZTF Schema.</a
          >
        </p>
      </slot>
      <slot name="table">
        <v-simple-table dense>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">Key</th>
                <th class="text-left">Value</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in formattedData" :key="item.key">
                <td>{{ item.key }}</td>
                <td>{{ item.value }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </slot>
    </v-card-text>
    <slot name="actions"></slot>
  </v-card>
</template>

<script>
import { Vue, Component, Prop } from 'nuxt-property-decorator'
@Component
export default class FullAvroTable extends Vue {
  @Prop({ type: Object, default: () => {} }) avro
  @Prop({ type: String, default: 'Alert Information' }) title

  get formattedData() {
    const data = Object.keys(this.avro).map((key) => {
      return { key, value: this.avro[key] }
    })
    return data
  }
}
</script>
