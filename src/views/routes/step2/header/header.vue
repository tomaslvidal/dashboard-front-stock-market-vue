<template>
    <header class="container-fluid mb-4 mt-2 px-lg-0 sticky_header">
        <!-- HEADER FIXED --------------------------------------->
        <div
            v-if="router.type_search !== 3"
            :class="{
                'col-12':true,
                'd-flex' : !disable_mobile,
                'd-none' : disable_mobile,
                'disappear' : !display_header,
                'mobile_menu_buscador': true
            }"
        >
            <div class="col-12 px-0 px-md-2">
                <!-- DESKTOP -->
                <div
                    class="header_fixed_desktop"
                    v-if="!tablet_size"
                >
                    <p>
                        Buscando vuelos desde
                        <span v-html="origin_destination">&nbsp;</span>
                        <span v-html="date_idayvuelta">&nbsp;</span>
                    </p>
                    <button 
                        class="btn btn-sm btn-primary modificar_button"
                        @click="() => { changeHeader() }"
                        type="button"
                    >
                        <font-awesome-icon
                            class="pr-2"
                            :icon="['fas' ,'search']"
                            fixed-width
                        />Modificar Búsqueda
                    </button>   
                </div>

                <!-- TABLET -->
                <div v-if="tablet_size">
                    <div class="mobile_fecha_container">
                        <div class="mobile_fecha col-8">
                            <div class="recorrido_mobile">
                                {{ origin_destination_mobile }}
                            </div>
                            <div class="checkin_mobile">
                                <font-awesome-icon
                                    class="pr-2"
                                    :icon="['fas' ,'calendar-alt']"
                                    fixed-width
                                />
                                {{ dates_mobile }}
                            </div>
                        </div>

                        <div class="col-4 text-right">
                            <button 
                                class="btn btn-sm btn-primary modificar_button w-100"
                                @click="() => { showModal(2, false); $root.$emit('showmodal', 2) }"
                                type="button"
                            >
                                <font-awesome-icon
                                    class="pr-2"
                                    :icon="['fas' ,'search']"
                                    fixed-width
                                />Modificar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- HEADER FORMS --> 
        <div 
            :class="{
                'row' : true,
                'busqueda' : true,
                'd-none' : !disable_mobile,
                'd-flex' : disable_mobile,
                'appear' : !display_header,
                'd-lg-flex' : !display_header
            }"
        >
            <div class="col-12 detalle_modal_container">
                <ValidationObserver
                    ref="observer"
                    v-slot="{ valid }"
                >
                    <form
                        @submit.stop.prevent="onSearch(valid)"
                    >
                        <div class="row py-2">
                            <div 
                                :class="{
                                    'col-md-6 form_tabs' : true,
                                    'form-group' : tablet_size
                                }"
                            >
                                <div class="custom-control custom-radio custom-control-inline">
                                    <input 
                                        id="idayvuelta"
                                        v-model="form.type_search"
                                        type="radio"
                                        name="options"
                                        class="custom-control-input"
                                        checked
                                        :value="1"
                                    >

                                    <label 
                                        class="custom-control-label" 
                                        for="idayvuelta"
                                    >
                                        Ida y Vuelta
                                    </label>
                                </div>

                                <div class="custom-control custom-radio custom-control-inline">
                                    <input 
                                        id="ida"
                                        v-model="form.type_search"
                                        type="radio"
                                        name="options"
                                        class="custom-control-input"
                                        :value="2"
                                    >

                                    <label 
                                        class="custom-control-label" 
                                        for="ida"
                                    >
                                        Sólo Ida
                                    </label>
                                </div>

                                <div class="custom-control custom-radio custom-control-inline">
                                    <input
                                        id="multidestino"
                                        v-model="form.type_search"
                                        type="radio"
                                        name="options"
                                        class="custom-control-input"
                                        :value="3"
                                        :disabled="is_flex"
                                    >
                                    
                                    <label 
                                        class="custom-control-label"
                                        for="multidestino"
                                    >
                                        Multidestino
                                    </label>
                                </div>
                            </div>

                            <div class="form-group col-sm-6 d-flex align-items-center m-lg-0">
                                <div class="custom-control custom-checkbox w-100">
                                    <input 
                                        id="todos_salida" 
                                        type="checkbox" 
                                        name="todos_salida" 
                                        class="custom-control-input "
                                        v-model="form.flex"
                                    >
                                
                                    <label 
                                        for="todos_salida" 
                                        class="custom-control-label  boton fechas_flexibles"
                                    >
                                        Fechas flexibles
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div
                                :class="{
                                    'col-lg-9': form.type_search !== 3,
                                    'col-12': form.type_search === 3
                                }"
                            >
                                <div
                                    v-for="index in form.qty_flights"
                                    :key="index"
                                >
                                    <flight 
                                        :items="form.flights"
                                        :index="index-1"
                                        :type-search="form.type_search"
                                    >
                                        <template
                                            v-if="form.qty_flights > 1"
                                            #title
                                        >
                                            <h2 class="col-12 tramo">
                                                Tramo {{ index }}
                                            </h2>
                                        </template>
                                    </flight>
                                </div>
                            </div>

                            <div
                                v-if="form.type_search === 3"
                                class="form-group cofalse d-flex flex-wrap"
                            >
                                <div 
                                    v-show="form.qty_flights >= 3"
                                    class="del_tramo del_style"
                                >
                                    <a
                                        href="#!"
                                        @click="deleteFlight"
                                    >
                                        <font-awesome-icon
                                            :icon="['fas' ,'minus-circle']"
                                            fixed-width
                                            class="mr-2"
                                        />
                                        
                                        <span>Eliminar Tramo</span>
                                    </a>
                                </div>

                                <div
                                    v-show="form.qty_flights !== 5"
                                    class="add_tramo px-2"
                                >
                                    <a
                                        href="#!"
                                        @click="addFlight"
                                    >
                                        <font-awesome-icon
                                            :icon="['fas' ,'plus-circle']"
                                            fixed-width
                                            class="mr-2"
                                        />
                                        
                                        <span>Agregar Tramo</span>
                                    </a>
                                </div>
                            </div>

                            <div
                                :class="{
                                    'form-group': tablet_size,
                                    'col-12': true,
                                    'col-lg-3': form.type_search !== 3,
                                    'col-lg-4': form.type_search === 3
                                }"
                            >
                                <div class="row">
                                    <div
                                        :class="{
                                            'form-group' : tablet_size,
                                            'col-md-8': form.type_search !== 3,
                                            'col-12': form.type_search === 3,
                                            'col-lg-7': form.type_search === 3,
                                            'col-xl-6': form.type_search === 3
                                        }"
                                    >
                                        <b-dropdown
                                            ref="passenger_picker"
                                            variant="outline-secondary"
                                            menu-class="pasajeros_popover"
                                            class="w-100"
                                            toggle-class="text-left"
                                        >
                                            <template #button-content>
                                                <font-awesome-icon
                                                    :icon="['fas' ,'user']"
                                                    fixed-width
                                                />

                                                <span 
                                                    id="pasajeros_number" 
                                                    class="px-1"
                                                >
                                                    {{ qty_passengers }}
                                                </span>

                                                <span>Pasajero/s</span>
                                            </template>

                                            <template #default>
                                                <!-- <div class="col-12 filtrar cerrar_modal d-flex d-lg-none">
                                                        <h1>Detalle Pasajeros</h1>
                                                        
                                                        <button type="button" class="back_button " >
                                                            <i style="color:#f44336; font-size: 1.5em" class="far fa-times-circle  pr-2" onclick="cerrar_pasajeros()"></i>
                                                        </button>
                                                    </div> -->

                                                <passenger-picker
                                                    v-model="form.passenger.adults" 
                                                    :minvalue="1" 
                                                    title="Adultos" 
                                                    subtitle="Desde 18 años"
                                                />

                                                <passenger-picker 
                                                    v-model="form.passenger.children" 
                                                    title="Niños" 
                                                    subtitle="Menores a 11 años" 
                                                />

                                                <passenger-picker 
                                                    v-model="form.passenger.babies" 
                                                    title="Bebes" 
                                                    subtitle="Menores a 1 año"
                                                />

                                                <button 
                                                    type="button" 
                                                    class="btn btn-sm btn-primary aplicar_boton"
                                                    @click="() => $refs.passenger_picker.hide()"
                                                >
                                                    Aplicar
                                                </button>
                                            </template>
                                        </b-dropdown>
                                    </div>

                                    <div
                                        :class="{
                                            'form-group': true,
                                            'col-sm-4': form.type_search !== 3,
                                            'col-12': form.type_search === 3,
                                            'col-lg-5': form.type_search === 3,
                                            'col-xl-6': form.type_search === 3,
                                            'pl-xl-0': true
                                        }"
                                    >
                                        <input 
                                            type="submit" 
                                            :class="{
                                                'btn': true,
                                                'btn-primary': true,
                                                'boton_busqueda': true,
                                                'w-100': true
                                            }" 
                                            placeholder="Destino" 
                                            value="Buscar"
                                        >
                                    </div>
                                </div>
                            </div>
                        </div>
                        <b-collapse
                            class="show collapse toggle-container"
                            v-model="opciones_avanzadas"
                            visible
                        >
                            <OpcionesAvanzadas />
                        </b-collapse>
                        <div class="opciones_avanzadas ">
                            <p 
                                @click="()=>{ opciones_avanzadas = !opciones_avanzadas }"
                            >
                                <span class="pr-1">
                                    Opciones Avanzadas
                                </span>
                                <font-awesome-icon
                                    class="mt-1"
                                    :icon="['fas' ,`angle-${opciones_avanzadas ? 'up' : 'down'}`]"
                                    fixed-width
                                />
                            </p>
                        </div>
                    </form>
                </ValidationObserver>
            </div>
        </div>
    </header>
</template>

<script>
    import { library } from '@fortawesome/fontawesome-svg-core';

    import { faUser, faMinusCircle, faPlusCircle, faCalendarAlt, faSearch } from '@fortawesome/free-solid-svg-icons';

    import { BCollapse } from 'bootstrap-vue';

    // import { fab } from '@fortawesome/free-brands-svg-icons';

    // import { far } from '@fortawesome/free-regular-svg-icons';

    import { PassengerPicker, Flight, OpcionesAvanzadas } from './components';

    library.add(faUser, faMinusCircle, faPlusCircle, faCalendarAlt, faSearch);

    import { between_mobile_header } from '@/views/routes/step2/mixins';
    
    import { forQueryString } from '@/methods';
    
    import { toLocaleString } from '@/mixins/methods';

    import { BDropdown } from 'bootstrap-vue';
    
    export default {
        props:{
            disable_mobile: {
                default: () => false,
                type: Boolean,
                required: false
            }
        },
        data(){
            return{
                opciones_avanzadas: false,
                display_header : true
            }
        },
        mixins: [between_mobile_header, toLocaleString ],
        components: {
            Flight,
            PassengerPicker,
            BCollapse,
            OpcionesAvanzadas,
            BDropdown
        },
        computed: {
            form(){
                return this.$store.state.Step2.search;
            },
            qty_passengers(){
                let total = 0;

                for (let item in this.form.passenger){
                    total += this.form.passenger[item];
                }

                return total;
            },
            origin_destination(){
                if(this.router.flights[0].origin !== null){
                    return `<b>${this.splitCity(this.router.flights[0].origin.label)} </b> a <b>${this.splitCity(this.router.flights[0].destination.label)}</b>`; 
                    
                }

                return '';
            },
            origin_destination_mobile(){
                if(this.router.flights[0].origin !== null){
                    return `${this.router.flights[0].origin.value} - ${this.router.flights[0].destination.value}`; 
                }

                return '';
            },
            date_idayvuelta(){
                let ida;
                let vuelta;

                if(this.router.flights[0].date instanceof Array){
                   
                   if(this.router.flights[0].date[0]){
                        ida = `saliendo el <b>${this.toLocaleString(this.router.flights[0].date[0], {weekday: 'short', first_capital_letter: true}) }
                              ${this.toLocaleString(this.router.flights[0].date[0], {day: 'numeric', first_capital_letter: true}) } 
                              de ${this.toLocaleString(this.router.flights[0].date[0], {month: 'long', first_capital_letter: true}) }</b>`;
                   }
                   
                    if(this.router.flights[0].date[1]){
                        vuelta = ` y volviendo el <b>${this.toLocaleString(this.router.flights[0].date[1], {weekday: 'short', first_capital_letter: true}) }
                                ${this.toLocaleString(this.router.flights[0].date[1], {day: 'numeric', first_capital_letter: true}) } 
                                de ${this.toLocaleString(this.router.flights[0].date[1], {month: 'long', first_capital_letter: true}) } </b>`;
                    }else{
                        vuelta = ''
                    }
                }
                
                return ida + vuelta;
            },
            is_flex(){
                if( this.$store.state.Step2.search.flex === true){
                    return true;
                }
                return false;
            },
            dates_mobile(){
                if(this.router.flights[0].date instanceof Array){
                    return `${this.toFormatStringDate(this.router.flights[0].date[0])} - ${this.toFormatStringDate(this.router.flights[0].date[1])}`;
                }

                if(this.router.flights[0].date !== ''){
                    return this.toFormatStringDate(this.router.flights[0].date);
                }

                return '';
            }
        },
        watch: {
            'form.type_search': function(){
                if(this.form.type_search !== 3){
                    this.form.qty_flights = 1;
                }
                else if(this.form.type_search === 3){
                    this.form.qty_flights = 2;
                }

                this.$refs.observer.reset();
            },
            'form.qty_flights': function (newVal, oldVal){
                if((oldVal - newVal) > 0){
                    for (let i = oldVal; i > newVal; i--){
                        this.$delete(this.form.flights, i - 1);
                    }
                }
                else{
                    for(let i = oldVal; i < newVal; i++){
                        if(typeof this.form.flights[i] === 'undefined'){
                            this.$set(this.form.flights, i, {
                                origin: null,
                                destination: null,
                                date: ''
                            })
                        }
                    }
                }
            },
        },
        methods: {
            async onSearch(valid){
                await this.$refs.observer.validate();

                if(valid){
                    const search = JSON.parse(JSON.stringify(Object.assign({}, this.$store.state.Step2.search, this.form)));

                    await this.$store.dispatch('Step2/SET_SEARCH', JSON.parse(JSON.stringify(search)));
                    
                    this.display_header = true;
                    this.hideModal();

                    this.$router.push({
                        name: 'step2',
                        query: forQueryString(search)
                    }).catch(e => {
                        if(e.constructor.name !== 'NavigationDuplicated'){
                            throw e;
                        }
                    });
                }
                else{
                    console.log("invalid");
                }
            },
            toFormatStringDate(date){
                if(!(date instanceof Date)){
                    date = new Date(date);
                } 

                return `${(date.getDate())}-${(date.getMonth() + 1)}-${(date.getFullYear())}`;
            },
            addFlight(){
                if((this.form.qty_flights + 1) <= 5){
                    this.form.qty_flights++;
                }
            },
            deleteFlight(){
                if((this.form.qty_flights - 1) >= 2){
                    this.form.qty_flights--;
                }
            },
            changeHeader(){
                this.display_header = false;
            },
            splitCity(data){
                let myResult = data.split('(');
                myResult = myResult[0];

                if(myResult.includes('-')){
                    myResult = myResult.split("-");
                    return myResult[0];
                }

                return myResult;
            }
        
        }
    }
</script>

<style lang="scss" scoped>
    
    @import './styles';
    
    @media (max-width: 991px) {
        .header_fixed_desktop p{
            font-size: 0.9em;
        }   
    
        .form_tabs{
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
        }
        .busqueda{
            border-bottom: none;
            box-shadow: none;
            padding: 0;
        }
        .detalle_modal_container{
            padding: 0;

        }
        .custom-control-inline{
            margin: 5px 0;
        }
        .sticky_header{
            padding: 0;
        }
    }
    @media (max-width: 576px) {
        .form_tabs div{
            width: 100% ;
        }
    }
</style>