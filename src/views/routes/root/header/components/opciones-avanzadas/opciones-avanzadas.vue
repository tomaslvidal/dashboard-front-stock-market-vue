<template>
    <div class="col-12">
        <form id="opciones_form">
            <div class="container_opciones row">
                <div class=" col-md-4 py-2">
                    <div class=" row viajarEnClase">
                        <label>
                            Viajar en clase:
                        </label>
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
                            >  Sin escalas </label>
                        </div>
                    </div>
                </div>
                <div class=" col-md-4 py-2">
                    <div class=" row viajarEnClase">
                        <label>
                            Aerolineas
                        </label>
                        <select 
                            name=""
                            id=""
                            class="form-control form-control-sm"
                        >
                            <option value="Y">
                                -
                            </option>
                        </select>
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
                            >  Misma Aerolínea </label>
                        </div>
                    </div>
                </div>
                <div class=" col-md-4 py-2">
                    <div class=" row viajarEnClase">
                        <label>
                            Alianza
                        </label>
                        <select 
                            name=""
                            id=""
                            class="form-control form-control-sm"
                            v-model="$store.state.Step2.search.alliance"
                        >
                            <option selected>
                                Todas
                            </option>
                            <option value="A">
                                Star Alliance
                            </option>
                            <option value="O">
                                OneWorld
                            </option>
                            <option value="S">
                                SkyTeam
                            </option>
                        </select>
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
                            >  Incluir equipaje en bodega </label>
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
        font-size: 0.9em;
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
    label{
        font-weight: 600;
        color: #4c4a4a;
    }
    select{
        margin-bottom: 10px;
    }

    .viajarEnClase{
        display: flex;
        align-items: center;
        padding: 10px;
        
    }
    @media(max-width: 560px){
        #opciones_form, #opciones_form{
            border: none;
        }

        .sinEscalas{
            text-align: left;

        }
        .viajarEnClase{
            justify-content: flex-start;
            padding: 10px 0;
        }
    }
</style>