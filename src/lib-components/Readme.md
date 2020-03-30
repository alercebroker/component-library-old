card-stamps example:

```vue
<template>
    <card-stamps :detections="detections" :object="oid" flat></card-stamps>
</template>
<script>

import axios from "axios";

export default {
  data() {
    return {
        detections: [],
        oid: "ZTF20aaophpu"
    }
  },
  mounted(){
      axios
      .post("https://ztf.alerce.online/get_detections", { oid: this.oid })
      .then(response => {
        this.detections = response.data.result.detections;
      });
  }
}
</script>
```