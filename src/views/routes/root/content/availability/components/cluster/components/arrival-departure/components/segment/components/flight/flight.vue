<template>
    <div class="row">
        <div class="col-12">
            <div class="p-3">
                <div class="row header_detalles">
                    <div class="detalles_vuelo_equipo">
                        <img
                            :src="`http://aereos.eviajes.online/img/airlines/${item.marketingAirline.codigo}.png`"
                            alt=""
                        >
                        
                        
                        <span>{{ `Vuelo ${item.marketingAirline.codigo} ${item.numeroVuelo} - Equipo: ${item.equipo}` }}</span> 
                    </div>

                    <div class="text-sm-right detalles_clase_comida">
                        <span>Clase: {{ item.cabina.nombre }}</span>
                        
                                               
                        <span>Comida: {{ item.comida.nombre === null ? 'No incluye' : item.comida.nombre }}</span>
                    </div>
                </div>

                <div class="row detalles_content">
                    <ul class="detalles_list">
                        <li>
                            SALE
                        </li>

                        <li>
                            {{ date.arrival }}
                        </li>

                        <li>
                            <span>{{ arrival.destino }}</span> {{ getHour(arrival.fecha) }}hs
                        </li>

                        <li
                            :id="`a-airport-${_uid}`"
                            :class="{
                                'airport_name' : getAirportClass(arrival.destino_completo, 35)
                            }"
                        >
                            {{ arrival.destino_completo }}
                        </li>
                        <b-popover
                            v-if="getAirportClass(arrival.destino_completo, 35)" 
                            :target="`a-airport-${_uid}`"
                            triggers="hover"
                            placement="top"
                        >
                            {{ arrival.destino_completo }}
                        </b-popover>
                    </ul>

                    <div class="flecha ">
                        <font-awesome-icon
                            :icon="['fas' ,'chevron-right']"
                            fixed-width
                            v-if="!mobile_size"
                        />
                        <span
                            v-if="mobile_size"
                        >
                            Duración:                        
                        </span>    
                        <span>{{ total_duration.text }}</span>
                    </div>

                    <ul class="detalles_list">
                        <li>LLEGA</li>

                        <li>
                            {{ date.departure }}
                        </li>

                        <li><span>{{ departure.destino }}</span> {{ getHour(departure.fecha) }}hs</li>

                        <li
                            :id="`d-airport-${_uid}`"
                            :class="{
                                'airport_name' : getAirportClass(departure.destino_completo, 35)
                            }"
                        >
                            {{ departure.destino_completo }}
                        </li>
                        <b-popover
                            v-if="getAirportClass(departure.destino_completo, 35)" 
                            :target="`d-airport-${_uid}`"
                            triggers="hover"
                            placement="top"
                        >
                            {{ departure.destino_completo }}
                        </b-popover>
                    </ul>
                </div> 
            </div>

            <div class="col-12 detalles_equipaje">
                <p
                    :style="{
                        color: item.equipaje.mano.piezas > 0 ? '#03b26c' : false
                    }"
                >
                    <font-awesome-icon
                        class="mr-2"
                        :icon="['fas' ,'suitcase-rolling']"
                        fixed-width
                    />
                    
                    <span v-if="item.equipaje.mano.piezas"><b>Incluye</b> equipaje de mano</span>

                    <span v-else><b>No incluye </b>equipaje de mano</span>
                </p>

                <p
                    :style="{
                        color: item.equipaje.bodega.piezas > 0 ? '#03b26c' : false
                    }"
                >
                    <font-awesome-icon
                        class="mr-2"
                        :icon="['fas' ,'suitcase']"
                        fixed-width
                    />

                    <span v-if="item.equipaje.bodega.piezas"><b>Incluye {{ item.equipaje.bodega.piezas }}</b> pieza{{ item.equipaje.bodega.piezas > 1 ? 's' : '' }} en bodega</span>

                    <span v-else><b>No incluye </b>piezas</span>
                </p>
            </div>

            <div
                v-if="wait_airport !== ''"
                class="col-12 border escala_detalle my-2"
            >
                <span>
                    <font-awesome-icon
                        class="mr-2"
                        :icon="['far' ,'clock']"
                        fixed-width
                    />
                    
                    <b>Espera de {{ wait_airport.text }}</b> en {{ `${item.llegada.destino_completo} (${item.llegada.destino})` }}
                </span>
            </div>
        </div>
    </div>
</template>

<script>
    import { library } from '@fortawesome/fontawesome-svg-core';

    // import { fab } from '@fortawesome/free-brands-svg-icons';

    import { faClock } from '@fortawesome/free-regular-svg-icons';

    import { faSuitcase, faSuitcaseRolling, faChevronRight } from '@fortawesome/free-solid-svg-icons';

    library.add(faClock, faSuitcase, faSuitcaseRolling, faChevronRight);

    import { BPopover } from 'bootstrap-vue';

    import { between_step2s_step2f } from '@/mixins';

    import { between_segment_flight } from '@/views/routes/step2/content/availability/components/cluster/components/arrival-departure/components/segment/mixins';

    import { getMinutes, totalDuration } from '@/methods';

    export default {
        mixins: [between_step2s_step2f, between_segment_flight],
        props: {
            item: {
                default: () => new Object(),
                type: Object,
                required: true
            },
            items: {
                default: () => [],
                type: Array,
                required: true
            }
        },
        components: {
            BPopover
        },
        data(){
            return {
                config: {
                    date_format: {
                        locale: 'es-AR',
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: '2-digit'
                    }
                }
            };
        },
       computed: {
            date(){
                let arrival = (new Date(this.arrival.fecha)).toLocaleDateString(this.config.date_format.locale, this.config.date_format);
                
                let departure = (new Date(this.departure.fecha)).toLocaleDateString(this.config.date_format.locale, this.config.date_format);

                arrival = arrival[0].toUpperCase() + arrival.slice(1);

                departure = departure[0].toUpperCase() + departure.slice(1);
                
                return {
                    arrival,
                    departure
                };
            },
            arrival(){
                return this.item.salida;
            },
            departure(){
                return this.item.llegada;
            },
            wait_airport(){
                let index_item = this.items.findIndex((item, index, array) => item.numeroVuelo === this.item.numeroVuelo);

                let next_item = this.items[index_item + 1];

                if(typeof next_item !== 'undefined'){
                    let difference_mt = (new Date(next_item.salida.fecha) - new Date(this.item.llegada.fecha)) / (1000 * 60);

                    if(difference_mt !== 0){
                        return totalDuration(difference_mt);
                    }
                }
                
                return '';
            }
        }
    }
</script>

<style scoped>
    .header_detalles{
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid #f1f1f1;
        padding: 10px;
        background: aliceblue;
    }

    .header_detalles span{
        font-size: 0.8em;
        color: gray;
        display: flex;
    }
    
    .header_detalles img{
        max-width: 25px;
    }

    .detalles_content{
        display: flex;
        justify-content: space-around;
        align-items: center;

    }
    .flecha{
        color: #4c4a4a;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align:center;
    }

    .flecha svg{
        font-size: 2em;
    }

    .detalles_list{
        padding: 10px; 
    }

    .detalles_list li:nth-child(1){
        font-size: 1.2em;
        font-weight: 600;
        color: #4c4a4a;

    }

    .detalles_list li:nth-child(2){
        color: #4c4a4a;
        font-size: 1em

    }

    .detalles_list li:nth-child(3){
        color: gray;
        font-size: 1.3em;
        font-weight: 600;

    }
    
    .destacado .detalles_list li:nth-child(3) span{
        color: #05c97b;
        
    }

    .detalles_list li:nth-child(3) span{
        font-weight: 700;
        color: #007bff;
        font-size: 1em;

    }

    .detalles_list li:nth-child(4), .detalles_list li:nth-child(5){
        color: gray;
        font-size: 0.8em;

    }
    
    .detalles_list li:nth-child(4){
        position: relative;
        white-space: nowrap;
    }

    .detalles_equipaje{
        font-size: 0.9em;
        color: gray;
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
        padding: 0;

    }

    .escala_detalle{
        text-align: center;
        font-size: 0.9em;
        background: #f1f1f1;
        padding: 7px 0;
        border-radius: 3px;
    }

    .airport_name{
        position: relative;
        white-space: nowrap;
        width: 200px;
        cursor: pointer;
        overflow: hidden;
    }

    .airport_name:after{
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        z-index: 99;
        width: 50%;
        height: 100%;
        background:linear-gradient(to right, rgba(255,255,255,0) 0%, white 80%, white 100%);
        pointer-events: none;
    }

    ul{
        margin: 0;
        list-style: none;
    }
    .detalles_vuelo_equipo, .detalles_clase_comida{
        display: flex;
        flex-direction: column;
    }
    @media (max-width: 480px){
        .detalles_content{
            padding: 10px 0;
            flex-direction: column;
        }
        .detalles_vuelo_equipo, .detalles_clase_comida{
            flex-direction: row;
            align-items: center;
            text-align: center;
        }
        .header_detalles{
            flex-direction: column;
        }
        .detalles_clase_comida span, .detalles_vuelo_equipo span{
            padding: 5px;
        }
        .escala_detalle span{
            font-size: 0.8em;
        } 
        .flecha {
            flex-direction: row;
        }
        .flecha span{
            padding: 0 5px;
            font-size: 0.9em;
            color: gray;
        }
        
    }
</style>