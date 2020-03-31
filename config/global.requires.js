import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader
import 'd3-celestial/celestial.css'

Vue.config.productionTip = false;
Vue.use(Vuetify, {
	iconfont: "mdi",
	theme: {
		primary: '#5656ca',
		secondary: '#424242',
		accent: '#82B1FF',
		error: '#FF5252',
		info: '#2196F3',
		success: '#4CAF50',
		warning: '#FFC107'
	}
})
var vuetify = new Vuetify()
