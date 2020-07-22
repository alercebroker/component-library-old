import { LightCurveOptions } from './utils/light-curve-utils'

export class ApparentLightCurveOptions extends LightCurveOptions {
  getSeries() {
    const bands = [...new Set(this.detections.map((item) => item.fid))]

    this.addDetections(this.detections, bands)

    this.addErrorBars(this.detections, bands)
  }

  addDetections(detections, bands) {
    bands.forEach((band) => {
      const serie = {
        name: this.bandMap[band].name,
        type: 'scatter',
        scale: true,
        color: this.bandMap[band].color,
        symbolSize: 6,
        encode: {
          x: 0,
          y: 1,
        },
      }
      serie.data = this.formatDetections(detections, band)
      this.options.series.push(serie)
    })
  }

  addErrorBars(detections, bands) {
    bands.forEach((band) => {
      const serie = {
        name: this.bandMap[band].name,
        type: 'custom',
        scale: true,
        color: this.bandMap[band].color,
        renderItem: this.renderError,
      }
      serie.data = this.formatError(detections, band)
      this.options.series.push(serie)
    })
  }

  formatError(detections, band) {
    return detections
      .filter(function (x) {
        return x.fid === band
      })
      .map(function (x) {
        if (x.sigmapsf_corr > 1) {
          return [null, null, null]
        }
        return [
          x.mjd,
          x.magpsf_corr - x.sigmapsf_corr,
          x.magpsf_corr + x.sigmapsf_corr,
        ]
      })
  }

  formatDetections(detections, band) {
    return detections
      .filter(function (x) {
        return x.fid === band
      })
      .map(function (x) {
        return [x.mjd, x.magpsf_corr, x.candid_str, x.sigmapsf_corr]
      })
  }

  getLegend() {
    const bands = [...new Set(this.detections.map((item) => item.fid))]
    const legend = bands.map((band) => this.bandMap[band].name)
    this.options.legend.data = legend
  }
}
