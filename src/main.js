import Vue from 'vue'

import { BootstrapVue } from 'bootstrap-vue'

import App from './App.vue'

import './registerServiceWorker'

import router from './router'

import store from './store'

import '@/scss/custom.scss'

Vue.use(BootstrapVue);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
