<template>
    <div 
        :class="{
            'col-12' : true,
            'vuelo_container' : true,
            'destacado' : destacado
            
        }"
    >
        <div 
            v-if="state.loading_select == 2"
            class="overlay"
        >
            &nbsp;
        </div> 
        <div 
            :class="{
                'row' : true,
                'border_destacado' : destacado
            }"
        >
            <div 
                v-if="destacado"
                class="col-12 destacado_title"
            >
                <div>
                    <font-awesome-icon
                        class="pr-3"
                        :icon="['fas' ,'money-check']"
                        fixed-width
                    />
                </div>
                <div>
                    <h3>Oferta sólo por Septiembre</h3>
                    <p 
                        v-if="!mobile_size"
                    >
                        Pagá hasta 12 cuotas sin interés con todas las tarjetas Visa de crédito.
                    </p>
                </div> 
            </div>
            <div class="col-12 col-md-9">
                <div class="row">
                    <arrival-departure
                        v-for="(key, index) of Object.keys(segments)"
                        :key="index"
                        :type="key"
                        :items="segments[key]"
                    />
                </div>
            </div>
            <price
                :price="item.data.precio.total"
                :passengers="item.data.precio.muestro"
            >
                <template v-slot:select>
                    <hr>

                    <div class="col-12 text-center p-0">
                        <button
                            type="button"
                            :class="{
                                'btn': true,
                                'btn-primary': state.loading_select === 0,
                                'btn-info': state.loading_select === 1,
                                'btn-danger': state.loading_select === 2,
                                'selec_button': true,
                            }"
                            @click="onSelect"
                        >
                            <span v-if="state.loading_select === 0">
                                Seleccionar
                            </span>

                            <span 
                                v-if="state.loading_select === 2"
                                @click.stop
                            >
                                No disponible
                            </span>

                            <div v-if="state.loading_select === 1">
                                <b-spinner
                                    small 
                                    type="grow"
                                />
                            </div>
                        </button>
                    </div>
                </template>
            </price>
        </div>
    </div>
</template>

<script>
    import { library } from '@fortawesome/fontawesome-svg-core';

    import { faMoneyCheck } from '@fortawesome/free-solid-svg-icons';

    library.add( faMoneyCheck );

    import { ArrivalDeparture, Price } from './components';

    import { toFormatArrivalDeparture } from '@/methods';

    import { BSpinner } from 'bootstrap-vue';

    import { getFormatJsonSell } from '@/methods';

    export default {
        components: {
            ArrivalDeparture,
            Price,
            BSpinner
        },
        props: {
            item: {
                default: () => new Object(),
                type: Object,
                required: true
            },
            page: {
                default: () => 1,
                type: Number
            }
        },
        data(){
            return {
                state: {
                    loading_select: 0,
                }
            };
        },
        created(){
            this.$root.$on('scrollIntoView', res => {
                this.assertScrollIntoView(res);
            });
        },
        activated(){
            this.assertScrollIntoView(this.$store.state.Step2.scroll_into_view.id);
        },
        computed: {
            segments(){
                return toFormatArrivalDeparture(this.item.segmentos);
            },
            destacado(){
                if(this.item.numero == 1){
                    return true;
                }else{
                    return false;
                }
            }
        },
        methods: {
            assertScrollIntoView(id){
                if(this.item.numero === id){
                    this.$nextTick(() => {
                        this.$el.scrollIntoView({
                            behavior: "smooth",
                            block: "center"
                        });

                        this.$store.dispatch('Step2/SET_SCROLL_INTO_VIEW', '');
                    });
                }
            },
            onSelect(){
                if(this.state.loading_select === 0){
                    this.state.loading_select = 1;

                    this.$store.dispatch('Step3/CHECK_AVAILABILITY', getFormatJsonSell(this.item))
                    .then(res => {
                        this.$store.dispatch('Step3/SELECT_OPTION', {
                            id: this.item.numero,
                            page: this.page
                        });

                        this.$router.push({name: 'step3'});
                    })
                    .catch(e => {
                        this.$store.dispatch('Step3/SELECT_OPTION', {
                            id: this.item.numero,
                            page: this.page
                        });

                        this.$router.push({name: 'step3'});
                        /* if(e.message === '003xS6'){
                            this.state.loading_select = 0;
                        }
                        else{
                            this.state.loading_select = 2;
                        } */
                    });
                }
                else{
                    this.$store.dispatch('Step3/CHECK_AVAILABILITY').catch(e => {});
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import './styles';

    .overlay{
        position:absolute;
        width: 100%;
        bottom: 0;
        right: 0;
        left: 0;
        top: 0;
        z-index: 100000;
        opacity: 0.4;
        transition: all 1s ease-in;
    }
    .selec_button{
        font-size: 1.1em;
        font-weight: 600;
        margin: 10px 0;
        padding: 4px .75rem;
        width: 100%;
        border: none;
        height: 34px;
        display: flex;
        justify-content: center;
    }

    .selec_button:hover{
        cursor: pointer;
    }
</style>