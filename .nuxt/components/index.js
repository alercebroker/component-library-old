export { default as Logo } from '../../components/Logo.vue'
export { default as VuetifyLogo } from '../../components/VuetifyLogo.vue'
export { default as CatalogsButtons } from '../../components/buttons/CatalogsButtons.vue'
export { default as AFooter } from '../../components/misc/AFooter.vue'
export { default as AFooterTns } from '../../components/misc/AFooterTns.vue'
export { default as AHeader } from '../../components/misc/AHeader.vue'
export { default as TnsInformation } from '../../components/tables/TnsInformation.vue'

export const LazyLogo = import('../../components/Logo.vue' /* webpackChunkName: "components/Logo'}" */).then(c => c.default || c)
export const LazyVuetifyLogo = import('../../components/VuetifyLogo.vue' /* webpackChunkName: "components/VuetifyLogo'}" */).then(c => c.default || c)
export const LazyCatalogsButtons = import('../../components/buttons/CatalogsButtons.vue' /* webpackChunkName: "components/buttons/CatalogsButtons'}" */).then(c => c.default || c)
export const LazyAFooter = import('../../components/misc/AFooter.vue' /* webpackChunkName: "components/misc/AFooter'}" */).then(c => c.default || c)
export const LazyAFooterTns = import('../../components/misc/AFooterTns.vue' /* webpackChunkName: "components/misc/AFooterTns'}" */).then(c => c.default || c)
export const LazyAHeader = import('../../components/misc/AHeader.vue' /* webpackChunkName: "components/misc/AHeader'}" */).then(c => c.default || c)
export const LazyTnsInformation = import('../../components/tables/TnsInformation.vue' /* webpackChunkName: "components/tables/TnsInformation'}" */).then(c => c.default || c)
