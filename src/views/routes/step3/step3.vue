<template>
    <div class="col-12">
        <div class="row">
            <div class="col-12">
                <button
                    class=" btn"
                    @click="toStep2"
                    id="backBtn_step3"
                >
                    <font-awesome-icon
                        class="mr-2"
                        :icon="['fas' ,'angle-left']"
                    />

                    Volver Atrás
                </button>
            </div>

            <div class="col-12 col-lg-8 forms_step3">
                <ValidationObserver 
                    v-slot="{ invalid }"
                    ref="validacion"
                >
                    <form
                        @submit.stop.prevent="onSubmit(invalid)"
                    >
                        <!-- <h1>Complet&aacute; tus datos para finalizar tu compra.</h1> -->

                        <div
                            class="main datos_container"
                            id="doc_requerida"
                        >
                            <a
                                href="#!"
                                @click="()=>{ documentation_toggle = !documentation_toggle }"
                                data-toggle="collapse"
                                aria-control="#documentation_toggle"
                                class="boton-wrapper btn-filter filtro_title"
                            >
                                <h2>
                                    <font-awesome-icon
                                        class="mr-2"
                                        :icon="['fas' ,'exclamation-triangle']"
                                        fixed-width
                                    />

                                    Documentación requerida
                                </h2>
                                
                                <font-awesome-icon
                                    class="mt-1"
                                    :icon="['fas' ,`angle-${documentation_toggle ? 'up' : 'down'}`]"
                                    fixed-width
                                />
                            </a>
                            <b-collapse
                                v-model="documentation_toggle"
                                visible
                                id="documentacion_toggle"
                            >
                                <h4>Vuelo Estados Unidos</h4>

                                <div>
                                    <p>Para poder hacer este viaje, los pasajeros argentinos necesitarán contar con cierta documentación: Estados Unidos (conexión en DFW)</p>
                                </div>
                            </b-collapse>   
                        </div><!--   <payment 
                            :form="form.payment"
                            @open_modal="()=>{ abrir_modal(3) }"
                        /> -->

                        <div
                            class="main datos_container"
                            id="response_options"
                        >
                            <div>
                                <h2>Ingresa los datos de contacto</h2>
                            </div>

                            <contact
                                :form="form.contact"
                            />
                        </div>

                        <div class="main datos_container">
                            <div>
                                <h2>Ingresa los datos de los pasajeros</h2>
                            </div>

                            <passenger
                                v-for="(form_passenger, index) in form.passengers"
                                :form="form_passenger"
                                :key="index"
                                :class="form.passengers.length-1 != index ? 'mb-5' : ''"
                            />
                        </div>

                        <div class="form-group col-12">
                            <div class="custom-control custom-checkbox custom-control-inline">
                                <validation-provider
                                    rules="required"
                                    v-slot="{ errors }"
                                    name="terminos y condiciones"
                                    :vid="`terms${_uid}`"
                                >
                                    <input
                                        type="checkbox"
                                        id="condiciones_politicas"
                                        name="options"
                                        class="custom-control-input"
                                        value="1"
                                        v-model="form.term"
                                    >

                                    <label
                                        class="custom-control-label"
                                        for="condiciones_politicas"
                                    >
                                        Leí y acepto las <span
                                            @click.stop.prevent="abrir_modal(2)"
                                            style="color:blue"
                                        >condiciones de compra y políticas de privaciadad</span>
                                    </label>

                                    <span class="invalid-feedback d-flex">{{ errors[0] }}</span>
                                </validation-provider>
                            </div>
                        </div>

                        <div class="form-group col-12">
                            <button
                                type="submit"
                                :class="{
                                    'btn': true,
                                    'w-100' : true,
                                    'btn-outline-primary': state.loading_select === 0,
                                    'btn-outline-info': state.loading_select === 1,
                                    'btn-outline-danger': state.loading_select === 2,
                                }"
                            >
                                <span v-if="state.loading_select === 0">
                                    Comprar
                                </span>

                                <span v-if="state.loading_select === 2">
                                    Volver a intentar
                                </span>

                                <div
                                    class="d-flex align-items-center"
                                    v-if="state.loading_select === 1"
                                >
                                    <b-spinner
                                        small 
                                        type="grow"
                                    />

                                    <span class="ml-1">Cargando</span>
                                </div>
                            </button>
                        </div>
                    </form>
                </ValidationObserver>
            </div>

            <div class="col-12 col-lg-4 sticky_container">
                <div class="main ">
                    <div class=" col-12 ">
                        <a
                            href="#!"
                            @click="()=>{ pago_toggle = !pago_toggle }"
                            class="boton-wrapper btn-filter filtro_title pago_title"
                        >
                            <span>
                                <font-awesome-icon
                                    class="mr-2"
                                    :icon="['far' ,'money-bill-alt']"
                                    fixed-width
                                />

                                Detalles del Pago
                            </span>
                            
                            <font-awesome-icon
                                class="mt-1"
                                :icon="['fas' ,`angle-${pago_toggle ? 'up' : 'down'}`]"
                                fixed-width
                            />
                        </a>
                    </div>
                    <b-collapse
                        id="detalles_pago"
                        v-model="pago_toggle"
                        visible
                    >
                        <price
                            :price="item.data.precio.total"
                            :passengers="item.data.precio.muestro"
                            :active-xs="true"
                        />
                    </b-collapse>
                </div>

                <div class="main mt-4">
                    <div class="col-12">
                        <a
                            href="#!"
                            @click="()=>{ vuelos_toggle = !vuelos_toggle }"
                            data-toggle="collapse"
                            aria-control="#detalles_vuelo"
                            class="boton-wrapper btn-filter filtro_title pago_title"
                        >
                            <span>
                                <font-awesome-icon
                                    class="mr-2"
                                    :icon="['fas' ,'plane-departure']"
                                    fixed-width
                                />

                                Detalles del Vuelo
                            </span>

                            <font-awesome-icon
                                class="mt-1"
                                :icon="['fas' ,`angle-${vuelos_toggle ? 'up' : 'down'}`]"
                                fixed-width
                            />
                        </a>
                    </div>
                
                    <b-collapse
                        class="show collapse toggle-container"
                        id="detalles_vuelo"
                        v-model="vuelos_toggle"
                        visible
                    >
                        <arrival-departure
                            v-for="(key, index) of Object.keys(segments)"
                            :key="index"
                            :type="key"
                            :items="segments[key]"
                            :active-xs="true"
                        />
                    </b-collapse>
                </div>

                <div
                    class="main mt-4 politicas"
                >
                    <h3 href="">
                        Politicas de Cambio y Cancelaciones
                    </h3>

                    <button
                        type="button"
                        class="btn politicas_button"
                        @click="abrir_modal(1)"
                    >
                        Ver condiciones
                    </button>

                    <transition 
                        name="fade" 
                        mode="out-in"
                    >
                        <modal 
                            @trigger_modal="()=>{abrir_modal()}"
                            v-show="show_modal"
                            :title="state.modal.title"
                        >
                            <cambios v-if="state.modal.value == 1" />
                                
                            <privacidad v-if="state.modal.value == 2" />

                            <tarjeta v-if="state.modal.value == 3" />
                        </modal>
                    </transition>
                </div>	
            </div>
        </div>
    </div>
</template>

<script>
    import { library } from '@fortawesome/fontawesome-svg-core';

    // import { fab } from '@fortawesome/free-brands-svg-icons';

    import { faMoneyBillAlt } from '@fortawesome/free-regular-svg-icons';

    import { faAngleLeft, faAngleUp, faAngleDown, faExclamationTriangle, faPlaneDeparture, faChevronCircleUp } from '@fortawesome/free-solid-svg-icons';

    library.add(faAngleLeft, faExclamationTriangle, faAngleUp, faAngleDown, faMoneyBillAlt, faPlaneDeparture, faChevronCircleUp);
    
    import $ from 'jquery';

    import Vue from 'vue';

    import { Price, ArrivalDeparture } from '@/views/routes/step2/content/availability/components/cluster/components';

    import { BCollapse } from 'bootstrap-vue';

    import Passenger from './passenger';

    import Contact from './contact';

    //import Payment from './payment';

    import Modal from '@/views/routes/modal';

    import { Cambios, Privacidad, Tarjeta } from '@/views/routes/modal/components';

    import { toFormatArrivalDeparture, forQueryString } from '@/methods';

    import { BSpinner } from 'bootstrap-vue';

    export default {
        components: {
            ArrivalDeparture,
            Price,
            Passenger,
            Contact,
            Modal,
            Cambios,
            Privacidad,
            BCollapse,
            Tarjeta,
            //Payment,
            BSpinner
        },
        created(){
            if(!this.form.passengers.length){
                this.$store.dispatch('Step3/PARSE_FORM_PASSENGER', this.item.data.precio.pasajeros.map(item => {
                    let items = [];

                    for(let i = 0; i < item.cantidad; i++){
                        items.push({
                            config: {
                                number: i + 1,
                                title: item.titulo,
                                type: item.tipo,
                                fare: item.farecalc
                            },
                            name: '',
                            second_name: '',
                            last_name: '',
                            sex: '',
                            birthdate: '',
                            frequent: {
                                name: '',
                                number: ''
                            },
                            document: {
                                type: '',
                                number: ''
                            },
                        });
                    }

                    return items;
                }).flat(Infinity).map((item, index) => ({...item, id: index})));
            }
        },
        data(){
           return{
                show_modal: false,
                pago_toggle: true,
                vuelos_toggle: true,
                documentation_toggle: false,
                state: {
                    modal: {
                        title: '',
                        value: ''
                    },
                    loading_select: 0,
                }
           } 
        },
        computed: {
            item(){
                return this.$store.getters['Step3/rate'];
            },
            segments(){
                return toFormatArrivalDeparture(this.item.segmentos);
            },
            form(){
                return Object.assign({}, this.$store.state.Step3.form);
            }
        },
        methods:{
            toStep2(){
                this.$router.push({ name: 'step2', query: forQueryString(JSON.parse(JSON.stringify(this.$store.state.Step2.search)))});
            },
            async onSubmit(val){
                await this.$refs.validacion.validate();

                if(!val){
                    if(this.state.loading_select !== 1){
                        this.state.loading_select = 1;

                        this.$store.dispatch('Step3/SET_DATA_FORM', this.form);
                                
                        this.$store.dispatch('Step3/RUN_WEB_SERVICES')
                        .then(() => {
                            this.$router.push({name: 'step5'});
                        })
                        .catch(e => {
                            if(e.message === '004xS7'){
                                this.state.loading_select = 0;
                            }
                            else{
                                this.state.loading_select = 2;
                            }
                        });
                    }
                    else{
                        this.$store.dispatch('Step3/RUN_WEB_SERVICES', 'cancel').catch(e => {});
                    }
                }
                else{
                    Vue.swal('ERROR!','Se deben completar correctamente todos los campos.', 'error');
                }
            },
            abrir_modal(val){
                this.show_modal = !this.show_modal;

                if(this.show_modal == true){
                    document.body.style.overflow = "hidden";
                }else{
                    document.body.style.overflow = "auto";
                }
                if(val == 1){
                    this.state.modal.title = "Politicas de cambio y cancelaciones";
                    this.state.modal.value = 1;
                }
                if(val == 2){
                    this.state.modal.title = "Condiciones de compra y Políticas de privaciadad";
                    this.state.modal.value = 2;
                }
                if(val == 3){
                    this.state.modal.title = "Condiciones de compra tarjeta";
                    this.state.modal.value = 3;
                }
             
            }  
                 
        }
    }
</script>

<style lang="scss" scoped>
    @import './styles';

    @media (max-width: 995px){
        .sticky_container{
            order: 1;
        }
        .forms_step3{
            order: 2;
        }
    }
  
</style>