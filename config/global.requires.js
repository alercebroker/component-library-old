import Vue from 'vue'
import Vuetify from 'vuetify'
import VueI18n from 'vue-i18n'
import 'vuetify/dist/vuetify.min.css'
import 'vuetify/dist/vuetify.min.css'
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader
import 'd3-celestial/celestial.css'

Vue.config.productionTip = false;
Vue.use(Vuetify, {
  iconfont: "mdi"
})
var vuetify = new Vuetify()

Vue.use(VueI18n)
Vue.use(vuetify, {
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