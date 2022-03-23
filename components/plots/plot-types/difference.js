import { LightCurveOptions } from './utils/light-curve-utils'

export class DifferenceLightCurveOptions extends LightCurveOptions {
  constructor(detections, nonDetections, fontColor) {
    super(detections, nonDetections, fontColor)
    this.detections = this.detections.filter((x) => x.magpsf <= 23)
    this.getSeries()
    this.getLegend()
    this.getBoundaries()
  }

  getSeries() {
    const bands = new Set(this.detections.map((item) => item.fid))
    const ndBands = new Set(this.nonDetections.map((item) => item.fid))
    this.nonDetections
      .map((item) => item.fid)
      .forEach((element) => bands.add(element))
    this.addDetections(this.detections, bands)
    this.addErrorBars(this.detections, bands)
    this.addNonDetections(this.nonDetections, ndBands)
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

  addNonDetections(nonDetections, bands) {
    bands.forEach((band) => {
      const serie = {
        name: this.bandMap[band].name + ' non-detections',
        type: 'scatter',
        scale: true,
        color: this.hexToRGB(this.bandMap[band].color, 0.5),
        symbolSize: 6,
        symbol:
          'path://M0,49.017c0-13.824,11.207-25.03,25.03-25.03h438.017c13.824,0,25.029,11.207,25.029,25.03L262.81,455.745c0,0-18.772,18.773-37.545,0C206.494,436.973,0,49.017,0,49.017z',
      }
      serie.data = this.formatNonDetections(nonDetections, band)
      this.options.series.push(serie)
    })
  }

  formatError(detections, band) {
    return detections
      .filter(function (x) {
        return x.fid === band
      })
      .map(function (x) {
        return [x.mjd, x.magpsf - x.sigmapsf, x.magpsf + x.sigmapsf]
      })
  }

  formatDetections(detections, band) {
    return detections
      .filter(function (x) {
        return x.fid === band
      })
      .map(function (x) {
        return [x.mjd, x.magpsf, x.candid, x.sigmapsf, x.isdiffpos]
      })
  }

  formatNonDetections(nonDetections, band) {
    return nonDetections
      .filter(function (x) {
        return x.fid === band && x.diffmaglim > 10
      })
      .map(function (x) {
        return [x.mjd, x.diffmaglim]
      })
  }

  getLegend() {
    let bands = Array.from(new Set(this.detections.map((item) => item.fid)))
    bands = bands.sort((x, y) => x - y)
    let legend = bands.map((band) => this.bandMap[band].name)
    legend = legend.concat(
      bands.map((band) => this.bandMap[band].name + ' non-detections')
    )
    this.options.legend.data = legend
  }

  getBoundaries() {
    const sigmas = this.detections.map((x) => x.sigmapsf)
    const maxSigma = Math.max.apply(Math, sigmas) + 0.1
    this.options.yAxis.min = (x) => (x.min - maxSigma).toFixed(1)
    this.options.yAxis.max = (x) => (x.max + maxSigma).toFixed(1)
  }
}
