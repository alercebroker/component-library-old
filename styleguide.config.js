const { resolve } = require('path')

const docSiteUrl =
  process.env.DEPLOY_PRIME_URL ||
  'https://github.com/alercebroker/component-library'


module.exports = {
  components: './components/**/*.vue',
  renderRootJsx: resolve(__dirname, 'styleguide/styleguide.root.js'),
  ribbon: {
    text: 'Visit Github',
    url: `${docSiteUrl}`
  },
  webpackConfig: require('./webpack.config'),
  usageMode: 'expand',
  styleguideDir: 'dist',
  require: [resolve(__dirname, 'styleguide/global.requires.js')],
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
