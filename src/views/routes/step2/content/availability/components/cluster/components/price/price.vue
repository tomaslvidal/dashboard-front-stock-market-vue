<template>
    <div 
        :class="{
            'col-12': true,
            'col-md-3': !activeXs,
            'costo_container': true
        }"
        :style="{
            'border-left': activeXs ? '0px' : false
        }"
    >
        <div class="row precio_container">
            <div
                v-if="!activeXs"
                class="col-12 p-0 precio_adulto"
                @click="()=>{ precio_toggle = !precio_toggle}"
            >
                <small v-if="tablet_size">
                    Total
                </small>
                <span class="w-100 text-right"><small>{{ price.moneda }}</small> {{ new Intl.NumberFormat('es-AR',{ maximumFractionDigits:1}).format(price.valor) }}</span>
                <font-awesome-icon
                    v-if="tablet_size"
                    class="mt-1 pl-2"
                    :icon="['fas' ,`angle-${precio_toggle ? 'up' : 'down'}`]"
                    fixed-width
                />
            </div>

            <b-collapse
                v-for="(item_passenger, index) of passengers"
                :key="index"
                class="col-12 px-0 py-1"
                v-model="precio_toggle"
            >
                <div 
                    class="row"
                    v-if="item_passenger.tipo == 'pasajero'"
                >
                    <div class="col-12">
                        <div class="detalles_precio_mobile ">
                            <small>{{ `${item_passenger.nombre}` }}</small>
                        </div>
                    </div>
                    <div class="col-12">
                        <div class="detalles_precio_mobile">
                            <span>Tarifa:</span>

                            <span>{{ `${item_passenger.tarifaBaseEquivalente != 0 ? item_passenger.tarifaBaseEquivalente : item_passenger.tarifaTotal}` }}</span>
                        </div>
                    </div>
                    <div 
                        class="col-12"
                        v-if="item_passenger.impuestos > 0"
                    >
                        <div class="detalles_precio_mobile">
                            <span>Impuestos:</span>

                            <span>{{ `${item_passenger.impuestos }` }}</span>
                        </div>
                    </div>
                </div>

                <div 
                    class="row"
                    v-else
                >
                    <div class="col-12">
                        <div class="detalles_precio_mobile">
                            <span>{{ `${item_passenger.nombre}` }}:</span>

                            <span>{{ `${item_passenger.tarifaBaseEquivalente != 0 ? item_passenger.tarifaBaseEquivalente : item_passenger.tarifaTotal}` }}</span>
                        </div>
                    </div>
                    <div 
                        class="col-12"
                        v-if="item_passenger.impuestos > 0"
                    >
                        <div class="detalles_precio_mobile">
                            <span>Impuestos:</span>

                            <span>{{ `${item_passenger.impuestos }` }}</span>
                        </div>
                    </div>
                </div>
            </b-collapse>

            <div 
                v-if="activeXs"
                class="col-12 precio_total precio_mobile"
            >
                <div 
                    class="row"
                >
                    <div class="d-flex justify-content-between align-items-baseline flex-grow-1">
                        <small>Total</small>

                        <span class="precio_adulto px-0"><small>{{ price.moneda }}</small> {{ new Intl.NumberFormat('es-AR', {maximumFractionDigits:1}).format(price.valor) }}</span>
                    </div>
                </div>
            </div>

            <slot name="select" />
        </div>
    </div>
</template>

<script>
    import { library } from '@fortawesome/fontawesome-svg-core';
   
    import { faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons';

    import { BCollapse } from 'bootstrap-vue';

    library.add( faAngleUp, faAngleDown );

    export default {
        components: {
            BCollapse
        },
        data(){
            return{
                precio_toggle : false
            }
        },
        created(){
            if(this.tablet_size == true){
                this.precio_toggle=true;
            }else{
                this.precio_toggle=false
            }
        },
        props: {
            price: {
                default: () => new Object(),
                type: Object,
                required: true
            },
            passengers: {
                default: () => new Array(),
                type: Array,
                required: true
            },
            'active-xs': {
                default: () => false,
                type: Boolean,
                required: false
            }
        },
        watch: {
            'tablet_size': function(val){
                if(!val){
                    this.precio_toggle=true
                }else{
                     this.precio_toggle=false
                }
            }
        },       
    }
</script>

<style lang="scss" scoped>
    @import './styles';
</style>