import axios from 'axios';

import parseFormData from 'json-form-data';

import { totalDuration } from '@/methods';

const getDefaultState = () => ({
    leverage: {
        start_date: '',
        tea: 0,
        detector: false
    }
});

const Root = {
    namespaced: true,
    state: getDefaultState(),
    getters: {},
    mutations:{
        FORCE_RESET(state){
            Object.assign(state, getDefaultState());
        },
        SET_FORM(state, payload){
            Object.assign(state[payload.form], payload.data);
        }
    },
    actions:{
        FORCE_RESET(context, payload){
            context.commit('FORCE_RESET', payload);
        }
    }
}

export { getDefaultState };

export default Root;