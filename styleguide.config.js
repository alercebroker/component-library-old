const path = require('path')
const vueLoader = require('vue-loader')

const docSiteUrl =
  process.env.DEPLOY_PRIME_URL ||
  'https://github.com/alercebroker/component-library'

module.exports = {
  title: 'ALeRCE components',
  version: '0.0.1',
  exampleMode: 'collapse',
  usageMode: 'expand',
  components: './components/plots/*.vue',
  ribbon: {
    text: 'Visit Github',
    url: `${docSiteUrl}`,
  },
  styleguideDir: 'dist',
  require: [
    path.resolve(__dirname, 'docs/config/global.requires.js'),
    path.resolve(__dirname, 'docs/config/global.styles.scss'),
  ],
  styleguideComponents: {
    LogoRenderer: path.join(__dirname, 'docs/styleguide/components/Logo'),
  },
  renderRootJsx: path.join(__dirname, 'docs/config/styleguide.root.js'),
  validExtends: (fullFilePath) =>
    !/(?=node_modules)(?!node_modules\/vuetify)/.test(fullFilePath),
  webpackConfig: {
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader',
          options: {
            loaders: {
              scss: ['vue-style-loader', 'css-loader', 'sass-loader'],
            },
          },
        },
        {
          test: /\.js?$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(ttf|otf|eot|woff|woff2)$/,
          use: {
            loader: 'file-loader',
            options: {
              name: 'fonts/[name].[ext]',
            },
          },
        },
        {
          test: /\.(png|jpe?g|gif)$/i,
          use: [
            {
              loader: 'file-loader',
            },
          ],
        },
        {
          test: /\.s(c|a)ss$/,
          use: [
            'vue-style-loader',
            'css-loader',
            {
              loader: 'sass-loader',
              options: {
                // implementation: require('sass'),
                // sassOptions: {
                //   fiber: require('fibers'),
                // }
                // ,
              },
            },
          ],
        },
      ],
    },
    plugins: [new vueLoader.VueLoaderPlugin()],
  },
  sections: [
    {
      name: 'Installation',
      content: 'docs/installation.md',
    },
    {
      name: 'Components',
      sections: [
        {
          name: 'Buttons',
          components: './components/buttons/*.vue',
        },
        {
          name: 'Cards',
          components: './components/cards/*.vue',
        },
        {
          name: 'Inputs',
          components: './components/inputs/*.vue',
        },
        {
          name: 'Images',
          components: './components/images/*.vue',
        },
        {
          name: 'Miscelaneous',
          components: './components/misc/*.vue',
        },
        {
          name: 'Tables',
          components: './components/tables/*.vue',
        },

        {
          name: 'Plots',
          components: './components/plots/*.vue',
        },
      ],
    },
  ],
}
