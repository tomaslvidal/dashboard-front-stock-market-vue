<template>
    <div>
        <div class="main datos_container">
            <div>
                <h2>Elige la forma de pago</h2>
            </div>

            <div class="datos_subtitle">
                <a 
                    @click="abrir_modal()"
                    href="#!"
                >
                    Ver Condiciones
                </a>
            </div>

            <validation-provider
                rules="required"
                v-slot="{ errors }"
                name="forma de pago"
                :vid="`payment_method${_uid}`"
            >
                <div class="row">
                    <div class="form-group col-12">
                        <div class="custom-control custom-radio custom-control-inline">
                            <input
                                type="radio"
                                id="credito"
                                name="options"
                                v-model="form.pay_method"
                                class="custom-control-input"
                                :value="1"
                            >

                            <label
                                class="custom-control-label"
                                for="credito"
                            >Tarjeta de crédito</label>
                        </div>
                    </div>

                    <div class="form-group col-12">
                        <div
                            class="custom-control custom-radio custom-control-inline"
                            id="ida_box"
                        >
                            <input
                                type="radio"
                                id="debito"
                                name="options"
                                v-model="form.pay_method"
                                class="custom-control-input"
                                :value="2"
                            >

                            <label
                                class="custom-control-label"
                                for="debito"
                            >Tarjeta d&eacute;bito</label>
                        </div>
                    </div>

                    <div class="form-group col-12">
                        <div class="custom-control custom-radio custom-control-inline">
                            <input
                                type="radio"
                                id="pago_facil"
                                name="options"
                                v-model="form.pay_method"
                                class="custom-control-input"
                                :value="3"
                            >

                            <label
                                class="custom-control-label"
                                for="pago_facil"
                            >Pago F&aacute;cil</label>
                        </div>
                    </div>

                    <div class="form-group col-12">
                        <div class="custom-control custom-radio custom-control-inline">
                            <input
                                type="radio"
                                id="rapipago"
                                name="options"
                                v-model="form.pay_method"
                                class="custom-control-input"
                                :value="4"
                            >

                            <label
                                class="custom-control-label"
                                for="rapipago"
                            >Rapipago</label>
                        </div>
                    </div>
                </div>

                <span class="invalid-feedback d-flex">{{ errors[0] }}</span>
            </validation-provider>
        </div>

        <card
            v-if="[1, 2].includes(form.pay_method)"
            :form="form"
        />
    </div>
</template>

<script>
    import { Card } from './components';
    
    export default {
        props: {
            form: {
                default: () => new Object(),
                type: Object,
                required: true
            }
        },
        components: {
            Card
        },
        methods:{
            abrir_modal(){
                this.$emit('open_modal');
            }  
        }
    }
</script>

<style lang="scss" scoped>
    @import './styles';
</style>