import axios from 'axios';

import Vue from 'vue';

import parseFormData from 'json-form-data';

import { clearFilters } from '@/methods';

const ajax = {
    items: {},
    agency_data: {},
};

export default {
    async SET_SEARCH(context, payload){
        if(typeof payload.without_reset === "undefined"){
            await context.dispatch('GENERAL_FORCE_RESET');
        }
        else{
            delete payload.without_reset;
        }

        context.commit('SET_SEARCH', payload);

        context.dispatch('FETCH_ITEMS');
    },
    FORCE_RESET(context, payload){
        context.commit('FORCE_RESET', payload);
    },
    async GENERAL_FORCE_RESET(context){
        context.commit('FORCE_RESET');

        context.dispatch('Step3/FORCE_RESET', undefined, { root: true });

        context.dispatch('Step5/FORCE_RESET', undefined, { root: true });

        return 0;
    },
    async STEP3_TO_STEP5_FORCE_RESET(context){
        context.dispatch('Step3/FORCE_RESET', undefined, { root: true });

        context.dispatch('Step5/FORCE_RESET', undefined, { root: true });

        return 0;
    },
    async CLEAR_FILTERS(context, payload){
        let filter = await clearFilters(context.state.filter);

        context.commit('CLEAR_FILTERS', filter);
    },
    PAGE_PAGINATION(context, payload){
        context.commit('PAGE_PAGINATION', payload)
    },
    SET_SELECTED_SORT(context, payload){
        context.commit('SET_SELECTED_SORT', payload);
    },
    SET_SCROLL_INTO_VIEW(context, payload){
        context.commit('SET_SCROLL_INTO_VIEW', payload);
    },
    SET_BACKUP(context, payload){
        context.commit('SET_BACKUP', payload);
    },
    SET_CONFIG_MOTOR(context, payload){
        return new Promise((resolve, reject) => {
            try{
                context.commit('SET_CONFIG_MOTOR', payload);

                resolve(true);
            }
            catch(e){
                reject(e);
            }
        });
    },
    SET_FILTER(context, payload){
        return new Promise((resolve, reject) => {
            try{
                context.commit('SET_FILTER', payload);

                resolve(true);
            }
            catch(e){
                reject(e);
            }
        });
    },
    SET_FILTER_PRICE(context, payload){
        context.commit('SET_FILTER_PRICE', payload);
    },
    SET_PROGRESS_REQUEST(context, payload){
        context.commit('SET_PROGRESS_REQUEST', payload);
    },
    FETCH_ITEMS(context){
        if(typeof ajax.items.token !== "undefined"){
            typeof ajax.items.token !== "undefined" ? ajax.items.cancel() : null;
        }

        ajax.items = axios.CancelToken.source();

        axios({
            url: 'https://aereos.eviajes.online/services/avail.php',
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            withCredentials: true,
            data: parseFormData(context.state.search),
            cancelToken: ajax.items.token,
            onDownloadProgress: progressEvent => {
                if(progressEvent.lengthComputable){
                    let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);

                    if(percentCompleted !== 100){
                        context.dispatch('SET_PROGRESS_REQUEST', {
                            request: 'items',
                            value: percentCompleted
                        });
                    }
                }
            }
        })
        .then(async res => {
            try{
                res.data = JSON.parse(res.data);
            }
            // eslint-disable-next-line
            catch(e){}

            context.commit('SET_ITEMS', res.data.itinerarios);

            if(context.state.data.rates.length){
                await context.dispatch('SET_CONFIG_MOTOR', {
                    motor: 'b2c',
                    type: (item => {
                        let length_departure = item.segmentos.filter(item => item.tipo === 'vuelta').length;
                        
                        let length_arrival = item.segmentos.filter(item => item.tipo === 'ida').length;

                        if(length_departure){
                            return 'arrival_departure';
                        }
                        else if(length_arrival){
                            return 'arrival';
                        }
                        else{
                            return 'multiple';
                        }
                    })(context.state.data.rates[0])
                });

                context.dispatch('FIRSTS_SET_FILTER')
                .then(() => {
                    context.dispatch('SET_PROGRESS_REQUEST', {
                        request: 'items',
                        value: 100
                    });

                    setTimeout(() => {
                        context.commit('SET_REQUEST_MADE', 'availability');
                    }, 600);
                })
                .catch(e => {
                    throw e;
                });
            }
            else{
                throw new Error('0x20000');
            }
        })
        .catch(e => {
            if(!axios.isCancel(e)){
                Vue.swal({
                    text: "No se encontraron resultados, por favor intente nuevamente.",
                    icon: "warning",
                    showCancelButton: false,
                    confirmButtonColor: "#57a2ea",
                    confirmButtonText: "Ir al buscador"
                })
                .then(() => {                     
                    parent.location.replace(context.getters.url_redirect_for_error);
                });

                throw e;
            }
        });
    },
};