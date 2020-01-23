import Vue from 'vue';

import { BootstrapVue } from 'bootstrap-vue'

import './registerServiceWorker'

import '@/scss/custom.scss'

import Routes from '@/views/routes';

import router from '@/router';

import store from '@/store';

import { sync } from 'vuex-router-sync';

import '@/config';

import '@/prototypes';

import '@/components/registration';

// import '@/plugins';

import { global_mixin } from '@/mixins';

// Vue.config.productionTip = false;

// Vue.config.devtools = false;

sync(store, router, { moduleName: 'Router' });

Vue.use(BootstrapVue);

Vue.mixin(global_mixin); 

new Vue({
    router,
    store,
    render: h => h(Routes),
}).$mount('#app');
