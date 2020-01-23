<template>
    <fragment>
        <td-value
            v-for="(item_departure, index_departure) in data.departure"
            :key="index_departure"
            :value="item_departure"
            :items="items"
        />
    </fragment>
</template>

<script>
    import { Fragment } from 'vue-fragment';

    import { TdValue } from './components';

    import { toFormatArrivalDeparture, toFormatStringDate } from '@/methods';

    export default {
        components: {
            Fragment,
            TdValue
        },
        props: {
            data: {
                default: () => new Object(),
                type: Object,
                required: true
            }
        },
        computed:{
            items(){
                return JSON.parse(JSON.stringify(this.$store.state.Step2.data.rates)).map(item => ({id_rate: item.numero, price: item.data.precio.total, ...toFormatArrivalDeparture(item.segmentos)})).map(item => {
                    let map = JSON.parse(JSON.stringify(item));

                    ['arrival', 'departure'].forEach(key => {
                        let arrival_or_departure = key === 'arrival' ? 'salida' : 'llegada', object = {};

                        if(this.$store.state.Step2.config.type === 'arrival_departure'){
                            object = item[key];
                        }
                        else{
                            object = item['arrival'];
                        }

                        map[key] = object.map(item2 => ({
                            id_segment: item2.index, 
                            ...item2.tramos[arrival_or_departure === 'salida' ? 0 : item2.tramos.length - 1][arrival_or_departure]
                        }));
                    });

                    return map;
                }).map(item => {
                    ['arrival', 'departure'].forEach(key => {
                        item[key] = item[key].filter(item2 => {
                            let date = toFormatStringDate(item2.fecha);

                            if(this.data[key].includes(date)){
                                return true;
                            }
                        });
                    });

                    return item;
                }).filter(item => item.arrival.length && item.departure.length);
            }
        }
    }
</script>