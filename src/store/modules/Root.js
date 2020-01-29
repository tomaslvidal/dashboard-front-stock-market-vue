import axios from 'axios';

import parseFormData from 'json-form-data';

import { totalDuration } from '@/methods';

const getDefaultState = () => ({
    state: {
        email_sent: false,
    }
});

const Step5 = {
    namespaced: true,
    state: getDefaultState(),
    getters: {},
    mutations:{
        FORCE_RESET(state){
            Object.assign(state, getDefaultState());
        },
        SEND_MAIL(state){
            state.state.email_sent = true;
        }
    },
    actions:{
        FORCE_RESET(context, payload){
            context.commit('FORCE_RESET', payload);
        },
        SEND_MAIL(context){
            axios({
                url: 'https://aereos.eviajes.online/services/sendMail.php',
                method: 'POST',
                headers: {
                'Content-Type': 'multipart/form-data'
                },
                data: parseFormData({
                    codigoReserva: context.rootState.Step3.data.book.codigo[0],
                    pasajeros: context.rootState.Step3.form.passengers.map(item => ({
                        tipo: item.config.type,
                        nombre: `${item.name} ${item.last_name}`,
                        sexo: item.sex,
                        documento: item.document.number,
                    })),
                    itinerario: {
                        tarifas: {
                            moneda: context.rootGetters['Step3/rate'].data.precio.total.moneda,
                            total: context.rootGetters['Step3/rate'].data.precio.total.valor,
                            detalle: context.rootGetters['Step3/rate'].data.precio.muestro.map(item => ({
                                titulo: item.nombre,
                                moneda: (item => {
                                    item = item.toString().split(' ');

                                    if(item.length > 1){
                                        return item[0];
                                    }

                                    return '';
                                })(item.tarifaBaseEquivalente),
                                tarifa: (item => {
                                    item = item.toString().split(' ');

                                    if(item.length > 1){
                                        return item[1];
                                    }

                                    return '';
                                })(item.tarifaBaseEquivalente),
                                impuestos: (item => {
                                    item = item.toString().split(' ');

                                    if(item.length > 1){
                                        return item[0];
                                    }

                                    return '';
                                })(item.impuestos)
                            }))
                        },
                        vuelos: {
                            ida: context.rootGetters['Step3/rate'].segmentos.filter(item => item.tipo === 'ida').map(item => item.tramos.map(item2 => ({
                                    tipo: 'ida',
                                    aerolinea: item2.marketingAirline.nombre,
                                    aerolineaIata: item2.marketingAirline.codigo,
                                    vuelo: item2.numeroVuelo,
                                    origen: item2.salida.destino,
                                    destino: item2.llegada.destino,
                                    fecha_salida: (date => {
                                        date = new Date(date);

                                        return `${(date.getDate())}/${(date.getMonth() + 1)}/${(date.getFullYear())} ${date.getHours()}:${date.getMinutes()}hs`;
                                    })(item2.salida.fecha),
                                    fecha_vuelta: (date => {
                                        date = new Date(date);

                                        return `${(date.getDate())}/${(date.getMonth() + 1)}/${(date.getFullYear())} ${date.getHours()}:${date.getMinutes()}hs`;
                                    })(item2.llegada.fecha),
                                    detalle: {
                                        duracion: totalDuration(item2.duracionTotal).text,
                                        equipo: item2.equipo,
                                        clase: item2.ResBookDesigCode,
                                        equipaje: {
                                            foto: 'https://aereos.eviajes.online/img/equipaje.png',
                                            descripcion: (item => {
                                                let text = '';

                                                if(item.mano.piezas === 1){
                                                    text += `Incluye ${item.mano.piezas} equipaje de mano`;
                                                }

                                                if(item.mano.bodega === 1){
                                                    text += `Incluye ${item.mano.bodega} de piezas en bodega`;
                                                }
                                            })(item2.equipaje)
                                        },
                                    }
                                })
                            )).flat(Infinity),
                            vuelta: context.rootGetters['Step3/rate'].segmentos.filter(item => item.tipo === 'vuelta').map(item => item.tramos.map(item2 => ({
                                    tipo: 'vuelta',
                                    aerolinea: item2.marketingAirline.nombre,
                                    aerolineaIata: item2.marketingAirline.codigo,
                                    vuelo: item2.numeroVuelo,
                                    origen: item2.salida.destino,
                                    destino: item2.llegada.destino,
                                    fecha_salida: (date => {
                                        date = new Date(date);

                                        return `${(date.getDate())}/${(date.getMonth() + 1)}/${(date.getFullYear())} ${date.getHours()}:${date.getMinutes()}hs`;
                                    })(item2.salida.fecha),
                                    fecha_vuelta: (date => {
                                        date = new Date(date);

                                        return `${(date.getDate())}/${(date.getMonth() + 1)}/${(date.getFullYear())} ${date.getHours()}:${date.getMinutes()}hs`;
                                    })(item2.llegada.fecha),
                                    detalle: {
                                        duracion: totalDuration(item2.duracionTotal).text,
                                        equipo: item2.equipo,
                                        clase: item2.ResBookDesigCode,
                                        equipaje: {
                                            foto: 'https://aereos.eviajes.online/img/equipaje.png',
                                            descripcion: (item => {
                                                let text = '';

                                                if(item.mano.piezas === 1){
                                                    text += ` Incluye ${item.mano.piezas} equipaje de mano`;
                                                }

                                                if(item.bodega.piezas > 0){
                                                    text += ` Incluye ${item.bodega.piezas} piezas en bodega`;
                                                }

                                                text = text.trim().replace('  ', ' ');

                                                return text;
                                            })(item2.equipaje)
                                        },
                                    }
                                })
                            )).flat(Infinity)
                        }
                    },
                    capturaReserva: context.rootState.Step3.data.book.captura
                })
            })
            .then(res => {
                console.log("test: ", res);

                context.commit('SEND_MAIL');
            })
            .catch(e => {
                console.log("test: ", e);
            })
        }
    }
}

export { getDefaultState };

export default Step5;