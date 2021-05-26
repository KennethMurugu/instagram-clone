import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Notice from '@/components/Notice.vue'

Vue.config.productionTip = false

// Vendor scripts
import '@/vendor/fontawesome'
import '@/vendor/firebase/serviceinit'

//@ts-ignore
import VueFormulate from '@braid/vue-formulate'
Vue.use(VueFormulate)

Vue.component('Notice', Notice)

// Import application css
import '@/assets/styles/application.scss'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
