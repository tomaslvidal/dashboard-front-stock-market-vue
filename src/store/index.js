import Vue from 'vue';

import Vuex from 'vuex';

import { Root } from './modules';

import { VuexPersistedstate } from './plugins';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        Root
    },
    plugins: [VuexPersistedstate]
});