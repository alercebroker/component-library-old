export { default as Logo } from '../../components/Logo.vue'
export { default as VuetifyLogo } from '../../components/VuetifyLogo.vue'
export { default as CatalogsButtons } from '../../components/buttons/CatalogsButtons.vue'
export { default as AAladin } from '../../components/misc/AAladin.vue'
export { default as AFooterTns } from '../../components/misc/AFooterTns.vue'
export { default as AHeader } from '../../components/misc/AHeader.vue'
export { default as Footer } from '../../components/misc/Footer.vue'
export { default as LightCurvePlot } from '../../components/plots/LightCurvePlot.vue'
export { default as RadarPlot } from '../../components/plots/RadarPlot.vue'
export { default as TnsInformation } from '../../components/tables/TnsInformation.vue'
export { default as AstroDates } from '../../components/utils/AstroDates.js'
export { default as Apparent } from '../../components/plots/plot-types/apparent.js'
export { default as Difference } from '../../components/plots/plot-types/difference.js'
export { default as Folded } from '../../components/plots/plot-types/folded.js'
export { default as LightCurveUtils } from '../../components/plots/plot-types/utils/light-curve-utils.js'

export const LazyLogo = import('../../components/Logo.vue' /* webpackChunkName: "components/Logo'}" */).then(c => c.default || c)
export const LazyVuetifyLogo = import('../../components/VuetifyLogo.vue' /* webpackChunkName: "components/VuetifyLogo'}" */).then(c => c.default || c)
export const LazyCatalogsButtons = import('../../components/buttons/CatalogsButtons.vue' /* webpackChunkName: "components/buttons/CatalogsButtons'}" */).then(c => c.default || c)
export const LazyAAladin = import('../../components/misc/AAladin.vue' /* webpackChunkName: "components/misc/AAladin'}" */).then(c => c.default || c)
export const LazyAFooterTns = import('../../components/misc/AFooterTns.vue' /* webpackChunkName: "components/misc/AFooterTns'}" */).then(c => c.default || c)
export const LazyAHeader = import('../../components/misc/AHeader.vue' /* webpackChunkName: "components/misc/AHeader'}" */).then(c => c.default || c)
export const LazyFooter = import('../../components/misc/Footer.vue' /* webpackChunkName: "components/misc/Footer'}" */).then(c => c.default || c)
export const LazyLightCurvePlot = import('../../components/plots/LightCurvePlot.vue' /* webpackChunkName: "components/plots/LightCurvePlot'}" */).then(c => c.default || c)
export const LazyRadarPlot = import('../../components/plots/RadarPlot.vue' /* webpackChunkName: "components/plots/RadarPlot'}" */).then(c => c.default || c)
export const LazyTnsInformation = import('../../components/tables/TnsInformation.vue' /* webpackChunkName: "components/tables/TnsInformation'}" */).then(c => c.default || c)
export const LazyAstroDates = import('../../components/utils/AstroDates.js' /* webpackChunkName: "components/utils/AstroDates'}" */).then(c => c.default || c)
export const LazyApparent = import('../../components/plots/plot-types/apparent.js' /* webpackChunkName: "components/plots/plot-types/apparent'}" */).then(c => c.default || c)
export const LazyDifference = import('../../components/plots/plot-types/difference.js' /* webpackChunkName: "components/plots/plot-types/difference'}" */).then(c => c.default || c)
export const LazyFolded = import('../../components/plots/plot-types/folded.js' /* webpackChunkName: "components/plots/plot-types/folded'}" */).then(c => c.default || c)
export const LazyLightCurveUtils = import('../../components/plots/plot-types/utils/light-curve-utils.js' /* webpackChunkName: "components/plots/plot-types/utils/light-curve-utils'}" */).then(c => c.default || c)
