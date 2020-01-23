<template>
    <div class="col-12 popover_content">
        <div class="d-flex flex-column text-left">
            <b>{{ title }}</b>

            <small>{{ subtitle }}</small>
        </div>

        <div class="suma_resta">
            <font-awesome-icon
                :icon="['fas' ,'minus-circle']"
                class="restar"
                fixed-width
                @click="model--"
            />
            
            <input
                v-model="model"
                type=""
                name=""
                class="adultos_input"
                readonly
            >

            <font-awesome-icon
                :icon="['fas' ,'plus-circle']"
                class="sumar"
                fixed-width
                @click="model++"
            />
        </div>
    </div>
</template>

<script>
    import { library } from '@fortawesome/fontawesome-svg-core';

    import { faPlusCircle, faMinusCircle } from '@fortawesome/free-solid-svg-icons';

    library.add(faPlusCircle, faMinusCircle);

    export default {
        props: {
            value: {
                default: () => 0,
                type: Number
            },
            title: {
                default: () => '',
                type: String
            },
            subtitle: {
                default: () => '',
                type: String
            },
            minvalue: {
                default: () => 0,
                type: Number
            },
            maxvalue: {
                default: () => 4,
                type: Number
            }
        },
        computed: {
            model: {
                get(){
                    return this.value;
                },
                set(val){
                    if(val >= this.minvalue && val <= this.maxvalue){
                        this.$emit('input', val);
                    }
                }
            },
        }
    }
</script>

<style scoped>
    
    .pasajeros_popover small{
        font-size: 0.7em;
        color: gray;
    }

    .pasajeros_popover b{
        width: 30%;
    }

    .pasajeros_popover svg{
        color: #9090ff;
        
    }

    .pasajeros_popover svg:hover{
        cursor: pointer;

    }
    .pasajeros_popover input{
        text-align: center;
        width: 20px;
        border:none;
    }

    .suma_resta{
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 40%;
    }

    .popover_content{
        padding: 10px 0; 
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid #f1f1f1f1;
    }
    
    @media (max-width: 480px){
        .pasajeros_popover svg{
            font-size: 1.3em;
            
        }
    }

   
</style>