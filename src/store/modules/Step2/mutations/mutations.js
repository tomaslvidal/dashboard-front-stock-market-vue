import Vue from 'vue';

import { mergeBIntoA } from '@/methods';

import { getDefaultState } from '../Step2';

export default {
    FORCE_RESET(state){
        let save_data = {
            config: {
                motor: JSON.parse(JSON.stringify(state.config.motor))
            },
            data: {
                b2b: JSON.parse(JSON.stringify(state.data.b2b))
            },
            backup: JSON.parse(JSON.stringify(state.backup))
        };

        let default_state = mergeBIntoA(getDefaultState(), save_data);

        Object.assign(state, default_state);
    },
    CLEAR_FILTERS(state, payload){
        state.filter = payload;
    },
    PAGE_PAGINATION(state, payload){
        state.pagination.currentPage = payload;
    },
    SET_SCROLL_INTO_VIEW(state, payload){
        state.scroll_into_view.id = payload;
    },
    CLEAR_BACKUP(state, { key }){
        state.backup[key] = {};
    },
    SET_BACKUP(state, { key, payload }){
        state.backup[key] = {
            ...(item => typeof item !== 'undefined' ? item : {})(state.backup[key]),
            ...payload
        };
    },
    SET_ITEMS(state, payload){
        state.data.rates = payload;
    },
    SET_REQUEST_MADE(state, payload){
        state.request_made[payload] = true;
    },
    SET_SEARCH(state, payload){
        state.search = payload;
    },
    SET_SELECTED_SORT(state, payload){
        state.sort[payload.sort].selected = payload.value;
    },
    SET_FILTER(state, { filter, payload }){
        if(payload instanceof Array){
            state.filter[filter].items = payload;
        }
        else{
            Object.keys(payload).forEach(key => {
                let with_egress_finish = typeof payload[key].egress !== 'undefined';

                if(!with_egress_finish){
                    state.filter[filter][key].items = payload[key];

                    if(!payload[key].length){
                        Vue.delete(state.filter[filter], key);
                    }
                }
                else{
                    let key_types = Object.keys(payload[key]);

                    key_types.forEach((key2, index2) => {
                        state.filter[filter][key][key2].items = payload[key][key2];

                        if(key_types.length - 1 === index2){
                            if(!payload[key][key2].length){
                                Vue.delete(state.filter[filter], key);
                            }
                        }
                    });
                }
            });
        }

        state.filter[filter].state = true;
    },
    SET_FILTER_PRICE(state, payload){
        state.filter.price = payload;
    },
    SET_CONFIG_MOTOR(state, payload){
        Object.assign(state.config, payload);
    },
    SET_PROGRESS_REQUEST(state, payload){
        if(typeof payload.where !== 'undefined'){
            if(payload.where === 'ciudadAvanzada'){
                state.ajax.ciudadAvanzada.progress[payload.request] = payload.value;

                return;
            }
        }

        state.ajax.availability.progress[payload.request] = payload.value;
    },
};