import { toFormatArrivalDeparture, getTypeSchedule } from '@/methods';

import { getDefaultState } from '../Step2';

export default {
    rates(state){
        try{
            let rates = JSON.parse(JSON.stringify(state.data.rates));

            // Filter Price
            rates = rates.filter(item => {
                let filter = JSON.parse(JSON.stringify(state.filter.price));

                if(isNaN(filter.since.value) || filter.since.value === ''){
                    filter.since.value = 0;
                }

                if(isNaN(filter.until.value) || filter.until.value === ''){
                    filter.until.value = Infinity;
                }

                if(Number(item.data.precio.total.valor) >= Number(filter.since.value) && Number(item.data.precio.total.valor) <= Number(filter.until.value)){
                    return true;
                }

                return false;
            });

            // Filter Schedule
            rates = rates.filter(item => {
                let arrival_departure = toFormatArrivalDeparture(item.segmentos);

                let key_types = Object.keys(arrival_departure);

                key_types.forEach(key => {
                    arrival_departure[key] = arrival_departure[key].filter(item_segment => {
                        let valid_segment = true;

                        Object.keys(state.filter.schedule[key]).forEach(key2 => {
                            let position = key2 === 'egress' ? 0 : item_segment.tramos.length - 1;

                            if(state.filter.schedule[key][key2].selected.length){
                                if(!state.filter.schedule[key][key2].selected.includes(getTypeSchedule(item_segment.tramos[position][key2 === 'egress' ? 'salida' : 'llegada'].fecha).value)){
                                    valid_segment = false;
                                }
                            }
                        });

                        if(!valid_segment){
                            item.segmentos = item.segmentos.splice(item_segment.index, 1);

                            return false;
                        }

                        return true;
                    });
                });

                for (let index = 0; index < key_types.length; index++) {
                    if(!arrival_departure[key_types[index]].length){
                        return false;
                    }
                }

                return true;
            });

            // Filter Stopover
            rates = rates.filter(item => {
                let arrival_departure = toFormatArrivalDeparture(item.segmentos);

                let key_types = Object.keys(arrival_departure);

                key_types.forEach(key => {
                    arrival_departure[key] = arrival_departure[key].filter(item_segment => {
                        if(state.filter.stopover[key].selected.length){
                            if(!state.filter.stopover[key].selected.includes(item_segment.tramos.length - 1)){
                                item.segmentos = item.segmentos.splice(item_segment.index, 1);

                                return false;
                            }
                        }

                        return true;
                    });
                });

                for (let index = 0; index < key_types.length; index++) {
                    if(!arrival_departure[key_types[index]].length){
                        return false;
                    }
                }

                return item;
            });

            // Filter Airline
            rates = rates.filter(item => item.segmentos.filter(item => item.tipo === 'ida' || item.tipo === 'tramo').map(item => item.tramos[0]).filter(item => {
                if(state.filter.airline.selected.length){
                    return state.filter.airline.selected.includes(item.aerolineaOperadora.codigo);
                }

                return true;
            }).length);

            // Filter Airport
            rates = rates.filter(item => {
                let arrival_departure = toFormatArrivalDeparture(item.segmentos);

                let key_types = Object.keys(arrival_departure);

                key_types.forEach(key => {
                    arrival_departure[key] = arrival_departure[key].filter(item_segment => {
                        let valid_segment = true;

                        Object.keys(state.filter.airport[key]).forEach(key2 => {
                            let position = key2 === 'egress' ? 0 : item_segment.tramos.length - 1;

                            if(state.filter.airport[key][key2].selected.length){
                                if(!state.filter.airport[key][key2].selected.includes(item_segment.tramos[position][key2 === 'egress' ? 'salida' : 'llegada'].destino)){
                                    valid_segment = false;
                                }
                            }
                        });

                        if(!valid_segment){
                            item.segmentos = item.segmentos.splice(item_segment.index, 1);

                            return false;
                        }

                        return true;
                    });
                });

                for (let index = 0; index < key_types.length; index++) {
                    if(!arrival_departure[key_types[index]].length){
                        return false;
                    }
                }

                return true;
            });

            //

            // Sort Price
            rates = rates.sort((a, b) => {
                a = a.data.precio.total.valor, b = b.data.precio.total.valor;

                if(a < b){
                    return state.sort.price.selected;
                }
                else if(a > b){
                    return state.sort.price.selected === 1 ? -1 : 1;
                }
                else{
                    return 0;
                }
            });

            // Sort Stopovers
            if(state.sort.stopovers.selected){
                rates = rates.sort((a, b) => {
                    let higher_stopover = function(item){
                        return item.segmentos.filter(item => item.tipo === 'ida' || item.tipo === 'tramo').map(item => item.tramos.length).sort((a, b) => {
                            if(a < b){
                                return -1;
                            }
                            else if(a > b){
                                return 1;
                            }
                            else{
                                return 0;
                            }
                        })[0];
                    };

                    a = higher_stopover(a); b = higher_stopover(b);

                    if(a < b){
                        return state.sort.stopovers.selected;
                    }
                    else if(a > b){
                        return state.sort.stopovers.selected === 1 ? -1 : 1;
                    }
                    else{
                        return 0;
                    }
                });
            }

            // Sort Duration
            if(state.sort.duration.selected){
                rates = rates.sort((a, b) => {
                    let higher_duration = function(item){
                        return Number(item.segmentos.sort((a, b) => {
                            a = a.duracionTotal; b = b.duracionTotal;

                            if(a < b){
                                return -1;
                            }
                            else if(a > b){
                                return 1;
                            }
                            else{
                                return 0;
                            }
                        })[0].duracionTotal);
                    };

                    a = higher_duration(a); b = higher_duration(b);

                    if(a < b){
                        return state.sort.duration.selected;
                    }
                    else if(a > b){
                        return state.sort.duration.selected === 1 ? -1 : 1;
                    }
                    else{
                        return 0;
                    }
                });
            }

            return rates;
        }
        catch(e) {
            return [];
        }
    },
    search_default(state){
        if(state.config.motor === "b2b"){
            return {
                ...getDefaultState().search,
                ...getDefaultState().motor_types.filter(item => item.name === "b2b")[0].search_additional
            };
        }

        return getDefaultState().search;
    },
    url_redirect_for_error(state){
        if(process.env.NODE_ENV === 'production'){
            return state.config.motor === 'b2b' ? 'https://eviajes.online/demosite/' : 'https://eviajes.online/demosite/';
        }

        return 'https://eviajes.online/demosite/';
    },
    progress_availability: state => {
        const qty_request = state.config.motor === 'b2b' ? Object.keys(state.ajax.availability.progress).length : Object.keys(state.ajax.availability.progress).length;

        let sum = 0, progress = new Object();

        for(let item in state.ajax.availability.progress){
            sum += (1 * state.ajax.availability.progress[item]) / 100;
        }

        progress.value = (sum / (qty_request)) * 100;

        progress.label = progress.value.toFixed();

        return progress;
    },
    filters_made: state => {
        let qty_filters_with_state = 0, qty_filters_with_state_true = 0, value = false;

        Object.keys(state.filter).forEach(key => {
            if(typeof state.filter[key].state !== 'undefined'){
                qty_filters_with_state++;

                if(state.filter[key].state){
                    qty_filters_with_state_true++;
                }
            }

            if(qty_filters_with_state === qty_filters_with_state_true){
                value = true;

                return;
            }

            value = false;
        });

        return value;
    }
}