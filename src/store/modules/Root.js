import axios from 'axios';

import parseFormData from 'json-form-data';

import { totalDuration, mergeBIntoA } from '@/methods';

const getDefaultState = () => ({
    buy: [
        {
            id: 0,
            instrument: 'dollar',
            type: 'percentage',
            value: 0,
            execution: 'monthly'
        },
        {
            id: 1,
            instrument: 'dollar',
            type: 'fixed',
            value: 0,
            date: '2020-01-12',
            execution: 'date'
        },
        {
            id: 2,
            instrument: 'peso',
            type: 'percentage',
            value: 0,
            execution: 'monthly'
        }
    ],
    aside: {
        state: {
            mobile: {
                open: false
            }
        }
    },
    config: {
        pesos_capital: 0,
        dollar_capital: 0,
        start_date: '',
        qty_months: 0,
        dollar_prognosis: 0,
        raise_range: [
            {
                name: 'Desde',
                value: 0
            },
            {
                name: 'Hasta',
                value: 0
            }
        ],
        dollars_to_pesos: {
            bonds: false
        },
        percentage_dollar: 0,
        monthly_or_diary: 'month'
    },
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
            if(typeof payload.id === 'undefined'){
                Object.assign(state[payload.form], payload.data);
            }
            else{
                Object.assign(state[payload.form][payload.id], payload.data);
            }
        },
        STATE_ASIDE(state, payload){
            state.aside.state = Object.assign({}, mergeBIntoA(state.aside.state, payload));
        }
    },
    actions:{
        FORCE_RESET(context, payload){
            context.commit('FORCE_RESET', payload);
        },
        SET_FORM(context, payload){
            this._vm.$bvToast.toast('La informacion se ha guardado con exito', {
                title: 'Formulario guardado',
                solid: true,
                variant: 'success'
            });
            
            context.commit('SET_FORM', payload);
        },
        STATE_ASIDE(context, payload){
            context.commit('STATE_ASIDE', payload);
        }
    }
}

export { getDefaultState };

export default Root;