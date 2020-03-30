const path = require('path')
const vueLoader = require('vue-loader')

module.exports = {
    title: 'ALeRCE\'s components',
    version: '1.1.1',
    exampleMode: 'expand',
    require: [
		path.join(__dirname, 'config/global.requires.js'),
		path.join(__dirname, 'config/global.styles.scss')
	],
    renderRootJsx: path.join(__dirname, 'config/styleguide.root.js'),
    validExtends: fullFilePath => !/(?=node_modules)(?!node_modules\/vuetify)/.test(fullFilePath),
    webpackConfig: {
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
            sections: [
                {
                    name: "Images",
                    content: "docs/images.md",
                    components: ['src/*components/card-stamps.vue']
                }
            ]
        }
    ],

};