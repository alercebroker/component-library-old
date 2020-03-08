# ALeRCE Frontend Components Library

## Installation

  `npm install --save @alerce/components`

*This library uses Vuetify. Go to https://vuetifyjs.com/en/getting-started/quick-start to learn how to properly set it up*

## Usage

```javascript
<template>
  <component-name />
</template>
<script>
import {ComponentName} from "@alerce/components"
export default {
  components: {
    ComponentName
  }
  ...
}
</script>
```

## Components

### CardStamps
Props: 
- detections: Array with detections, where each detection must have `candid_str` field.
- object: Text with the object id
- dark: Boolean defining the style of the card. (Default is true)
