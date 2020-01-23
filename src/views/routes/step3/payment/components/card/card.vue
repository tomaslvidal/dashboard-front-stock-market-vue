<template>
    <div
        class="main datos_container"
        id="response_options"
    >
        <div>
            <h2>Ingresa los datos de tu tarjeta</h2>
        </div>

        <div class="datos_subtitle">
            <validation-provider
                rules="required"
                v-slot="{ errors }"
                name="tarjeta"
                :vid="`tarjeta${_uid}`"
            >
                <div
                    class="btn-group btn-group-toggle"
                    data-toggle="buttons"
                >
                    <label
                        :class="{
                            'btn': true,
                            'btn-outline-primary': true,
                            'active': form.card.pay_method === 'visa'
                        }"
                    >
                        <input 
                            type="radio" 
                            name="options"
                            v-model="form.card.pay_method"
                            :value="'visa'"
                            autocomplete="off"
                            checked
                        >

                        Visa
                    </label>

                    <label
                        :class="{
                            'btn': true,
                            'btn-outline-primary': true,
                            'active': form.card.pay_method === 'mastercard'
                        }"
                    >
                        <input 
                            type="radio" 
                            name="options" 
                            v-model="form.card.pay_method"
                            :value="'mastercard'"
                            autocomplete="off"
                        >

                        Mastercard
                    </label>
                </div>

                <span class="invalid-feedback d-flex">{{ errors[0] }}</span>
            </validation-provider>
        </div>

        <div class="datos_subtitle">
            <validation-provider
                rules="required"
                v-slot="{ errors }"
                name="cuotas"
                :vid="`card_fees${_uid}`"
            >
                <select
                    v-model="form.card.fees"
                    class="form-control form-control-sm "
                >
                    <option :value="1">
                        1 Cuota
                    </option>

                    <option :value="3">
                        3 Cuotas
                    </option>

                    <option :value="6">
                        6 Cuotas
                    </option>

                    <option :value="12">
                        12 Cuotas
                    </option>
                </select>

                <span class="invalid-feedback d-flex">{{ errors[0] }}</span>
            </validation-provider>
        </div>

        <div class="row">
            <div class="form-group col-12">
                <label for="">N&uacute;mero de la tarjeta</label>

                <validation-provider
                    :rules="{
                        required: true,
                        max: 19
                    }"
                    v-slot="{ errors }"
                    name="número de la tarjeta"
                    :vid="`number_target${_uid}`"
                >
                    <input
                        v-model="form.card.number"
                        type="text"
                        class="form-control form-control-sm"
                        placeholder="Ingesa el número de tu tarjeta"
                    >

                    <span class="invalid-feedback d-flex">{{ errors[0] }}</span>
                </validation-provider>
            </div>

            <div class="form-group col-12 col-sm-6">
                <label for="">Vencimiento</label>

                <div class="input-group input-group-sm">
                    <div class="row w-100">
                        <div class="col-5 pr-0">
                            <validation-provider
                                rules="required"
                                v-slot="{ errors }"
                                name="mes"
                                :vid="`tarjeta_mes${_uid}`"
                            >
                                <select
                                    v-model="form.card.month"
                                    class="form-control form-control-sm"
                                >
                                    <option
                                        value=""
                                        disabled
                                    >
                                        Seleccione mes
                                    </option>

                                    <option
                                        v-for="(value_month, key) in options_months"
                                        :key="key"
                                        :value="value_month"
                                    >
                                        {{ value_month }}
                                    </option>
                                </select>

                                <span class="invalid-feedback d-flex">{{ errors[0] }}</span>
                            </validation-provider>
                        </div>

                        <div class="col-2">
                            <div class="input-group-prepend">
                                <span 
                                    class="input-group-text w-100 justify-content-center"
                                    style="font-size: 0.875rem; padding: .25rem .5rem;"
                                >/
                                </span>
                            </div>
                        </div>

                        <div class="col-5 pl-0">
                            <validation-provider
                                rules="required"
                                v-slot="{ errors }"
                                name="año"
                                :vid="`tarjeta_anio${_uid}`"
                            >
                                <select
                                    v-model="form.card.year"
                                    class="form-control form-control-sm"
                                >
                                    <option
                                        value=""
                                        disabled
                                    >
                                        Seleccione año
                                    </option>

                                    <option :value="new Date().getFullYear()">
                                        {{ new Date().getFullYear() }}
                                    </option>

                                    <option
                                        v-for="(n_item, key) in 30"
                                        :key="key"
                                        :value="new Date().getFullYear()+n_item"
                                    >
                                        {{ new Date().getFullYear()+n_item }}
                                    </option>
                                </select>

                                <span class="invalid-feedback d-flex">{{ errors[0] }}</span>
                            </validation-provider>
                        </div>
                    </div>
                </div>
            </div>

            <div class="form-group col-12 col-sm-6">
                <label for="">Cod. Seguridad</label>

                <validation-provider
                    :rules="{
                        required: true,
                        numeric: true,
                        min: 3,
                        max:4
                    }"
                    v-slot="{ errors }"
                    name="código de seguridad"
                    :vid="`cod_seguridad${_uid}`"
                >
                    <input
                        v-model="form.card.code"
                        type="tel"
                        oninput="this.value=this.value.replace(/[^0-9]/g,'');"
                        class="form-control form-control-sm"
                        placeholder="***"
                    >

                    <span class="invalid-feedback d-flex">{{ errors[0] }}</span>
                </validation-provider>
            </div>
            
            <div class="form-group col-12">
                <label for="">Nombre del titular</label>

                <validation-provider
                    rules="required"
                    v-slot="{ errors }"
                    name="nombre y apellido"
                    :vid="`card_name${_uid}`"
                >
                    <input
                        v-model="form.card.name"
                        type="text"
                        class="form-control form-control-sm"
                        placeholder="Como figura en la tarjeta"
                    >

                    <span class="invalid-feedback d-flex">{{ errors[0] }}</span>
                </validation-provider>
            </div>

            <div class="form-group col-12">
                <label for="">Documento del titular</label>
                
                <validation-provider
                    :rules="{
                        required: true,
                        numeric: true
                    }"
                    v-slot="{ errors }"
                    name="número de documento"
                    :vid="`card_document${_uid}`"
                >
                    <input
                        v-model="form.document.number"
                        type="text"
                        class="form-control form-control-sm"
                        placeholder="Escribir número de documento"
                    >

                    <span class="invalid-feedback d-flex">{{ errors[0] }}</span>
                </validation-provider>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            form: {
                default: () => new Object(),
                type: Object,
                required: true
            }
        },
        watch: {
            'form.card.year': function(){
                if(!this.options_months.includes(this.form.card.month)){
                    this.form.card.month = '';
                }
            }
        },
        computed: {
            options_months(){
                let qty_months = 12 - (this.form.card.year !== new Date().getFullYear() ? 0 : new Date().getMonth()), values = [];

                for (let index = 1; index <= qty_months; index++) {
                    let value = (this.form.card.year !== new Date().getFullYear() ? index : new Date().getMonth() + index).toString().padStart(2, 0);

                    values.push(value);
                }

                return values;
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '@/views/routes/step3/payment/styles/between_index_components';
</style>