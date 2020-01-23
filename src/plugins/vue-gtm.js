import Vue from 'vue';

import VueGtm from 'vue-gtm';

import router from '@/router';

if(process.env.NODE_ENV === 'production'){
    Vue.use(VueGtm, {
        id: '',
        enabled: true,
        // debug: true,
        vueRouter: router
    })
}