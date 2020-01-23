<template>
    <div
        :class="{
            'col-12': true,
            'active-xs': activeXs
        }"
    >
        <div class="row">
            <div class="duracion_total_mobile col-12">	
                <small>
                    <font-awesome-icon
                        class="mr-2"
                        :icon="['far' ,'clock']"
                        fixed-width
                    />
                    
                    {{ total_duration.text }}
                </small>

                <div class="equipajes_mobile">
                    <font-awesome-icon
                        class="mr-1"
                        :icon="['fas' ,'suitcase-rolling']"
                        fixed-width
                        :style="{
                            color: false
                        }"
                    />

                    <font-awesome-icon
                        :icon="['fas' ,'suitcase']"
                        fixed-width
                        :style="{
                            color: color_suitcase.vault
                        }"
                    />
                </div>
            </div>
        </div>

        <div class="row">
            <div 
                :class="{
                    'col-12' : true,
                    'content_idayvuelta' : true,
                    'collapse_back_hover' : collapse.flights 
                }"
            >
                <div class="custom-control custom-radio custom-control-inline m-0">
                    <input 
                        id="airline" 
                        type="radio" 
                        name="options"
                        class="a-none custom-control-input" 
                        value="1"
                    >

                    <label 
                        for="airline" 
                        class="a-none custom-control-label col-11 aero_label"
                    >
                        <img 
                            :src="`http://aereos.eviajes.online/img/airlines/${airline.code != '' ? airline.code : 'default_logo' }.png`" 
                            class="logo"
                        >
                        
                        <span 
                            :id="`airline-${_uid}`"
                            :class="{
                                'a-none' : true, 
                                'd-none' : true,
                                'd-sm-block' : true,
                                'airline_blur' : airline_name,
                                'airline_name' : !airline_name
                            }"
                        >
                            {{ airline.name }}
                        </span>
                    </label>
                    <b-popover
                        v-if="airline_name" 
                        :target="`airline-${_uid}`"
                        triggers="hover"
                        placement="top"
                    >
                        {{ airline.name }}
                    </b-popover>
                </div>

                <div 
                    :class="{
                        'aero_horario' : true,
                        'collapse_hover' : show_aerotime
                    }"
                >
                    <ul class="aero_list text-right">
                        <li>
                            <b>{{ getHour(arrival.fecha) }}</b>
                        </li>
                        
                        <li>
                            <span>{{ arrival.destino }}</span>
                        </li>
                    </ul>

                    <div
                        :class="{
                            aero_escalas: true,
                            una_escala: qty_stopovers,
                            dos_escalas: qty_stopovers > 1,
                            directo: !qty_stopovers
                        }"
                    >
                        <span />

                        <small 
                            v-if="qty_stopovers"
                            :class="{
                                'circle': true
                            }"
                        />
                        <small 
                            v-if="qty_stopovers > 1"
                            :class="{
                                'circle_two': true
                            }"
                        />

                        <div
                            :class="{
                                'escala_text' : true,
                                'collapse_hover' : collapse.flights 
                            }" 
                            v-if="qty_stopovers"
                        >
                            {{ `${qty_stopovers} Escala${qty_stopovers > 1 ? 's' : ''}` }}
                        </div>

                        <div
                            :class="{
                                'escala_text' : true,
                                'collapse_hover' : collapse.flights
                            }"
                            v-else
                        >
                            Directo
                        </div>
                    </div>

                    <ul class="aero_list">
                        <li>
                            <b>{{ getHour(departure.fecha) }}</b>
                            
                            <small class="extra_day">{{ assert_next_day ? '+1' : '' }}</small>
                        </li>

                        <li>
                            <span>{{ departure.destino }}</span>
                        </li>
                    </ul>
                </div>

                <div class="duracion_total">
                    {{ total_duration.text }}
                </div>

                <div class="equipaje_mouseover">
                    <font-awesome-icon
                        :id="`popover-suitcase-1-${_uid}`"
                        class="mr-1"
                        :icon="['fas' ,'suitcase-rolling']"
                        fixed-width
                        :style="{
                            color: color_suitcase.hand
                        }"
                    />
                    <b-popover 
                        :target="`popover-suitcase-1-${_uid}`"
                        triggers="hover"
                        placement="top"
                    >
                        <template v-slot:title>
                            Equipaje de mano
                        </template>
                        
                        <b :style="{ color: color_suitcase.hand}">{{ `${qty_suitcase.hand > 1 ? 'Incluye' : 'No incluye'}` }} </b> equipaje de mano.
                    </b-popover>

                    <font-awesome-icon
                        :id="`popover-suitcase-2-${_uid}`"
                        :icon="['fas' ,'suitcase']"
                        fixed-width
                        :style="{
                            color: color_suitcase.vault
                        }"
                    />

                    <b-popover 
                        :target="`popover-suitcase-2-${_uid}`"
                        triggers="hover"
                        placement="top"
                    >
                        <template v-slot:title>
                            Equipaje para despachar
                        </template>

                        <b :style="{ color: color_suitcase.vault}">{{ `${qty_suitcase.vault > 1 ? 'Incluye' : 'No incluye'}` }} </b> equipaje para despachar.
                    </b-popover>
                </div>
                
                <div class="a-block d-block d-md-none detalles_link">	
                    <font-awesome-icon
                        class="info_btn"
                        :icon="['fas' ,'info-circle']"
                        fixed-width
                        @click="abrir_modal()"
                    />
                </div>

                <div class="a-none d-none d-md-block detalles_link btn-filter">	
                    <a
                        data-toggle="collapse"
                        href="#!"
                        @click.stop.prevent="collapse.flights = !collapse.flights"
                    >
                        <font-awesome-icon
                            :icon="['fas' ,`angle-${collapse.flights ? 'up' : 'down'}`]"
                            fixed-width
                        />
                    </a>
                </div>
            </div>

            <b-collapse
                class="col-12"
                v-model="collapse.flights"
            >
                <flight 
                    v-for="(item_flight, index) in flights"
                    :key="index"
                    :index="index"
                    :item="item_flight"
                    :items="flights"
                />
            </b-collapse>
        </div>
        <transition 
            name="fade" 
            mode="out-in"
        >
            <modal 
                @trigger_modal="()=>{ abrir_modal() }"
                v-show="show_modal"
                title="Detalles"
                transition="bounce"
            >
                <flight 
                    v-for="(item_flight, index) in flights"
                    :key="index"
                    :index="index"
                    :item="item_flight"
                    :items="flights"
                />
            </modal>
        </transition>
    </div>
</template>

<script>
    import { library } from '@fortawesome/fontawesome-svg-core';

    // import { fab } from '@fortawesome/free-brands-svg-icons';

    import { faClock } from '@fortawesome/free-regular-svg-icons';

    import { faAngleUp, faAngleDown, faSuitcase, faInfoCircle, faSuitcaseRolling } from '@fortawesome/free-solid-svg-icons';

    library.add(faAngleUp, faAngleDown, faSuitcase, faInfoCircle, faSuitcaseRolling, faClock);

    import { Flight } from './components';
    
    import { BCollapse, BPopover } from 'bootstrap-vue';
    
    import { between_step2s_step2f } from '@/mixins';
    
    import { between_segment_flight } from './mixins';

    import Modal from '@/views/routes/modal';

    export default {
        mixins: [between_step2s_step2f, between_segment_flight],
        components: {
            BCollapse,
            BPopover,
            Flight,
            Modal
        },
        props: {
            item: {
                default: () => new Object(),
                type: Object,
                required: true
            },
            'active-xs': {
                default: () => false,
                type: Boolean,
                required: false
            }
        },
        data(){
            return({
                placements: [
                    'top'
                ],
                collapse: {
                    flights: false
                },
                config: {
                    hour_format: {
                        locale: 'es-AR',
                        hour: 'numeric', 
                        minute: 'numeric', 
                        hour12: true
                    }
                },
                show_modal: false
            });
        },
        methods : {
            abrir_modal(){
                this.show_modal = !this.show_modal;

                if(this.show_modal == true){
                    document.body.style.overflow = "hidden";
                }else{
                    document.body.style.overflow = "auto";
                }
            }  
        },
        computed: {
            show_aerotime(){
                if(this.collapse.flights || this.mobile_size){
                    return true;
                }else{
                    return false;
                }
            },
            assert_next_day(){
                return new Date(this.flights[this.flights.length - 1].llegada.fecha).getDate() !== new Date(this.flights[0].salida.fecha).getDate();
            },
            flights(){
                return this.item.tramos;
            },
            airline_name(){
                return this.getAirportClass(this.airline.name, 20);
            },
            qty_stopovers(){
                return this.flights.length - 1;
            },
            arrival(){
                return this.flights[0].salida;
            },
            departure(){
                let last_item = this.qty_stopovers === 0 ? 0 : this.qty_stopovers;

                return this.flights[last_item].llegada;
            },
            airline(){
                return {
                    name: this.item.tramos[0].marketingAirline.nombre,
                    code: this.item.tramos[0].marketingAirline.codigo
                }
            },
            qty_suitcase(){
                return {
                    vault: this.flights.filter(item => item.equipaje.bodega.piezas > 0).length,
                    hand: this.flights.filter(item => item.equipaje.mano.piezas > 0).length
                }
            },
            color_suitcase(){
                let reusable_function = qty => {
                    let color;

                    if(qty === this.flights.length){
                        color = '#03b26c'
                    }
                    else if(qty > 0){
                        color = '#ff8402';
                    }
                    else{
                        color = false;
                    }

                    return color;
                };

                return {
                    vault: reusable_function(this.qty_suitcase.vault),
                    hand: reusable_function(this.qty_suitcase.hand)
                };
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import './styles';
  
    @media (max-width: 991px){
        @import './styles/media_991px';
    }

    @media (max-width: 480px){
        @import './styles/media_480px';
    }

    
    .active-xs {
        @import './styles/media_480px';

        .a-none:not(label), label.a-none::before, label.a-none::after{
            display: none!important;
        }

        .content_idayvuelta > div:first-child{
            padding: 0px!important;
        }

        .a-block{
            display: block!important;
        }

        .content_idayvuelta{
            justify-content: space-between;
        }

        .aero_escalas{
            width: 100px;
        }
    }
</style>