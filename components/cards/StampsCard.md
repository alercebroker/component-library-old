```vue
<template>
  <stamp-card
    v-model="selectedDetection"
    :detections="detections"
    :object="oid"
  />
</template>
<script>
export default {
  data: () => {
    return {
      selectedDetection: 0,
    }
  },
}
</script>
```
