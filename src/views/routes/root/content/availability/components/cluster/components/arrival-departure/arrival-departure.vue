<template>
    <div 
        :class="{
            'active-xs': activeXs
        }"
    >
        <div class="col-12">
            <div class="row">
                <div class="col-12 header_idayvuelta">
                    <div class="title_idayvuelta">
                        <h3>{{ type === 'arrival' ? 'IDA' : 'VUELTA' }}</h3>

                        <span>
                            {{
                                `${toLocaleString(item.flight.arrival.fecha, {weekday: 'long', first_capital_letter: true})} ${toLocaleString(item.flight.arrival.fecha, {day: 'numeric', first_capital_letter: true})} de ${toLocaleString(item.flight.arrival.fecha, {month: 'long', first_capital_letter: true})}`
                            }}
                        </span>
                    </div>

                    <div class="recorrido d-none d-sm-block">
                        {{ arrival_departure }}
                    </div>
                </div>

                <segment
                    v-for="(item_segment, index_segment) of segments"
                    :key="index_segment"
                    :index="index_segment"
                    :item="item_segment"
                    :active-xs="activeXs"
                />
            </div>
        </div>
    </div>
</template>

<script>
    import { Segment } from './components';

    import { toLocaleString } from '@/mixins/methods';

    export default {
        mixins: [toLocaleString],
        components: {
            Segment
        },
        props: {
            items: {
                default: () => new Array(),
                type: Array,
                required: true
            },
            type: {
                default: () => '',
                type: String,
                required: true
            },
            'active-xs': {
                default: () => false,
                type: Boolean,
                required: false
            }
        },
        computed:{
            item(){
                let item = this.segments[0];

                return {
                    ...item,
                    flight: {
                        arrival: item.tramos[0].salida,
                        departure: item.tramos[item.tramos.length - 1].llegada
                    }
                };
            },
            segments(){
                return this.items;
            },
            arrival_departure(){
                if(this.activeXs == true){
                    return `${this.splitAirport(this.item.flight.arrival.destino_completo)} - ${this.splitAirport(this.item.flight.departure.destino_completo)}`;
                }else{
                    return `${this.item.flight.arrival.destino_completo} - ${this.item.flight.departure.destino_completo}`
                }
            
            }
        },
        methods:{
            splitAirport(data){
                var myResult = data.split(',');
                return myResult[1];
            }
        },
        data(){
            return {
                collapse: {
                    stopovers: false
                }
            };
        }
    }
</script>

<style lang="scss" scoped>
    @import './styles';

    .active-xs {
        @import './styles/media_480px';
    }

    @media (max-width: 480px){
        @import './styles/media_480px';
           
       .title_idayvuelta{
            justify-content: space-between;
            width: 100%;
        }
    }
</style>