const { resolve } = require('path')
const { VueLoaderPlugin } = require('vue-loader')

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
  webpackConfig: {
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader'
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: require('./babel.config')
          }
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader', 'sass-loader']
        },
        {
          test: /\.s(c|a)ss$/,
          use: [
            'vue-style-loader',
            'css-loader',
            {
              loader: 'sass-loader',
              // Requires sass-loader@^8.0.0
              options: {
                implementation: require('sass'),
                sassOptions: {
                  fiber: require('fibers')
                  // indentedSyntax: true // optional
                }
              }
            }
          ]
        },
        {
          test: /\.(woff(2)?|ttf|eot)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                outputPath: 'fonts/'
              }
            }
          ]
        }
      ]
    },
    resolve: {
      extensions: ['.js', '.vue']
    },
    plugins: [new VueLoaderPlugin()]
  },
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
