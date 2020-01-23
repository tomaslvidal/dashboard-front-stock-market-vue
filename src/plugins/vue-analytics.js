import Vue from 'vue';

import VueAnalytics from 'vue-analytics';

import router from '@/router';

if(process.env.NODE_ENV === 'production'){
    Vue.use(VueAnalytics, {
        id: '',
        router,
        // debug: {
        //     enabled: true
        // }
    })
}