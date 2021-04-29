import { LightCurveOptions } from './utils/light-curve-utils'

export class FoldedLightCurveOptions extends LightCurveOptions {
  constructor(detections, nonDetections, fontColor, period) {
    super(detections, nonDetections, fontColor)
    this.detections = this.detections.filter(
      (x) => x.magpsf_corr <= 23 && x.sigmapsf_corr_ext < 1
    )
    this.period = period
    this.getSeries()
    this.getLegend()
    this.getBoundaries()
  }

  getSeries(data) {
    const bands = Array.from(new Set(this.detections.map((item) => item.fid)))
    this.addDetections(this.detections, bands, this.period)
    this.addErrorBars(this.detections, bands, this.period)
  }

  addDetections(detections, bands, period) {
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
      serie.data = this.formatDetections(detections, band, period)
      this.options.series.push(serie)
    })
  }

  addErrorBars(detections, bands, period) {
    bands.forEach((band) => {
      const serie = {
        name: this.bandMap[band].name,
        type: 'custom',
        scale: true,
        color: this.bandMap[band].color,
        renderItem: this.renderError,
      }
      serie.data = this.formatError(detections, band, period)
      this.options.series.push(serie)
    })
  }

  formatDetections(detections, band, period) {
    const folded1 = detections
      .filter((x) => x.fid === band && x.corrected)
      .map((x) => {
        const phase = (x.mjd % period) / period
        return [
          phase,
          x.magpsf_corr,
          x.candid,
          x.sigmapsf_corr_ext,
          x.isdiffpos,
        ]
      })
    const folded2 = folded1.map((x) => {
      return [x[0] + 1, x[1], x[2], x[3], x[4]]
    })
    return folded1.concat(folded2)
  }

  formatError(detections, band, period) {
    const errors1 = detections
      .filter(function(x) {
        return (
          x.fid === band &&
          x.corrected &&
          x.magpsf_corr != null &&
          x.magpsf_corr < 100
        )
      })
      .map(function(x) {
        const phase = (x.mjd % period) / period
        return [
          phase,
          x.magpsf_corr - x.sigmapsf_corr_ext,
          x.magpsf_corr + x.sigmapsf_corr_ext,
        ]
      })

    const errors2 = errors1.map((x) => {
      if (x[0] === null) {
        return x
      }
      return [x[0] + 1, x[1], x[2]]
    })
    return errors1.concat(errors2)
  }

  getLegend() {
    const bands = Array.from(new Set(this.detections.map((item) => item.fid)))
    let legend = bands.map((band) => this.bandMap[band].name)
    legend = legend.concat(
      bands.map((band) => this.bandMap[band].name + ' detections')
    )
    this.options.legend.data = legend
    this.options.title.subtext = 'Period: ' + this.period + ' days'
  }

  getBoundaries() {
    const sigmas = this.detections.map((x) => x.sigmapsf_corr_ext)
    const maxSigma = Math.max.apply(Math, sigmas) + 0.1
    this.options.yAxis.min = (x) => (x.min - maxSigma).toFixed(1)
    this.options.yAxis.max = (x) => (x.max + maxSigma).toFixed(1)
  }
}
