<template>
  <div>
    <v-row>
      <v-col>
        <slot :name="selected"></slot>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-radio-group v-model="selected" row>
          <v-radio
            v-for="option in options"
            :key="'radio-'+option.value"
            :label="option.text"
            :value="option.value"
          ></v-radio>
        </v-radio-group>
      </v-col>
    </v-row>
  </div>
</template>

<script>
/**
 * Component for displaying stuff and select from many options in radio buttons
 * @displayName SelectDisplay
 * @example ../../docs/examples/select-display.example.md
 */
export default {
  name: "select-display",
  props: {
    /**
     * The options for radio buttons. Each option should have
     * text and value properties.
     * 
     * Text: is the displayed label for the radio button
     * value: is the identifier for buttons and defines selected value.
     * It should match the slot name
     */
    options: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      selected: null 
    };
  }
};
</script>

<style>
</style>