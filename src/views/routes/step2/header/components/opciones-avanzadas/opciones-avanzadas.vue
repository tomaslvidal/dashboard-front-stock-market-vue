<template>
    <div>
        <form id="opciones_form">
            <div class="row container_opciones">
                <div class=" sinEscalas col-md-6 py-2">
                    <!-- <button
                        class="btn btn-primary btn-sm"
                        id="sinEscalas"
                    >
                        Quiero un viaje sin escalas
                    </button> -->
                    <div class="custom-control custom-checkbox w-100">
                        <input 
                            id="sin_escalas"
                            type="checkbox"
                            name="sin_escalas"
                            class="custom-control-input col-1"
                            v-model="$store.state.Step2.search.without_stopovers"
                        >
                        <label 
                            for="sin_escalas"
                            class="custom-control-label boton fecha_sinescala"
                        >  Quiero un viaje sin escalas </label>
                    </div>
                </div>
                <div class=" col-md-6 py-2">
                    <div class="row viajarEnClase">
                        <div class="col-sm-3">
                            <span>
                                Viajar en clase:
                            </span>
                        </div>
                        <div class="col-6">
                            <select 
                                name="clase"
                                id="clase"
                                class="form-control form-control-sm"
                                v-model="$store.state.Step2.search.cabin"
                            >
                                <option value="Y">
                                    Económica
                                </option>
                                <option value="N">
                                    Económica Premium
                                </option>
                                <option value="C">
                                    Business
                                </option>
                                <option value="F">
                                    Primera
                                </option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>
    .fecha_sinescala{
        color: #9090ff;
    }
    .container_opciones{
        padding: 0 10px;
        display: flex;
        align-items: center;
    }
    .sinEscalas{
        text-align: center;

    }
    #sinEscalas{
        background: #9090ff;
        border: 1px solid #9090ff;
    }
    #opciones_form{
        border-top: 1px solid #efefef;
    }

    .viajarEnClase{
        display: flex;
        justify-content: center;
        align-items: center;
        
    }
    @media(max-width: 560px){
        #opciones_form, #opciones_form{
            border: none;
        }

        .viajarEnClase{
            padding: 10px 0;
        }
    }
</style>