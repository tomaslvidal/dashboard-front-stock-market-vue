<template>
    <div class="row">
        <slot name="title" />

        <div
            :class="{
                'form-group' : tablet_size,
                'col-12' : true,
                'col-lg-4' : true,
                'pr-xl-0' : true
            }"
        >
            <validation-provider
                rules="required"
                v-slot="{ errors }"
                name="origen"
                :vid="`origin${_uid}`"
            >
                <treeselect
                    v-model="model.origin"
                    :config="config.treeselect.origin"
                    :items="requestItems"
                    placeholder="Origen"
                    class="treeselect"
                />

                <span class="invalid-feedback d-flex">{{ errors[0] }}</span>
            </validation-provider>
        </div>

        <div
            :class="{
                'form-group' : tablet_size,
                'col-12' : true,
                'col-lg-4' : true,
                ' pr-xl-0' : true
            }"
        >
            <validation-provider
                rules="required"
                v-slot="{ errors }"
                name="destino"
                :vid="`destination${_uid}`"
            >
                <treeselect
                    v-model="model.destination"
                    :config="config.treeselect.destination"
                    :items="requestItems"
                    placeholder="Destino"
                    class="treeselect"
                />

                <span class="invalid-feedback d-flex">{{ errors[0] }}</span>
            </validation-provider>
        </div>

        <div class="col-12 col-lg-4 pr-xl-0">
            <div class="input-group col-12 px-0">
                <div class="input-group mb-3 test">
                    <validation-provider
                        :rules="{
                            required: true,
                            arrival_departure: typeSearch === 1
                        }"
                        v-slot="{ errors }"
                        name="fecha"
                        :vid="`date${_uid}`"
                        tag="div"
                        class="w-100"
                    >
                        <div class="d-flex w-100">
                            <div class="input-group-prepend">
                                <span 
                                    ref="select_date" 
                                    :class="{
                                        'input-group-text': true,
                                        'focus': config.input.select_date.focus,
                                    }" 
                                    style="background: #fff"
                                >
                                    <font-awesome-icon
                                        :icon="['far' ,'calendar-alt']"
                                        fixed-width
                                    />
                                </span>
                            </div>

                            <datepicker
                                v-model="model.date"
                                :config="config.datepicker.segment"
                                placeholder="Seleccionar fechas"
                                name="model.date"
                                @focusin="() => { config.input.select_date.focus = true; config.input.select_date.open = true }"
                                @on-close="() => config.input.select_date.open = false"
                                @focusout="() => config.input.select_date.focus = false"
                            />
                        </div>
                        
                        <span class="invalid-feedback d-flex">{{ errors[0] }}</span>
                    </validation-provider>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { library } from '@fortawesome/fontawesome-svg-core';

    import { Datepicker, Treeselect } from '@/components';

    import { faCalendarAlt } from '@fortawesome/free-regular-svg-icons';

    import axios from 'axios';

    library.add(faCalendarAlt);

    export default {
        components: {
            Datepicker,
            Treeselect
        },
        props: {
            items: {
                default: () => new Array(),
                type: Array,
                required: true
            },
            index: {
                default: () => 0,
                type: Number,
                required: true
            },
            'typeSearch': {
                default: () => 1,
                type: Number,
                required: true
            }
        },
        data(){
            return({
                ajax: {},
                config: {
                    input: {
                        select_date: {
                            focus: false,
                            open: false
                        }
                    },
                    datepicker: {
                        default: {
                            altFormat: 'D d/m/y',
                            altInput: true,
                            dateFormat: 'Z',
                            enableTime: false,
                            allowInput: true,
                            animate: true,
                            showMonths: 2,
                            disableMobile: false,
                        },
                        segment: {
                            minDate: new Date(),
                            maxDate: null,
                            parameters: {
                                required: false
                            }
                        }
                    },
                    treeselect: {
                        default: {
                            noChildrenText: "No hay sub-opciones.",
                            noOptionsText: "No hay opciones disponibles.",
                            noResultsText: "No se encontraron resultados...",
                            placeholder:"Indique el destino",
                            retryText:"¿Procesar de nuevo?",
                            async: true,
                            retryTitle:"Haga clic para volver a intentar",
                            searchPromptText:"Escribe para buscar...",
                            loadingText:"Cargando...",
                            clearValueText:"Limpiar valor",
                            clearAllText:"Limpiar todo",
                            alwaysOpen: false,
                            clearOnSelect: true,
                            appendToBody: false,
                            openDirection: 'bottom',
                            matchKeys: ['label'],
                            valueConsistsOf: 'LEAF_PRIORITY',
                            valueFormat: 'object',
                            autoLoadRootOptions: false,
                            disableBranchNodes: true,
                            showCount: true,
                            cacheOptions: true,
                            defaultExpandLevel: Infinity
                        },
                        origin: {},
                        destination: {}
                    }
                },
                backup: {
                    state: {
                        model: '',
                        type_search: ''
                    }
                }
            });
        },
        computed: {
            model(){
                return this.items[this.index];
            },
            before_flight(){
                let index = this.index, item;

                while(index >= 1){
                    index--;

                    item = this.items[index];

                    if(typeof item !== 'undefined'){
                        if(item.date !== ''){
                            return item;
                        }
                    }
                }

                return {
                    origin: null,
                    destination: null,
                    date: ''
                };
            },
            after_flight(){
                let index = this.index, item;

                while(index <= this.items.length){
                    index++;

                    item = this.items[index];

                    if(typeof item !== 'undefined'){
                        if(item.date !== ''){
                            return item;
                        }
                    }
                }

                return {
                    origin: null,
                    destination: null,
                    date: ''
                };
            }
        },
        watch: {
            'model.date': function(n_val, o_val){
                if(this.typeSearch !== 1){
                    if([o_val].join() !== [this.$store.state.Step2.backup.flight.model].join()){
                        if(o_val instanceof Array){
                            if(o_val.length > 1){
                                this.$store.dispatch('Step2/SET_BACKUP', {
                                    key: 'flight',
                                    payload: {
                                        model: o_val
                                    }
                                });
                            }
                        }
                    }
                }
            },
            'config.input.select_date.open': function(n_val){
                setTimeout(() => {
                    if(n_val === false){
                        if(this.typeSearch === 1){
                            if(this.model.date instanceof Array){
                                if(this.model.date.length === 1){
                                    console.log("model: ", this.model.date)
                                    this.$store.commit('Step2/CLEAR_BACKUP', { key: 'flight' });
                                }
                            }
                        }
                    }
                }, 0)
            },
            'before_flight.date': function(n_val, o_val){
                if(n_val !== o_val){
                    this.config.datepicker.segment.minDate = new Date(n_val);
                }
            },
            'after_flight.date': function(n_val, o_val){
                if(n_val !== o_val){
                    this.config.datepicker.segment.maxDate = new Date(n_val);
                }
            },
            'typeSearch': function(n_val, o_val){
                if(n_val === 1 && this.$store.state.Step2.backup.flight.model instanceof Array){
                    if(this.$store.state.Step2.backup.flight.model.length > 1){
                        this.model.date = this.$store.state.Step2.backup.flight.model;
                    }
                }

                Object.assign(this.config.datepicker.segment, {
                    mode: this.typeSearch !== 1 ? 'single' : 'range'
                });
            }
        },
        methods: {
            requestItems(searchQuery){
                return new Promise((resolve, reject) => {
                    (typeof this.ajax.token !== "undefined") ? this.ajax.cancel() : null;

                    this.ajax = axios.CancelToken.source();

                    this.config.treeselect.loadingText = searchQuery.length >= 3 ? "Cargando..." : "Escribe como minimo 3 letras";

                    if(searchQuery.length >= 3){
                        axios.get('https://eviajes.online/lufthansa/motor/services/readCities.php', {
                            params: {
                                "callback": "air",
                                "q": searchQuery
                            },
                            cancelToken: this.ajax.token
                        })
                        .then(res => {
                            let start = res.data.indexOf('[{');

                            res.data = JSON.parse(res.data.slice(start, -1).replace(/(['"])?([a-zA-Z0-9_]+)(['"])?:/g, '"$2": '));
                            
                            res.data = res.data.map((item, index) => ({...item, id: index}));

                            res.data = [{
                                id: 'airport',
                                label: '✈️ Aeropuertos',
                                children: res.data
                            }];

                            resolve(res.data);
                        })
                        .catch(e => {
                            if(axios.isCancel(e)){
                                reject("error");
                            }
                            else{
                                resolve([]);
                            }
                        });
                    }
                });
            }
        },
        created(){
            this.config.treeselect.origin = Object.assign({}, this.config.treeselect.default);

            this.config.treeselect.destination = Object.assign({}, this.config.treeselect.default);

            this.config.datepicker.segment = Object.assign({}, this.config.datepicker.segment, this.config.datepicker.default, {
                mode: this.typeSearch === 3 ? 'single' : 'range'
            });

            this.config.datepicker.segment.minDate = new Date(this.before_flight.date);

            this.config.datepicker.segment.maxDate = new Date(this.after_flight.date);
        }
    }
</script>

<style>
    
    .pasajeros_popover{ 
        color: #4c4a4a;
        background: #fff;
        border: 1px solid #f1f1f1;
        width: 250px;
        position: absolute;
        padding: 10px;
        left: 0;
        border-radius: 4px;
        z-index: 100;
        box-shadow: 0px 4px 7px -4px rgba(0,0,0,0.75);
    }
    
    .vue-treeselect__control{
        display: flex;
    }
    .btn-outline-secondary{
        border-color: #dddddd;
    }   
    .vue-treeselect__control > div{
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .vue-treeselect__input-container{
        width: 100%;
    }

    .vue-treeselect__placeholder {
        color: #717a81;
    }

    .vue-treeselect__single-value, .form-control, .input-group.mb-3.test div span{
        color: #818181;
        
    }
    .treeselect > div, .treeselect > div > div:first-child{
        height: 38px!important;
    }
    @media (max-width: 991px){
        .pasajeros_popover{
            position: fixed !important;
            width: 100vw !important;
            height: 100vh;
            transform: translate(0px, 0px) !important;
            top:0;
            left: 0;
            right: 0 !important;
            bottom: 0 !important;
            padding: 20px;
        }
    }
    
</style>

<style scoped>
    .input-group.mb-3.test div span{
        transition: border-color .15s ease-in-out, box-shadow .15s ease-in-out, -webkit-box-shadow .15s ease-in-out;
    }

    .input-group.mb-3.test input:focus, .input-group.mb-3.test div span.focus{
        color: #495057;
        background-color: #fff;
        border-color: #80bdff!important;
        outline: 0;
        box-shadow: 0px 0px 0px 0.2rem #c8dfff!important;
        z-index: 99;
        transition: border-color .15s ease-in-out, box-shadow .15s ease-in-out, -webkit-box-shadow .15s ease-in-out;
    }

    .input-group.mb-3.test input:focus{
        box-shadow: none;
        border-color: #ced4da;
    }
</style>