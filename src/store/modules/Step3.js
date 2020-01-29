import axios from 'axios';

import parseFormData from 'json-form-data';

import { mergeBIntoA, getFormatJsonSell } from '@/methods';

import router from '@/router';

// import { step3 } from '@/test/modules/default_state'; 

// const getDefaultState = () => (step3);

let ajax = {
    service_book: {},
    check_availability: {}
};

const getDefaultState = () => ({
    form: {
        passengers: [],
        contact: {
            name: '',
            last_name: '',
            area_code: '',
            phone: '',
            email: ''
        },
        payment: {
            document: {
                number: ''
            },
            card: {
                name: '',
                number: '',
                code: '',
                year: '',
                month: '',
                fees: 1,
                pay_method: ''
            },
            pay_method: '',
        },
        term: ''
    },
    option: {
        id: '',
        page: 0
    },
    data: {
        book: {}
    }
});

const Step3 = {
    namespaced: true,
    state: getDefaultState(),
    getters: {
        rate(state, getters, rootState, rootGetters){
            if(state.option.id.length>0){
                if(rootGetters['Step2/rates'].length>0){
                    let index = rootGetters['Step2/rates'].findIndex(item => item.numero === state.option.id);

                    return rootGetters['Step2/rates'][index];
                }
            }

            return {};
        }
    },
    mutations:{
        PARSE_FORM_PASSENGER(state, payload){
            state.form.passengers = payload;
        },
        SELECT_OPTION(state, payload){
            Object.assign(state.option, payload);
        },
        FORCE_RESET(state){
            let save_data = {
                form: JSON.parse(JSON.stringify(state.form))
            };

            save_data.form.terms = false;

            let default_state = mergeBIntoA(getDefaultState(), save_data);

            Object.assign(state, default_state);
        },
        SET_DATA_FORM(state, payload){
            state.form = payload;
        },
        SAVE_DATA_BOOK(state, payload){
            state.data.book = payload;
        },
    },
    actions:{
        PARSE_FORM_PASSENGER(context, payload){
            context.commit('PARSE_FORM_PASSENGER', payload);
        },
        SET_DATA_FORM(context, payload){
            context.commit('SET_DATA_FORM', payload);
        },
        SELECT_OPTION(context, payload){
            context.commit('SELECT_OPTION', payload);
        },
        FORCE_RESET(context, payload){
            context.commit('FORCE_RESET', payload);
        },
        async RUN_WEB_SERVICES(context, payload){
            if(typeof ajax.service_book.token !== "undefined"){
                ajax.service_book.cancel();
            }

            await context.dispatch('SERVICE_BOOK', payload);
        },
        SAVE_DATA_BOOK(context, payload){
            return new Promise((resolve, reject) => {
                try {
                    context.commit('SAVE_DATA_BOOK', payload);

                    resolve();
                }
                catch(e){
                    reject(e);
                }
            });
        },
        SERVICE_BOOK(context, payload){
           return new Promise((resolve, reject) => {
                ajax.service_book = axios.CancelToken.source();

                //JSON DE ERROR BACKUP
                //{"travel":true}{"error_code":"3DO4","description":"No se pudo concretar la reserva. Por favor vuelva a intentarlo mas tarde. - 3DO4"}

                //{"error_code":"TIAI1","description":"No se puede realizar la reserva. Por favor vuelva a intentarlo mas tarde - TIAI1"}

                if(typeof payload === "undefined"){
                    axios({
                        url: 'https://aereos.eviajes.online/services/book.php',
                        method: 'POST',
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        },
                        withCredentials: true,
                        data: parseFormData({
                            convid: context.getters.rate.convid,
                            token: context.getters.rate.token,
                            usa: true,
                            arnk: 'T',
                            contacto: (item => ({
                                nombre: item.name,
                                apellido: item.last_name,
                                codigo_area: item.area_code,
                                telefono: item.phone,
                                email: item.email
                            }))(context.state.form.contact),
                            pasajeros: context.state.form.passengers.map(item => ({
                                tipo: item.config.type,
                                nombre: item.name,
                                nombre_medio: item.second_name,
                                apellido: item.last_name,
                                sexo: item.sex,
                                nacimiento: item.birthdate.toUpperCase(),
                                frequentname: item.frequent.name,
                                frequentnumber: item.frequent.number,
                                fare: item.config.fare
                            })),
                            vuelos: {
                                tarifa: `${context.getters.rate.data.precio.total.moneda}${context.getters.rate.data.precio.total.valor}`,
                                opciones: getFormatJsonSell(context.getters.rate)
                            },
                        }),
                        cancelToken: ajax.service_book.token
                    })
                    .then(async res => {
                        let error;

                        if(typeof res.data.error_code === 'undefined' && typeof res.data.reserva !== 'undefined'){
                            await context.dispatch('SAVE_DATA_BOOK', res.data.reserva);
                            
                            return resolve(res.data);
                        }
                        else{
                            error = new Error("e0005t");
                        }

                        error.data = res.data;

                        reject(error);
                    })
                    .catch(e => {
                        if(axios.isCancel(e)){
                            reject(new Error("004xS7"));
                        }
                        else{
                            reject(e);
                        }
                    });
                }
                else{
                    reject(new Error("004xS1"));
                }
            });
        },
        CHECK_AVAILABILITY(context, payload){
            return new Promise((resolve, reject) => {
                if(typeof ajax.check_availability.token !== "undefined"){
                    ajax.check_availability.cancel();
                }

                ajax.check_availability = axios.CancelToken.source();

                if(typeof payload !== "undefined"){
                    axios({
                        url: 'https://aereos.eviajes.online/services/sell.php',
                        method: 'POST',
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        },
                        withCredentials: true,
                        data: parseFormData(payload),
                        cancelToken: ajax.check_availability.token
                    })
                    .then(res => {
                        return res.data;
                    })
                    .then(res => {
                        if(res === ''){
                            resolve(true);
                        }
                        else{
                            reject(new Error("003xSX"));
                        }
                    })
                    .catch(e => {
                        // eslint-disable-next-line
                        if(axios.isCancel(e)){
                            reject(new Error("003xS6"));
                        }
                        else{
                            reject(e);
                        }
                    });
                }
                else{
                    reject(new Error("003xS2"));
                }
            });
        }
    }
}

export { getDefaultState };

export default Step3;