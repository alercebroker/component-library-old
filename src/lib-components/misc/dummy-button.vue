<template>
  <div>
    <p>Long-form v-model example</p>
    <input :value="myDataProperty" @input="updateMyProperty($event)"/>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class App extends Vue {
  // Data property
  myDataProperty: string;

  // Lifecycle hook
  mounted () {
    this.myDataProperty = 'Boop'
  }

  // Component method
  updateMyProperty ($event) {
    this.myDataProperty = $event.target.value
  }
}
</script>