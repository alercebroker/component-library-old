import vuetify from '../plugins/vuetify'
export default (previewComponent) => {
  // https://vuejs.org/v2/guide/render-function.html
  return {
    vuetify,
    render (createElement) {
      return createElement(
        'v-app',
        {
          props: {
            class: 'v-application'
          }
        },
        [createElement(Object.assign(previewComponent))]
      )
    }
  }
}
