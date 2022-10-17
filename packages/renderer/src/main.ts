import './styles.less'
import Vue from 'vue'
import VueCompositionAPI from '@vue/composition-api'
import App from './app.vue'

import WidgetsInstaller from './widgets'

Vue.config.silent = true

Vue.use(VueCompositionAPI)
Vue.use(WidgetsInstaller)

new Vue({
  render: (h) => h(App),
}).$mount('#root')
