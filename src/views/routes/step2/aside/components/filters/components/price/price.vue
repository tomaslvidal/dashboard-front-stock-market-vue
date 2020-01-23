<template>
    <collapse
        v-model="state.collapse"
        title="Precio (incl. imp.)"
    >
        <div class="collapse show px-2 checker toggle-container">
            <ValidationObserver 
                v-slot="{ invalid }"
                ref="validacion"
            >
                <form
                    action=""
                    class="row"
                    @submit.stop.prevent="onSubmit(invalid)"
                >
                    <div class="form-group col-12 col-sm-6 m-0">
                        <validation-provider
                            rules="required"
                            v-slot="{ errors }"
                            name="precio inicial"
                            :vid="`inicial${_uid}`"
                            class="m-0 p-0"
                        >
                            <input
                                v-model="filter.since.value"
                                type="number"
                                name="minimo"
                                :class="{
                                    'form-control' : true,
                                    'form-control-sm' : true,
                                }"
                                placeholder="Desde"
                            >
                            <span class="invalid-feedback d-flex">{{ errors[0] }}</span>
                        </validation-provider>
                    </div>

                    <div class="form-group col-12 col-sm-6 m-0">
                        <validation-provider
                            rules="required"
                            v-slot="{ errors }"
                            name="precio final"
                            :vid="`final${_uid}`"
                            class="m-0 p-0"
                        >
                            <input
                                v-model="filter.until.value"
                                id="maximo"
                                type="number"
                                name="maximo"
                                placeholder="Hasta"
                                :class="{
                                    'form-control' : true,
                                    'form-control-sm' : true,
                                    'invalid' : state.errors === 2
                                }"
                            >
                            <span class="invalid-feedback d-flex">{{ errors[0] }}</span>
                        </validation-provider>
                    </div>

                    <div class="form-group d-flex col-12">
                        <input
                            type="submit"
                            class="btn btn-sm btn-primary"
                            id="aplicarPrecio"
                            value="Aplicar"
                        >
                    </div>
                </form>
            </ValidationObserver>
        </div>
    </collapse>
</template>

<script>
    import Collapse from '@/views/routes/step2/aside/components/collapse';

    import Vue from 'vue';

    export default {
        components: {
            Collapse
        },
        data(){
            return {
                state: {
                    collapse: true,
                    errors : 0
                },
            };
        },
        created(){
            if(this.collapse_filters == false){
                this.state.collapse=false;
            }else{
                this.state.collapse=true
            }
        },
        watch: {
            'collapse_filters': function(val){
                if(!val){
                    this.state.collapse=false
                }else{
                     this.state.collapse=true
                }
            }
        },
        computed: {
            filter(){
                return JSON.parse(JSON.stringify(this.$store.state.Step2.filter.price));
            }
        },
        methods: {
            async onSubmit(val){
                await this.$refs.validacion.validate();

                if(!val){
                    if(!this.state.errors !== 1){
                        this.state.errors = 1;
                            
                    }
                        this.$store.dispatch('Step2/SET_FILTER_PRICE', this.filter);
                    
                }else{
                   Vue.swal('Atención!','Se deben completar correctamente todos los campos.', 'warning');
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '@/views/routes/step2/aside/components/filters/styles';
    
    .checker div{
        margin: 12px 0;
    }
    .invalid-feedback{
        color: #dc3545 !important
    }
    #aplicarPrecio, .modificar_button{
        border-radius: 20px;
        background: transparent;
        color: #007bff;
        border-color: #007bff;
        transition: all 600ms ease-in-out;
        font-weight: 600;
    }

    #aplicarPrecio:hover{
        color: #fff;
        background: #007bff;

    }

</style>