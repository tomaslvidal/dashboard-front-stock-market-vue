import { toFormatArrivalDeparture, onlyOneItem, getTypeSchedule } from '@/methods';

export default {
    FIRSTS_SET_FILTER(context){
        return Promise.all([
            context.dispatch('SET_FILTER', {
                filter: 'airline',
                payload: context.state.data.rates.map(item => item.segmentos.filter(item => item.tipo === 'ida' || item.tipo === 'tramo')).flat().map(item => (item => ({codigo: item.codigo, nombre: item.nombre}))(item.tramos[0].aerolineaOperadora)).filter((item, index, array) => array.findIndex(item2 => item2.codigo === item.codigo) === index)
            }),
            context.dispatch('SET_FILTER', {
                filter: 'airport',
                payload: (rates => {
                    let items = {
                        arrival: {
                            egress: [],
                            finish: []
                        },
                        departure: {
                            egress: [],
                            finish: []
                        }
                    };

                    rates.map(item => toFormatArrivalDeparture(item.segmentos)).forEach(item => Object.keys(item).forEach(key => {
                        item[key].forEach(item2 => {
                            let arrival_or_departure = item2.tipo === 'ida' || item2.tipo === 'tramo' ? 'arrival' : 'departure';

                            [0, item2.tramos.length - 1].forEach((position, index) => {
                                items[arrival_or_departure][index === 0 ? 'egress' : 'finish'].push((item_destination => ({
                                    value: item_destination.destino,
                                    name: item_destination.destino_completo
                                }))(item2.tramos[position][index === 0 ? 'salida' : 'llegada']));
                            });
                        });
                    }));

                    items = onlyOneItem(JSON.parse(JSON.stringify(items)));

                    return items;
                })(context.state.data.rates)
            }),
            context.dispatch('SET_FILTER', {
                filter: 'schedule',
                payload: (rates => {
                    let items = {
                        arrival: {
                            egress: [],
                            finish: []
                        },
                        departure: {
                            egress: [],
                            finish: []
                        }
                    };

                    rates.map(item => toFormatArrivalDeparture(item.segmentos)).forEach(item => Object.keys(item).forEach(key => {
                        item[key].forEach(item2 => {
                            let arrival_or_departure = item2.tipo === 'ida' || item2.tipo === 'tramo' ? 'arrival' : 'departure';

                            [0, item2.tramos.length - 1].forEach((position, index) => {
                                items[arrival_or_departure][index === 0 ? 'egress' : 'finish'].push((item_destination => getTypeSchedule(item_destination.fecha))(item2.tramos[position][index === 0 ? 'salida' : 'llegada']));
                            });
                        });
                    }));

                    items = onlyOneItem(JSON.parse(JSON.stringify(items)));

                    return items;
                })(context.state.data.rates)
            }),
            context.dispatch('SET_FILTER', {
                filter: 'stopover',
                payload: (rates => {
                    let items = {
                        arrival: [],
                        departure: []
                    };

                    rates.map(item => toFormatArrivalDeparture(item.segmentos)).forEach(item => Object.keys(item).forEach(key => {
                        item[key].forEach(item2 => {
                            let arrival_or_departure = item2.tipo === 'ida' || item2.tipo === 'tramo' ? 'arrival' : 'departure';

                            let qty_stopovers = item2.tramos.length-1;

                            items[arrival_or_departure].push({
                                value: qty_stopovers,
                                name: (item => {
                                    switch (item) {
                                        case 0:
                                            return 'Directo';
                                        case 1:
                                            return '1 Escala';
                                        case (item > 1 ? item : ''):
                                            return `${item} Escalas`;
                                    }
                                })(qty_stopovers)
                            });
                        });
                    }));

                    Object.keys(items).forEach(key => {
                        items[key] = items[key].filter((item, index, array) => array.findIndex(item2 => item2.value === item.value) === index).sort((a, b) => {
                            a = a.value, b = b.value;

                            if(a > b){
                                return 1;
                            }
                            else{
                                return -1
                            }
                        });
                    });

                    return items;
                })(context.state.data.rates)
            })
        ]);
    }
};