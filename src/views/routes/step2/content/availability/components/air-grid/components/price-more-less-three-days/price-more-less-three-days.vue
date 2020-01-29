<template>
    <table
        id="precio_dia"
        class="table table-bordered"
    >
        <thead class="text-center">
            <td>{{ $store.state.Step2.config.type === 'arrival' ? 'Salida / Llegada' : 'Ida / Vuelta' }}</td>

            <td
                v-for="(item_departure, index_departure) in dates.departure"
                :key="index_departure"
            >
                {{ toLocaleString(item_departure, {weekday: 'long', first_capital_letter: true}) }}
                
                <br>
                
                {{ `${toLocaleString(item_departure, {day: 'numeric'})} de ${toLocaleString(item_departure, {month: 'long', first_capital_letter: true})}` }}
            </td>
        </thead>

        <tbody>
            <tr
                v-for="(item_arrival, index_arrival) in dates.arrival"
                :key="index_arrival"
            >
                <td class="dia">
                    {{ `${toLocaleString(item_arrival, {weekday: 'long', first_capital_letter: true})} ${toLocaleString(item_arrival, {day: 'numeric'})} de ${toLocaleString(item_arrival, {month: 'long', first_capital_letter: true})}` }}
                </td>

                <prices
                    :data="{
                        arrival: [item_arrival],
                        departure: dates.departure
                    }"
                />
            </tr>
            <tr class="leyenda_colores">
                <td class="leyenda_td">
                    <span class="cuadrado green">&nbsp;</span>
                    Más Barato
                </td>
                <td class="leyenda_td">
                    <span class="cuadrado blue">&nbsp;</span>
                    Ida Y Vuelta
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
    import { Prices } from './components';

    import { toLocaleString } from '@/mixins/methods';

    import { toFormatStringDate } from '@/methods';

    export default {
        mixins: [toLocaleString],
        components: {
            Prices
        },
        computed: {
            dates(){
                let data = {
                    'arrival': [],
                    'departure': []
                };

                this.$store.state.Step2.data.rates.forEach(item => item.segmentos.forEach(item2 => {
                    const addDates = (arrival_or_departure) => {
                        data[arrival_or_departure === 'salida' ? 'arrival' : 'departure'].push((item3 => {
                            return toFormatStringDate(item3);
                        })(item2.tramos[0]['salida'].fecha));
                    }

                    if(this.$store.state.Step2.config.type === 'arrival_departure'){
                        let arrival_or_departure = item2.tipo === 'ida' ? 'salida' : 'llegada';

                        addDates(arrival_or_departure);
                    }
                    else{
                        addDates('salida');

                        addDates('llegada');
                    }
                }))

                Object.keys(data).forEach(key => {
                    data[key] = data[key].filter((item, index, array) => array.findIndex(item2 => item2 === item) === index).sort((a, b) => {
                        a = new Date(a), b = new Date(b);

                        if(a < b){
                            return -1;
                        }
                        else if(a > b){
                            return 1;
                        }
                        else{
                            return 0;
                        }
                    });
                });

                return data;
            }
        }
    }
</script>

<style scoped>
     #precio_dia{
        font-size: 0.8em;
        background: #fff;
         transition: all 600ms ease-in-out;
    }

    #precio_dia thead, .dia{
        font-weight: 500;
        color: #4c4a4a;
        background: #f1f1f1;
    }
    .leyenda_colores{
        background:#fff;
        color: gray;
        font-size: 0.8em;
    }
    .cuadrado{
        width: 15px; 
        content:'';
        display: inline-block;
        height: 15px;
        border: 0.5px solid #efefef;
        border-radius: 4px;
        margin-right: 5px;
    }
    .blue{ background: #00BCD4;}
    .green{ background: greenyellow; }

    .leyenda_td{
        padding: 10px;
        border: none;
    }

</style>