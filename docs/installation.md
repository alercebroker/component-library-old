### ALeRCE Frontend Components Library

  ```bash
  npm install --save @alerce/components
  ```
  
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
