import Vue from 'vue';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import { ValidationProvider, ValidationObserver } from 'vee-validate';

Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.component('default-layout', require('@/layouts/default').default);

Vue.component('error-layout', require('@/layouts/error').default);

Vue.component('ValidationProvider', ValidationProvider);

Vue.component('ValidationObserver', ValidationObserver);