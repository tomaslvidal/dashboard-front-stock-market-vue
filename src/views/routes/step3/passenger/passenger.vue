<template>
    <div>
        <h3>
            <font-awesome-icon
                class="mr-2"
                :icon="['fas' ,'user']"
                fixed-width
            />

            {{ form.config.title }} {{ form.config.number }}
        </h3>

        <div class="row form_datos">
            <div class="form-group col-12 col-sm-3">
                <label for="">Nombre *</label>

                <validation-provider
                    rules="required"
                    v-slot="{ errors }"
                    name="nombre"
                    :vid="`nombre${_uid}`"
                >
                    <input
                        v-model="form.name"
                        type="text"
                        class="form-control form-control-sm required"
                        placeholder="Escribir numero"
                    >
                    <span class="invalid-feedback d-flex">{{ errors[0] }}</span>
                </validation-provider>
            </div>

            <div class="form-group col-12 col-sm-3">
                <label for="">Segundo Nombre</label>

                <input
                    v-model="form.second_name"
                    type="text"
                    class="form-control form-control-sm required"
                    placeholder="Escribir segundo nombre"
                >
            </div>

            <div class="form-group col-12 col-sm-6">
                <label for="">Apellido *</label>

                <validation-provider
                    rules="required"
                    v-slot="{ errors }"
                    name="apellido"
                    :vid="`apellido${_uid}`"
                >
                    <input
                        v-model="form.last_name"
                        type="text"
                        class="form-control form-control-sm required"
                        placeholder="Escribir apellido"
                    >

                    <span class="invalid-feedback d-flex">{{ errors[0] }}</span>
                </validation-provider>
            </div>
        
            <div class="form-group col-12 col-sm-6 ">
                <label for="">Tipo y número documento *</label>

                <div class="form-row ">
                    <div class="form-group col-4 mb-0">
                        <validation-provider
                            rules="required"
                            v-slot="{ errors }"
                            name="tipo de documento"
                            :vid="`tipo_documento${_uid}`"
                        >
                            <select
                                v-model="form.document.type"
                                class="custom-select custom-select-sm required"
                            >
                                <option
                                    disabled
                                    value=""
                                >
                                    Seleccione
                                </option>

                                <option value="dni">
                                    DNI
                                </option>

                                <option value="pasaporte">
                                    Pasaporte
                                </option>
                            </select>

                            <span class="invalid-feedback d-flex">{{ errors[0] }}</span>
                        </validation-provider>
                    </div>
                
                    <div class="form-group col-8 mb-0">
                        <validation-provider
                            :rules="{
                                required: true,
                                numeric: true
                            }"
                            v-slot="{ errors }"
                            name="número de documento"
                            :vid="`numero_documento${_uid}`"
                        >
                            <input
                                v-model="form.document.number"
                                placeholder="Escribir número de documento"
                                type="text"
                                class="form-control form-control-sm required"
                            >

                            <span class="invalid-feedback d-flex">{{ errors[0] }}</span>
                        </validation-provider>
                    </div>
                </div>
            </div>
            <div class="form-group col-12 col-lg-3">
                <label>Fecha de nacimiento *</label>

                <validation-provider
                    rules="required"
                    v-slot="{ errors }"
                    name="fecha de nacimiento"
                    :vid="`fecha_nacimiento${_uid}`"
                >
                    <keep-alive>
                        <datepicker
                            v-model="form.birthdate"
                            dclass="form-control form-control-sm"
                            :config="config.datepicker.birthdate"
                            placeholder="Fecha de nacimiento"
                            :ref="`datepicker_birthday${_uid}`"
                            :l10n="l10n"
                        />
                    </keep-alive>
                    <span class="invalid-feedback d-flex">{{ errors[0] }}</span>
                </validation-provider>
            </div>
            <div class="form-group col-12 col-lg-3">
                <label>Sexo *</label>

                <validation-provider
                    rules="required"
                    v-slot="{ errors }"
                    name="sexo"
                    :vid="`sexo${_uid}`"
                >
                    <select
                        v-model="form.sex"
                        class="custom-select custom-select-sm required"
                    >
                        <option
                            disabled
                            value=""
                        >
                            Seleccione
                        </option>

                        <option value="F">
                            Femenino
                        </option>

                        <option value="M">
                            Masculino
                        </option>
                    </select>

                    <span class="invalid-feedback d-flex">{{ errors[0] }}</span>
                </validation-provider>
            </div>

            <div class="form-group col-12">
                <label>Número de viajero frecuente</label>

                <div class="row">
                    <div class="col-4">
                        <validation-provider
                            :rules="{ required: form.frequent.number !== ''}"
                            v-slot="{ errors }"
                            name="de seleccion"
                            :vid="`frequent_name${_uid}`"
                        >
                            <select
                                v-model="form.frequent.name"
                                class="form-control form-control-sm"
                            >
                                <option value="">
                                    Seleccione
                                </option>

                                <option value="AA">
                                    Advantage
                                </option>

                                <option value="LM">
                                    Lifemiles
                                </option>
                            </select>

                            <span class="invalid-feedback d-flex">{{ errors[0] }}</span>
                        </validation-provider>
                    </div>

                    <div class="col-8">
                        <validation-provider
                            :rules="{ required: form.frequent.name !== ''}"
                            v-slot="{ errors }"
                            name="número de viajero frecuente"
                            :vid="`frequent_number${_uid}`"
                        >
                            <input
                                v-model="form.frequent.number"
                                type="text"
                                placeholder="Escribir número de viajero frecuente"
                                class="form-control form-control-sm"
                            >

                            <span class="invalid-feedback d-flex">{{ errors[0] }}</span>
                        </validation-provider>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { library } from '@fortawesome/fontawesome-svg-core';

    import { faUser } from '@fortawesome/free-solid-svg-icons';

    library.add(faUser);

    import { Datepicker } from '@/components';

    import { Spanish } from 'flatpickr/dist/l10n/es.js';

    import Default from 'flatpickr/dist/l10n/default.js';

    export default {
        components: {
            Datepicker
        },
        props: {
            form: {
                default: () => new Object(),
                type: Object,
                required: true
            }
        },
        created(){
            this.config.datepicker.birthdate = Object.assign({}, this.config.datepicker.birthdate, this.config.datepicker.default, {
                maxDate: new Date().setFullYear(new Date().getFullYear()-this.minAgeByType)
            });
        },
        computed:{
            l10n(){
                return {
                    ...Spanish,
                    months: {
                        ...Spanish.months,
                        shorthand: Default.months.shorthand
                    }
                };
            },
            minAgeByType(){
                switch (this.form.config.title) {
                    case 'Adulto':
                        return 21;
                    case 'Niño':
                        return 15;
                    default:
                        return 0;
                }
            }
        },
        data(){
            return{
                config: {
                    datepicker: {
                        default: {
                            altFormat: 'j F \\de Y',
                            altInput: true,
                            dateFormat: 'dMy',
                            enableTime: false,
                            allowInput: true,
                            animate: false,
                            disableMobile: true
                        },
                        birthdate: {
                            parameters: {
                                showAlways: false,
                                required: false
                            }
                        }
                    }
                }
            };
        }
    }
</script>

<style lang="scss" scoped>
    h3{
        padding-bottom: 10px;
        color: #555555;
        font-size: 1.2em;
        border-bottom: 1px solid;
        margin: 20px 0;
    }
</style>