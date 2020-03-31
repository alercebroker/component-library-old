const path = require('path')
const vueLoader = require('vue-loader')

module.exports = {
<<<<<<< HEAD
	title: 'ALeRCE\'s components',
	version: '1.1.1',
	exampleMode: 'expand',
	require: [
		path.join(__dirname, 'config/global.requires.js'),
		path.join(__dirname, 'config/global.styles.scss')
=======
	title: 'ALeRCE components',
    version: '0.0.0',
    exampleMode: 'collapse',
    require: [
		path.join(__dirname, 'docs/config/global.requires.js'),
		path.join(__dirname, 'docs/config/global.styles.scss')
>>>>>>> gallery
	],
	showSidebar: true,
	styleguideComponents: {
		LogoRenderer: path.join(__dirname, 'docs/styleguide/components/Logo'),
		//StyleGuideRenderer: path.join(__dirname, 'styleguide/components/StyleGuide') //https://github.com/vue-styleguidist/vue-styleguidist/blob/69c848bfcd9bcf5ee0e33053324d5ed206c85eb6/packages/vue-styleguidist/src/client/rsg-components/VsgStyleGuide/StyleGuideRenderer.js
	},
	skipComponentsWithoutExample: false,
<<<<<<< HEAD
	renderRootJsx: path.join(__dirname, 'config/styleguide.root.js'),
	validExtends: fullFilePath => !/(?=node_modules)(?!node_modules\/vuetify)/.test(fullFilePath),
	webpackConfig: {
=======
    renderRootJsx: path.join(__dirname, 'docs/config/styleguide.root.js'),
    validExtends: fullFilePath => !/(?=node_modules)(?!node_modules\/vuetify)/.test(fullFilePath),
    webpackConfig: {
>>>>>>> gallery
		module: {
			rules: [
				{
					test: /\.vue$/,
					loader: 'vue-loader'
				},
				{
					test: /\.js?$/,
					exclude: /node_modules/,
					loader: 'babel-loader'
				},
				{
					test: /\.css$/,
					use: ['style-loader', 'css-loader']
				},
				{
					test: /\.(ttf|otf|eot|woff|woff2)$/,
					use: {
						loader: "file-loader",
						options: {
							name: "fonts/[name].[ext]",
						}
					}
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
								implementation: require('sass'),
								sassOptions: {
									fiber: require('fibers')
								}
							}
						}
					]
				}
			]
		},
		plugins: [new vueLoader.VueLoaderPlugin()]
	},
	sections: [
		{
			name: "Introduction",
			sections: [
				{
					name: "Installation",
					content: "docs/installation.md",
					description: "Description for the installation section"
				},
			]
		},
		{
			name: "Components",
			components: 'src/lib-components/*.vue'
		}
	],

};