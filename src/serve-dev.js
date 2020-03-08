import Vue from 'vue';
import Dev from '@/serve-dev.vue';
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader

Vue.config.productionTip = false;
Vue.use(Vuetify, {
  iconfont: "mdi"
})

var vuetify = new Vuetify()
new Vue({
  vuetify,
  render: (h) => h(Dev),
}).$mount('#app');
