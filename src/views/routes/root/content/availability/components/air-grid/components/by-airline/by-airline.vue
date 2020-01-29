<template>
    <table class="w-100">
        <tr>
            <td
                class="table_escala"
                width="200px"
            >
                <table
                    class=""
                    width="100%"
                >
                    <tr>
                        <td style="height: 44px" />
                    </tr>

                    <tr
                        v-for="(item_stopover, index) in $store.state.Step2.filter.stopover.arrival.items"
                        :key="index"
                    >
                        <td>{{ item_stopover.name }}</td>
                    </tr>
                </table>
            </td>

            <td style="position: relative; overflow: hidden; padding:0; background-color: white; background-clip: content-box;">
                <div 
                    v-if="config.table.table_absolute.left && items.length > 4"
                    class="table_left"
                    @click="moveTable"
                >
                    <font-awesome-icon
                        :icon="['fas' ,'angle-left']"
                        fixed-width
                    />
                </div>

                <div
                    v-if="table_absolute.max_left != Math.abs(config.table.table_absolute.left) && items.length > 4"
                    class="table_right"
                    @click="moveTable"
                >
                    <font-awesome-icon
                        :icon="['fas' ,'angle-right']"
                        fixed-width
                    />
                </div>
                
                <table
                    ref="tabla_absolute"
                    class="tabla_absolute"
                    :style="{
                        left: `${config.table.table_absolute.left}px`
                    }"
                >
                    <tr>
                        <td
                            v-for="(item_airline, index_airline) in items"
                            :key="index_airline"
                            class="aero_td"
                        >
                            <img
                                class="w-auto"
                                style="height: 30px"
                                :src="`//aereos.eviajes.online/img/airlines/${item_airline.codigo}.png`"
                                alt=""
                            >
                        </td>
                    </tr>

                    <tr
                        v-for="(item_stopover, index_stopover) in $store.state.Step2.filter.stopover.arrival.items"
                        :key="index_stopover"
                    >
                        <td
                            v-for="(item_airline_grid, index) in items"
                            :key="index"
                            @click="getItemGo(item_airline_grid, item_stopover)"
                            class="precio_aero"
                        >
                            {{ `${gridGetPrice(item_airline_grid.codigo, item_stopover.value)}` }}
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</template>

<script>
    import $ from 'jquery';

    import { between_components } from '@/views/routes/step2/content/availability/components/air-grid/mixins';

    export default {
        mixins: [between_components],
        data(){
            return({
                config: {
                    table: {
                        table_absolute: {
                            left: 0
                        }
                    }
                },
                table_absolute: {
                    max_left: undefined
                }
            });
        },
        computed: {
            items(){
                return this.$store.state.Step2.filter.airline.items.map(item => {
                    let rates = this.$store.state.Step2.data.rates.filter(item2 => {
                        let segments = item2.segmentos.filter(item3 => item3.tipo === 'ida' || item3.tipo === 'tramo').map(item3 => item3.tramos[0]).filter(item3 => item3.aerolineaOperadora.codigo === item.codigo);

                        return segments.length;
                    });

                    let segments = rates.map(item2 => item2.segmentos.map((item3, index3) => ({...item3, precio: item2.data.precio, id_segment: index3, id_rate: item2.numero})).filter(item3 => item3.tipo === 'ida' || item3.tipo === 'tramo')).flat(Infinity);

                    return {
                        ...item,
                        stopovers: segments.map(item2 => {
                            return {
                                value: item2.tramos.length -1,
                                name: (item => {
                                    switch (item) {
                                        case 0:
                                            return 'Directo';
                                        case 1:
                                            return '1 Escala';
                                        case (item > 1 ? item : ''):
                                            return `${item} Escalas`;
                                    }
                                })(item2.tramos.length -1)
                            };
                        }).filter((item2, index2, array2) => array2.findIndex(item3 => item3.value === item2.value) === index2).map(item2 => {
                            return {
                                ...item2,
                                rate: segments.filter(item3 => item3.tramos.length === item2.value + 1).sort((a, b) => {
                                    a = a.precio.total.valor, b.precio.total.valor;

                                    if(a < b){
                                        return -1;
                                    }
                                    else if(a > 1){
                                        return 1;
                                    }
                                    else{
                                        return 0;
                                    }
                                })[0]
                            };
                        })
                    };
                });
            }
        },
        methods: {
            gridGetRate(code_airline, value_stopover){
                return this.items.filter(item => item.codigo === code_airline)[0].stopovers.filter(item => item.value === value_stopover)[0];
            },
            gridGetPrice(...params){
                try {
                    let price = this.gridGetRate(...params).rate.precio.total.valor;
                    
                    return new Intl.NumberFormat('es-AR', {style: "currency", currency: "ARS"}).format(price);
                }
                catch(e){
                    return ' ';
                }
            },
            getItemGo(item_airline_grid, item_stopover){
                let rate_grid = item_airline_grid.stopovers.filter(item => item.value === item_stopover.value);

                if(rate_grid.length){
                    rate_grid = rate_grid[0].rate;

                    this.toItem(rate_grid.id_rate);
                }
            },
            moveTable(e){
                if(this.items.length > 4){
                    let $element = $(e.target);

                    if($element.prop('tagName') !== 'div'){
                        $element = $element.closest('div');
                    }

                    let $table_absolute = $element.siblings('.tabla_absolute');

                    let $td = $table_absolute.closest('td');

                    this.table_absolute.max_left = $table_absolute.width() - $td.width();

                    let left_value = 177;

                    let left = left_value;

                    if($element.hasClass('table_left')){
                        if((this.config.table.table_absolute.left + left_value) > 0){
                            left = Math.abs(this.config.table.table_absolute.left)
                        }
                        
                        this.config.table.table_absolute.left += left;
                    }
                    else if($element.hasClass('table_right')){
                        if(Math.abs(this.config.table.table_absolute.left - left_value) > this.table_absolute.max_left){
                            left -= Math.abs(this.config.table.table_absolute.left - left_value) - this.table_absolute.max_left;
                        }

                        this.config.table.table_absolute.left -= left;
                    }
                }
            }
        }
    }
</script>

<style scoped>
    .precio_aero:hover{
        background: #9090ff;
        color: white;
        font-weight: 600;
        cursor: pointer;
    }

     .tabla_absolute{
        border-top: 1px solid #f1f1f1;
        background: #fff;
        position: absolute;
        top: 0;
        width: max-content;
        transition: all 0.1s ease-in-out;
    }

    .tabla_absolute td{
        width: 175px;
        height: 45px;
        text-align: center;
        border-right: 1px solid #efefef;
        border-bottom: 1px solid #efefef;
    }

    .tabla_absolute img{
        width:  80px;
    }

    .precio_aero{
        text-align: center;
        color: #2196F3;
        transition: all 600ms ease-in-out;
        font-size: 0.9em;
    }

    .table_escala tr{
        padding: 0;
    }

    .table_escala td{
        background: #fff;
        height: 45px;
        padding: 10px;
        color: gray;
        border-bottom: 1px solid #efefef; 
        font-size: 0.9em;
    }
    
    .table_left, .table_right{
        z-index: 3;
        position: absolute;
        background: #fff;
        top: 45%;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        box-shadow: -1px 1px 9px -4px rgba(0,0,0,0.7);
        /* visibility: hidden; */
    }

    .table_left:hover, .table_right:hover{
        cursor: pointer;
        opacity: 0.9;
    }

    .table_left svg, .table_right svg{
        margin: auto;
        color: #9090ff;
    }

    .table_right{
        right: 0;
    }


</style>