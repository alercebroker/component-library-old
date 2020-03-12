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
export default {
  name: "select-display",
  props: {
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