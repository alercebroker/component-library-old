<template>
  <div>
    <v-row>
      <v-col>
        <slot :name="selected" />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-radio-group v-model="selected" row>
          <div v-for="option in options" :key="'radio-' + option.value">
            <v-radio :value="option.value">
              <template v-slot:label>
                <div>
                  {{ option.text }}
                  <span v-if="option.tooltip">
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on, attrs }">
                        <v-icon align="center" v-bind="attrs" v-on="on"
                          >mdi-help-circle</v-icon
                        >
                      </template>
                      <span>{{ option.tooltip }}</span>
                    </v-tooltip>
                  </span>
                </div>
              </template>
            </v-radio>
          </div>
        </v-radio-group>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { Vue, Component, Prop } from 'nuxt-property-decorator'
@Component
export default class SelectDisplay extends Vue {
  /**
   * The options for radio buttons. Each option should have
   * text and value properties.
   *
   * Text: is the displayed label for the radio button
   * value: is the identifier for buttons and defines selected value.
   * It should match the slot name
   *
   * Optionally provide the default option true for starting with a value selected
   */
  @Prop({ type: Array, required: true }) options

  selected = null

  mounted() {
    this.selected = this.options.find((x) => {
      if ('default' in x) {
        return x.default
      }
    }).value
  }
}
</script>
