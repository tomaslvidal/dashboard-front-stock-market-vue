<template>
    <div>
        <div
            class="col-12 d-block d-lg-none"
            id="mobile_menu"
        >
            <div
                class="btn-group"
                role="group"
                aria-label="Basic example"
            >
                <button 
                    @click="showModal(1,1)"
                    type="button"
                    class="btn btn_mobile"
                >
                    <font-awesome-icon
                        class="pr-2"
                        :icon="['fas' , 'filter']"
                        fixed-width
                    /> Filtros
                </button>

                <button 
                    type="button"
                    class="btn btn_mobile"
                    @click="showModal(2)"
                >
                    <font-awesome-icon
                        class="pr-2"
                        :icon="['fas' , 'plane-departure']"
                        fixed-width
                    /> Modificar                    
                </button>
                
                <button 
                    @click="showModal(3)"
                    type="button"
                    class="btn btn_mobile"
                >
                    <font-awesome-icon
                        class="pr-2"
                        fixed-width
                        :icon="['fas' , 'sort-amount-up']"
                    />Ordenar
                </button>
            </div>
        </div>    

        
        <div
            ref="modal" 
            class="col-12 col-lg-3 p-lg-0 filtros_container_mobile d-block d-lg-none"
        >
            <div>
                <div class="modal_container">
                    <div class="col-12 filtrar d-flex d-lg-none modal_header">
                        <button 
                            type="button"
                            class="back_button"
                            @click="hideModal()"
                        >
                            <font-awesome-icon
                                class="pr-2"
                                fixed-width
                                :icon="['fas' , 'arrow-left']"
                            />
                        </button>
                        <h3>{{ filter_name }}</h3>  
                    </div>
                    <keep-alive>
                        <Filters
                            :disable_mobile="true"
                            v-if="state.component == 1"
                        />

                        <Header 
                            :disable_mobile="true"
                            v-if="state.component == 2"
                        />
                    
                        <Sorts
                            :disable_mobile="true"
                            v-if="state.component == 3"
                        />
                    </keep-alive>
                </div>
            </div>
        </div>
    </div> 
</template>
 
<script>
    import { library } from '@fortawesome/fontawesome-svg-core';

    import $ from 'jquery';

    import { faFilter, faSortAmountUp, faPlaneDeparture, faChevronCircleLeft, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

    import { Header } from '@/views/routes/step2';

    import { Filters, Sorts } from '@/views/routes/step2/aside/components';
    
    import { between_mobile_header } from '@/views/routes/step2/mixins';

    library.add( faFilter, faPlaneDeparture, faSortAmountUp, faChevronCircleLeft, faArrowLeft ); 

    export default {
        mixins: [ between_mobile_header ],
        components:{
            Filters,
            Header,
            Sorts
        },
        data(){
            return {
                state: {
                    component: ''
                },
                filter_name: 'Modificar'
            };
            
        },
        created(){
            this.$root.$on('showmodal', function(val){
                this.showModal(val);
            }.bind(this));
        },       
    }
</script>

<style lang="scss" scoped>
    @keyframes menu{
        0%{
            transform: translate(0%,100px);
        }
        50%{
            transform: translate(0%,100px);
        }
        100%{
            transform: translate(0%,0%);
        }
    }
    .modal_container{
        overflow-y: scroll;
        height: 100vh;
        padding-bottom: 55px;
    }
    #mobile_menu
	{
        padding: 10px;
        //border-radius: 35px; 
        position: fixed;
        z-index: 102;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        text-align: center;
        background: #363636e6;
        -webkit-box-shadow: -1px 5px 5px -5px rgba(0,0,0,0.75);
        -moz-box-shadow: -1px 5px 9px -5px rgba(0,0,0,0.75);
        box-shadow: -1px 5px 5px -5px rgba(0,0,0,0.75);
        animation: menu  2s ;
    }
    .btn_mobile
	{
        background: transparent;
        color: #fff;
        border: 1px solid;
        font-size: 0.9em;
    }
    .btn_mobile svg{
        font-size: 1.1em;
    }
    .back_button{
        background: transparent;
        border: none;
        font-weight: 600;
        font-size: 1.4em;
        position: absolute;
        left: 0px;
        padding: 0;
    }
    .filtros_container_mobile
	{
        margin: 0;
        position: fixed;
        background: #fff;
        left: -2000px;
        z-index: 99;
        top: 0;

    }
    .modal_header{
        color:#484848;
        display: flex;
        justify-content: center;
        align-items: center;
        padding:0px;
        margin: 10px 0;
            
    }
    .modal_header h3{
        margin: 0;
    }
    .filtrar{
        position: sticky;
        top: 0;
        background: white;
        padding: 10px 0;
        z-index: 19;
    }
    .filtrar h3{
        font-size: 1.50rem;
    }
</style>