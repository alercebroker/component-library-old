<template>
  <div id="aladin-lite-div" class="ma-0 pa-0"></div>
</template>

<script>
export default {
  props: {
    selectedObject: {
      type: Object,
      default: null
    },
    objects: {
      type: Object
    }
  },
  data() {
    return {
      aladinObject: null,
      aladin: null,
      catalog: null
    };
  },
  mounted() {
    if (document.getElementById("aladin-script")) {
      this.aladin = A.aladin("#aladin-lite-div", {
        survey: "P/PanSTARRS/DR1/color-z-zg-g",
        fov: 60,
        cooFrame: "J2000d"
      });
      if (this.objects) {
        this.addObjects(this.objects);
      }
      return; // was already loaded
    }
    this.addAladinScript();
  },
  methods: {
    onClick(object) {
      if (object) {
        this.$emit("objectSelected", this.findZTFObject(object));
        this.aladinObject = object;
      } else {
        this.aladinObject = null;
        this.$emit("objectSelected", null);
      }
    },
    findZTFObject(object) {
      return this.objects[object.data.name]
    },
    draw(source, canvasCtx, viewParams) {
      canvasCtx.beginPath();
      canvasCtx.arc(
        source.x,
        source.y,
        source.data["size"] * 2,
        0,
        2 * Math.PI,
        false
      );
      canvasCtx.closePath();
      canvasCtx.strokeStyle = "#c38";
      canvasCtx.lineWidth = 3;
      (canvasCtx.globalAlpha = 0.7), canvasCtx.stroke();
      var fov = Math.max(viewParams["fov"][0], viewParams["fov"][1]);
      // object name is displayed only if fov<10°
      if (fov > 10) {
        return;
      }
      canvasCtx.globalAlpha = 0.9;
      canvasCtx.globalAlpha = 1;
      var xShift = 20;
      canvasCtx.font = "15px Arial";
      canvasCtx.fillStyle = "#eee";
      canvasCtx.fillText(source.data["name"], source.x + xShift, source.y - 4);
      // object type is displayed only if fov<2°
      if (fov > 2) {
        return;
      }
      canvasCtx.font = "12px Arial";
      canvasCtx.fillStyle = "#abc";
      canvasCtx.fillText(
        source.data["class"],
        source.x + 2 + xShift,
        source.y + 10
      );
    },
    addObjects(objects) {
      this.aladin.removeLayers();
      let sources = [];
      Object.keys(objects).forEach(object => {
        sources.push(
          A.source(objects[object].meanra, objects[object].meandec, {
            name: object,
            size: 2,
            class: objects[object].classrf ? objects[object].classrf.text : ""
          })
        );
      });
      let catalog = A.catalog({ sourceSize: 10, shape: this.draw });
      catalog.addSources(sources);
      this.aladin.addCatalog(catalog);
      this.aladin.on("objectClicked", this.onClick);
      // this.aladin.on("objectHovered", this.onHover);
      this.catalog = catalog;
    },
    addAladinScript() {
      // add jquery
      let scriptTag = document.createElement("script");
      scriptTag.src = "https://code.jquery.com/jquery-1.12.1.min.js";
      document.getElementsByTagName("head")[0].appendChild(scriptTag);
      // add aladin
      scriptTag = document.createElement("script");
      scriptTag.src =
        "https://aladin.u-strasbg.fr/AladinLite/api/v2/latest/aladin.min.js";
      scriptTag.id = "aladin-script";
      document.getElementsByTagName("head")[0].appendChild(scriptTag);
      let t = this;
      scriptTag.onload = function() {
        t.aladin = A.aladin("#aladin-lite-div", {
          survey: "P/PanSTARRS/DR1/color-z-zg-g",
          fov: 60,
          cooFrame: "J2000d"
        });
        t.addObjects(t.objects);
      };
    }
  },
  watch: {
    objects: {
      handler: "addObjects"
    },
    selectedObject(newObject) {
      let src = this.catalog.sources.find(source => {
        return source.data.name === newObject.oid;
      });
      this.aladinObject = src;
      console.log(newObject)
      this.aladin.gotoRaDec(newObject.meanra, newObject.meandec);
    },
    aladinObject(newObject, oldObject) {
      if (newObject) newObject.select();
      if (oldObject) oldObject.deselect();
    }
  }
};
</script>

<style>
@import "https://aladin.u-strasbg.fr/AladinLite/api/v2/latest/aladin.min.css";
#aladin-lite-div {
  height: "100%";
  width: "100%";
  /* min-height: 530px; */
}
</style>