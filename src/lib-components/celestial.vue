<template>
  <v-row>
    <v-col>
      <div ref="celestialDiv" id="celestialDiv">
        <div ref="celestial-map" id="celestial-map"></div>
        <p class="text-center">Smaller circles means lower probability</p>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import "d3-celestial/celestial.js";
import * as d3 from "d3-celestial/lib/d3";
// import geo from "d3-celestial/lib/d3.geo.projection";
export default {
  props: {
    candidates: {
      type: Object,
      required: true
    },
    selectedSN: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      config: {
        datapath: "celestial-data",
        planets: { show: false },
        stars: { show: false },
        dsos: { show: false, limit: 30 },
        constellations: { show: false },
        transform: "equatorial",
        background: {
          fill: "#8778d2",
          opacity: 1
        },
        mw: {
          show: true,
          style: {
            fill: "#ffffff",
            opacity: 0.3
          }
        },
        lines: {
          graticule: {
            show: true,
            stroke: "#cccccc",
            width: 0.6,
            opacity: 0.8, // Show graticule lines
            // grid values: "outline", "center", or [lat,...] specific position
            lon: {
              pos: ["center"],
              fill: "#eee",
              font: "10px Helvetica, Arial, sans-serif"
            },
            // grid values: "outline", "center", or [lon,...] specific position
            lat: {
              pos: ["center"],
              fill: "#eee",
              font: "10px Helvetica, Arial, sans-serif"
            }
          }
        }
      }
    };
  },
  mounted() {
    if (this.$refs["celestialDiv"]) {
      Celestial.clear();
      var jsonSN = {
        type: "FeatureCollection",
        // this is an array, add as many objects as you want
        features: this.points
      };
      var pointStyle = {
        stroke: "#534B8C",
        width: 3,
        fill: "rgba(255, 204, 255, 0.8)"
      };
      var selectedStyle = {
        stroke: "#B3D3F4",
        width: 3,
        fill: "#2C87E2"
      };
      var textStyle = {
        font: "bold 15px Helvetica, Arial, sans-serif",
        align: "left",
        baseline: "bottom"
      };
      let config = this.config;
      Celestial.add({
        type: "raw",
        callback: function(error, json) {
          if (error) return console.warn(error);
          // Load the geoJSON file and transform to correct coordinate system, if necessary
          var dsn = Celestial.getData(jsonSN, config.transform);
          // Add to celestial objects container in d3
          Celestial.container
            .selectAll(".sn")
            .data(dsn.features)
            .enter()
            .append("path")
            .attr("class", "sn")
            .attr("id", function(d) {
              return d.id;
            }); // Trigger redraw to display changes
          Celestial.redraw();
        },
        redraw: function() {
          // Select the added objects by class name as given previously
          Celestial.container.selectAll(".sn").each(function(d) {
            // If point is visible (this doesn't work automatically for points)
            if (Celestial.clip(d.geometry.coordinates)) {
              // get point coordinates
              var pt = Celestial.mapProjection(d.geometry.coordinates);
              // object radius in pixel, could be varable depending on e.g. dimension or magnitude
              var r = 10 * d.properties.prob; // replace 20 with dimmest magnitude in the data
              // draw on canvas
              //  Set object styles fill color, line color & width etc.
              Celestial.setStyle(pointStyle);
              // Start the drawing path
              Celestial.context.beginPath();
              // Thats a circle in html5 canvas
              Celestial.context.arc(pt[0], pt[1], r, 0, 2 * Math.PI);
              // Finish the drawing path
              Celestial.context.closePath();
              // Draw a line along the path with the prevoiusly set stroke color and line width
              Celestial.context.stroke();
              // Fill the object path with the prevoiusly set fill color
              Celestial.context.fill();
              // Set text styles
              // Celestial.setTextStyle(textStyle);
              // and draw text on canvas
              // Celestial.context.fillText(d.properties.name, pt[0] + r - 1, pt[1] - r + 1);
            }
          });
          Celestial.container.selectAll(".selectedSN").each(function(d) {
            // If point is visible (this doesn't work automatically for points)
            if (Celestial.clip(d.geometry.coordinates)) {
              // get point coordinates
              var pt = Celestial.mapProjection(d.geometry.coordinates);
              // object radius in pixel, could be varable depending on e.g. dimension or magnitude
              var r = 10 * d.properties.prob; // replace 20 with dimmest magnitude in the data
              // draw on canvas
              //  Set object styles fill color, line color & width etc.
              Celestial.setStyle(selectedStyle);
              // Start the drawing path
              Celestial.context.beginPath();
              // Thats a circle in html5 canvas
              Celestial.context.arc(pt[0], pt[1], r, 0, 2 * Math.PI);
              // Finish the drawing path
              Celestial.context.closePath();
              // Draw a line along the path with the prevoiusly set stroke color and line width
              Celestial.context.stroke();
              // Fill the object path with the prevoiusly set fill color
              Celestial.context.fill();
              // Set text styles
              // Celestial.setTextStyle(textStyle);
              // and draw text on canvas
              // Celestial.context.fillText(d.properties.name, pt[0] + r - 1, pt[1] - r + 1);
            }
          });
        }
      });
      Celestial.display(config);
    }
  },
  computed: {
    points() {
      let points = [];
      Object.keys(this.candidates).forEach(oid => {
        let prob = this.candidates[oid]["pclassearly"],
          ra = this.candidates[oid]["meanra"],
          dec = this.candidates[oid]["meandec"];
        points.push({
          type: "Feature",
          id: oid,
          properties: {
            // Name
            name: oid,
            type: "sn",
            // magnitude, dimension in arcseconds or any other size criterion
            //"mag": 10,
            //"dim": 30
            prob: prob
          },
          geometry: {
            // the location of the object as a [ra, dec] array in degrees [-180..180, -90..90]
            type: "Point",
            coordinates: [ra, dec]
          }
        });
      });
      return points;
    }
  },
  watch: {
    selectedSN(newSN, oldSN) {
      if (oldSN) {
        Celestial.container.select("#" + oldSN.oid).attr("class", "sn");
      }
      Celestial.container
        .select("#" + newSN.oid)
        .attr("class", "selectedSN");
      Celestial.redraw();
      this.zoomSN();
    }
  },
  methods: {
    zoomSN: function() {
      let ra = this.selectedSN["meanra"],
        dec = this.selectedSN["meandec"],
        oid = this.selectedSN["oid"];
      let pt = [ra, dec, 0];
      let anim = [];
      anim.push({ param: "zoom", value: -0.3, duration: 2 });
      anim.push({ param: "center", value: pt, duration: 250 });
      anim.push({ param: "zoom", value: 1.3, duration: 2 });
      Celestial.animate(anim, false);
    }
  }
};
</script>

<style>
</style>