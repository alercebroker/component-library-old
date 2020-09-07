import Vuetify from 'vuetify'

export default (previewComponent) => {
  // https://vuejs.org/v2/guide/render-function.html
  return {
    vuetify: new Vuetify(),
    render(createElement) {
      return createElement(
        'v-app',
        {
          props: {
            id: 'v-app',
          },
        },
        [createElement(Object.assign(previewComponent))]
      )
    },
  }
}
