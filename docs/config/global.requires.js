
import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader
import ECharts from 'vue-echarts'
// import ECharts modules manually to reduce bundle size
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/scatter'
import 'echarts/lib/chart/map'
import 'echarts/lib/chart/heatmap'
import 'echarts/lib/chart/treemap'
import 'echarts/lib/chart/radar'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/calendar'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/toolbox'
import 'echarts/lib/component/dataZoom'
import 'echarts/lib/chart/custom'
import 'echarts/lib/component/visualMap'
import 'echarts/lib/component/grid'
import 'echarts/lib/component/axis'
Vue.config.productionTip = false

Vue.component('v-chart', ECharts)
Vue.use(Vuetify, {
  iconfont: 'mdi',
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
