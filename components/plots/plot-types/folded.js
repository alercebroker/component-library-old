import { LightCurveOptions } from './utils/light-curve-utils'

export class FoldedLightCurveOptions extends LightCurveOptions {
  constructor(detections, nonDetections, fontColor, period) {
    super(detections, nonDetections, fontColor)
    this.period = period
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
    const folded_1 = detections
      .filter(function (x) {
        return x.fid === band && x.magpsf_corr != null && x.corrected
      })
      .map((x) => {
        const phase = (x.mjd % period) / period
        return [phase, x.magpsf_corr, x.candid, x.sigmapsf_corr, x.isdiffpos]
      })
    const folded_2 = folded_1.map((x) => {
      return [x[0] + 1, x[1], x[2], x[3], x[4]]
    })
    return folded_1.concat(folded_2)
  }

  formatError(detections, band, period) {
    const errors_1 = detections
      .filter(function (x) {
        return x.fid === band && x.corrected && x.magpsf_corr != null
      })
      .map(function (x) {
        if (x.sigmapsf_corr > 1) {
          return [null, null, null]
        }
        const phase = (x.mjd % period) / period
        return [
          phase,
          x.magpsf_corr - x.sigmapsf_corr,
          x.magpsf_corr + x.sigmapsf_corr,
        ]
      })
    
      const errors_2 = errors_1.map((x) => {
        if (x[0] === null) {
          return x
        }
        return [x[0] + 1, x[1], x[2]]
      })
      return errors_1.concat(errors_2)
  }

  getLegend() {
    const bands = Array.from(new Set(this.detections.map((item) => item.fid)))
    let legend = bands.map((band) => this.bandMap[band].name)
    legend = legend.concat(
      bands.map((band) => this.bandMap[band].name + ' detections')
    )
    this.options.legend.data = legend
    this.options.title.subtext = 'Period: ' + this.period.toFixed(3) + ' days'
  }
}
