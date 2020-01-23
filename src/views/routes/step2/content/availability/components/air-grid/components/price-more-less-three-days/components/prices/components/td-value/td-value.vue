<template>
    <fragment>
        <td
            class="precio_dia"
            v-if="typeof item !== 'string'"
            @click="toItem(item.id_rate)"
        >
            {{ `${item.price.moneda} ${new Intl.NumberFormat('es-AR').format(item.price.valor)}` }}
        </td>

        <td
            v-else
            class="precio_dia"
        >
            {{ item }}
        </td>
    </fragment>
</template>

<script>
    import { Fragment } from 'vue-fragment';

    import { toFormatStringDate } from '@/methods';

    import { between_components } from '@/views/routes/step2/content/availability/components/air-grid/mixins';

    export default {
        components: {
            Fragment
        },
        mixins: [between_components],
        props: {
            value: {
                default: () => '',
                type: String,
                required: true
            },
            items: {
                default: () => [],
                type: Array,
                required: true
            }
        },
        computed:{
            item(){
                return this.getItem(this.value);
            }
        },
        methods: {
            getItem(date_departure){
                let item = this.items.map(item => ({
                    ...item,
                    departure: item.departure.filter(item2 => {
                        let date = toFormatStringDate(item2.fecha);

                        if(date_departure === date){
                            return true;
                        }
                    })
                }))
                .filter(item => item.arrival.length && item.departure.length);

                if(item.length > 0){
                    item = item.sort((a, b) => {
                        a = a.price.valor, b = b.price.valor;

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
                    
                    return item;
                }
                else{
                    return ' - ';
                }
            },
        },
    }
</script>

<style lang="scss" scoped>
    .precio_dia{
        text-align: center;
        color: #2196F3;
    }

    .precio_dia:hover{
        transition: all 2s ease-in-out;
        background: #9090ff;
        color: white;
        font-weight: 600;
        cursor: pointer;
    }
</style>