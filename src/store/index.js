import Vue from 'vue';

import Vuex from 'vuex';

import { Step2, Step3, Step5 } from './modules';

import { VuexPersistedstate } from './plugins';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        Step2,
        Step3,
        Step5
    },
    plugins: [VuexPersistedstate]
});