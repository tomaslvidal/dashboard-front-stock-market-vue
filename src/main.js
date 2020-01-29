import Vue from 'vue';

import Routes from '@/views/routes';

import router from '@/router';

import store from '@/store';

import { sync } from 'vuex-router-sync';

import { global_mixin } from '@/mixins';

import '@/config';

import '@/prototypes';

import '@/components/registration';

// import '@/plugins';

// Vue.config.productionTip = false;

// Vue.config.devtools = false;

sync(store, router, { moduleName: 'Router' });

Vue.mixin(global_mixin); 

new Vue({
    router,
    store,
    render: h => h(Routes),
}).$mount('#app');