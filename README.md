# ALeRCE Frontend Components Library

## Installation

  `npm install --save @alerce/components`
  
### Requirements

- This library uses Vuetify. Go to https://vuetifyjs.com/en/getting-started/quick-start to learn how to properly set it up
- Celestial component depends on [d3-celestial](https://github.com/ofrohn/d3-celestial) library.
  + Copy the following files from `data` folder *constellations.bounds.json*, *constellations.json*, *constellations.lines.json*, *dsos.bright.json*, *mw.json*, *planets.json*, *stars.6.json* and put them in your project's `public/celestial-data` folder.

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
- dark: Boolean defining the style of the card. (Default is false)
- flat: Boolean defining the style of the card. (Default is false)

### Celestial
Props:
- candidates: (required) Object with the following structure.
  ```json
  "<object_id>": {
    "pclassearly": "<float>",
    "meanra": "<float>",
    "meandec": "<float>"
  }
  ```
