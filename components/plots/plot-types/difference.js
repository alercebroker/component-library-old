import { renderError, formatTooltip, bandMap } from "./utils/light-curve-utils"
export default function difference(plotData) {
  return {
    grid: {
      left: "7%",
      right: "5%"
    },
    title: {
      text: "Light Curve",
      left: "center",
      textStyle: {
        fontWeight: "lighter"
      }
    },
    tooltip: {
      show: true,
      trigger: "axis",
      axisPointer: {
        type: "cross",
        label: {
          backgroundColor: "#505765"
        }
      },
      formatter: formatTooltip
    },
    toolbox: {
      show: true,
      showTitle: true,
      feature: {
        dataZoom: {
          show: true,
          title: {
            zoom: "Zoom",
            back: "Back"
          },
          icon: {
            zoom:
              "M11,4A7,7 0 0,1 18,11C18,12.5 17.5,14 16.61,15.19L17.42,16H18L23,21L21,23L16,18V17.41L15.19,16.6C12.1,18.92 7.71,18.29 5.39,15.2C3.07,12.11 3.7,7.72 6.79,5.4C8,4.5 9.5,4 11,4M10,7V10H7V12H10V15H12V12H15V10H12V7H10M1,1V8L8,1H1Z",
            back:
              "M21,11H6.83L10.41,7.41L9,6L3,12L9,18L10.41,16.58L6.83,13H21V11Z"
          }
        },
        restore: {
          show: true,
          title: "Restore"
        }
        // myFeature: {
        //     show: true,
        //     title: "Help",
        //     icon:
        //         "M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M11,17H13V11H11V17Z",
        //     onclick: function(event) {
        //         // this.showHelp = true;
        //     }
        // }
      },
      tooltip: {
        // same as option.tooltip
        // show: true,
        formatter: function (param) {
          return "<div>" + param.title + "</div>"; // user-defined DOM structure
        },
        backgroundColor: "#222",
        textStyle: {
          fontSize: 12
        },
        extraCssText: "box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);" // user-defined CSS styles
      }
    },
    legend: {
      data: getLegend(plotData),//["g", "r", "g non-detections", "r non-detections"],
      bottom: 0
    },
    xAxis: {
      name: "Modified Julian Dates",
      nameLocation: "center",
      scale: true,
      type: "value",
      splitLine: {
        show: false
      },
      nameTextStyle: {
        padding: 7
      }
    },
    yAxis: {
      name: "Magnitude",
      nameLocation: "center",
      type: "value",
      scale: true,
      splitLine: {
        show: false
      },
      inverse: true,
      nameTextStyle: {
        padding: 25
      }
    },
    series: getSeries(plotData)
  }
};

function getSeries(data) {
  let bands = [... new Set(data.detections.map(item => item.fid))];
  let series = []
  bands.forEach(band => {
    let serie = {
      name: bandMap[band].name,
      type: "scatter",
      scale: true,
      color: bandMap[band].color,
      symbolSize: 6,
      encode: {
        x: 0,
        y: 1
      }
    }
    serie.data = formatDetections(data.detections, band)
    series.push(serie)
  })
  bands.forEach(band => {
    let serie = {
      name: bandMap[band].name,
      type: "custom",
      scale: true,
      color: bandMap[band].color,
      renderItem: renderError
    }
    serie.data = formatError(data.detections, band)
    series.push(serie)
  })
  bands.forEach(band => {
    let serie = {
      name: bandMap[band].name + " non-detections",
      type: "scatter",
      scale: true,
      color: hexToRGB(bandMap[band].color, 0.5),
      symbolSize: 6,
      symbol: "path://M0,49.017c0-13.824,11.207-25.03,25.03-25.03h438.017c13.824,0,25.029,11.207,25.029,25.03L262.81,455.745c0,0-18.772,18.773-37.545,0C206.494,436.973,0,49.017,0,49.017z"
    }
    serie.data = formatNonDetections(data.nonDetections, band)
    series.push(serie)
  })
  return series
}

function hexToRGB(hex, alpha) {
  var r = parseInt(hex.slice(1, 3), 16),
    g = parseInt(hex.slice(3, 5), 16),
    b = parseInt(hex.slice(5, 7), 16);

  if (alpha) {
    return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
  } else {
    return "rgb(" + r + ", " + g + ", " + b + ")";
  }
}

function formatDetections(detections, band) {
  return detections
    .filter(function (x) {
      return x.fid == band;
    })
    .map(function (x) {
      return [x.mjd, x.magpsf, x.candid_str, x.sigmapsf];
    });
}

function formatNonDetections(non_detections, band) {
  return non_detections
    .filter(function (x) {
      return x.fid == band && x.diffmaglim > 10;
    })
    .map(function (x) {
      return [x.mjd, x.diffmaglim];
    });
}

function formatError(detections, band) {
  return detections
    .filter(function (x) {
      return x.fid == band;
    })
    .map(function (x) {
      if (x.sigmapsf_corr > 1) return [null, null, null]
      return [x.mjd, x.magpsf - x.sigmapsf, x.magpsf + x.sigmapsf]
    })
}


function getLegend(data) {
  let bands = [... new Set(data.detections.map(item => item.fid))];
  let legend = bands.map(band => bandMap[band].name)
  legend = legend.concat(bands.map(band => bandMap[band].name + " non-detections"))
  return legend
}