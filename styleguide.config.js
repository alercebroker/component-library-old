const { resolve } = require('path')

const docSiteUrl =
  process.env.DEPLOY_PRIME_URL ||
  'https://github.com/alercebroker/component-library'

module.exports = {
  components: './components/plots/*.vue',
  renderRootJsx: resolve(__dirname, 'styleguide/styleguide.root.js'),
  // validExtends: fullFilePath =>
  //   !/(?=node_modules)(?!node_modules\/vuetify)/.test(fullFilePath),
  ribbon: {
    text: 'Visit Github',
    url: `${docSiteUrl}`
  },
  webpackConfig: require('./webpack.config'),
  usageMode: 'expand',
  exampleMode: 'collapse',
  styleguideDir: 'dist',
  require: [
    resolve(__dirname, 'styleguide/global.requires.js'),
    resolve(__dirname, 'styleguide/global.styles.scss')
  ],
  sections: [
    {
      name: 'Introduction'
    },
    {
      name: 'Installation',
      description: 'Installation'
    },
    {
      name: 'Components',
      sections: [
        {
          name: 'Buttons',
          components: './components/buttons/*.vue'
        },
        {
          name: 'Miscelaneous',
          components: './components/misc/*.vue'
        },
        {
          name: 'Tables',
          components: './components/tables/*.vue'
        },
        {
          name: 'Plots',
          components: './components/plots/*.vue'
        }
      ]
    }
  ]
}
