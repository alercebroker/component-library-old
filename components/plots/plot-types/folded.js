import { LightCurveOptions } from './utils/light-curve-utils'

export class FoldedLightCurveOptions extends LightCurveOptions {
  constructor (detections, nonDetections, fontColor, period) {
    super(detections, nonDetections, fontColor)
    this.period = period
  }

  getSeries (data) {
    const bands = Array.from(new Set(this.detections.map(item => item.fid)))
    this.addDetections(this.detections, bands, this.period)
    this.addErrorBars(this.detections, bands, this.period)
  }

  addDetections (detections, bands, period) {
    bands.forEach((band) => {
      const serie = {
        name: this.bandMap[band].name,
        type: 'scatter',
        scale: true,
        color: this.bandMap[band].color,
        symbolSize: 6,
        encode: {
          x: 0,
          y: 1
        }
      }
      serie.data = this.formatDetections(detections, band, period)
      this.options.series.push(serie)
    })
  }

  addErrorBars (detections, bands, period) {
    bands.forEach((band) => {
      const serie = {
        name: this.bandMap[band].name,
        type: 'custom',
        scale: true,
        color: this.bandMap[band].color,
        renderItem: this.renderError
      }
      serie.data = this.formatError(detections, band, period)
      this.options.series.push(serie)
    })
  }

  formatDetections (detections, band, period) {
    return detections
      .filter(function (x) {
        return x.fid === band && x.magpsf_corr != null
      })
      .map((x) => {
        const phase = (x.mjd % period) / period
        return [phase, x.magpsf_corr, x.candid_str, x.sigmapsf_corr]
      })
      .concat(
        detections
          .filter(function (x) {
            return x.fid === band && x.magpsf_corr != null
          })
          .map(function (x) {
            let phase = (x.mjd % period) / period
            phase += 1
            return [phase, x.magpsf_corr, x.candid_str, x.sigmapsf_corr]
          })
      )
  }

  formatError (detections, band, period) {
    return detections
      .filter(function (x) {
        return x.fid === band
      })
      .map(function (x) {
        if (x.sigmapsf_corr > 1) {
          return [null, null, null]
        }
        const phase = (x.mjd % period) / period
        return [
          phase,
          x.magpsf_corr - x.sigmapsf_corr,
          x.magpsf_corr + x.sigmapsf_corr
        ]
      })
      .concat(
        detections
          .filter(function (x) {
            return x.fid === band
          })
          .map(function (x) {
            let phase = (x.mjd % period) / period
            phase += 1
            return [
              phase,
              x.magpsf_corr - x.sigmapsf_corr,
              x.magpsf_corr + x.sigmapsf_corr
            ]
          })
      )
  }

  getLegend () {
    const bands = Array.from(new Set(this.detections.map(item => item.fid)))
    let legend = bands.map(band => this.bandMap[band].name)
    legend = legend.concat(
      bands.map(band => this.bandMap[band].name + ' detections')
    )
    this.options.legend.data = legend
  }
}
