aladin usage

```vue
<template>
    <aladin 
    :selectedObject="selectedSN"
    :objects="candidates"
    displayClass="class"></aladin>
</template>
<script>

export default {
  data() {
    return {
        candidates: [
            {
            class: "SN",
            meanra: 120.2053139,
            meandec: 27.4985753733333,
            oid: "ZTF20aaophpu"
            }
        ],
        selectedSN: {
            oid: "ZTF20aaophpu",
            meanra: 10,
            meandec: 90
        }
    }
  },
  beforeMount() {
    this.addAladinScript()
  },
  methods: {
      addAladinScript() {
        let scriptTag = document.createElement("script");
        scriptTag.src = "https://code.jquery.com/jquery-1.12.1.min.js";
        document.getElementsByTagName("head")[0].appendChild(scriptTag);
        scriptTag = document.createElement("script");
        scriptTag.src =
            "https://aladin.u-strasbg.fr/AladinLite/api/v2/latest/aladin.min.js";
        scriptTag.id = "aladin-script";
        document.getElementsByTagName("head")[0].appendChild(scriptTag);
        let t = this;
        scriptTag.onload = () => {
            t.ok = true;
        }
    }
  }
}
</script>
<style>
    @import "https://aladin.u-strasbg.fr/AladinLite/api/v2/latest/aladin.min.css";
</style>
```