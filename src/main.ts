import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

// Vendor scripts
import '@/vendor/fontawesome'
//@ts-ignore
import VueFormulate from '@braid/vue-formulate'
Vue.use(VueFormulate)

// Import application css
import '@/assets/styles/application.scss'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
