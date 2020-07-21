module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: false
      }
    ]
  ],
  plugins: [
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    '@babel/plugin-transform-runtime',
    '@babel/plugin-transform-react-jsx',
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-object-rest-spread'
  ]
}
