<template>
    <div>
        <div 
            class="modal_cambios "
            id="detalleModal_cambio"
            @click="()=>{ $emit('trigger_modal')}"
        >
            <div
                class="modal_step3"
                @click.stop
            >
                <div class="col-12 filtrar cerrar_modal cerrar_modal_desktop">
                    <h1>{{ title }}</h1>

                    <font-awesome-icon
                        class="back_button"
                        :icon="['fas' ,'times-circle']"
                        @click="()=>{ $emit('trigger_modal')}"
                        fixed-width
                    />
                </div>
                <slot />
            </div>
        </div>
    </div>
</template>

<script>
    import { library } from '@fortawesome/fontawesome-svg-core';

    import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

    library.add( faTimesCircle );

    import $ from 'jquery';

    export default {
        
        props:{
            title: {
                default : ()=> '',
                type: String,
                required: true
            }
        }
          
    }
           
</script>

<style lang="scss" scoped>
    @keyframes animate{
        0%{
            opacity: 0;
        }
        100%{
            opacity: 1;
            
        }
    }  
   
    .modal_cambios
    {   
        animation: animate 1s ;
        padding: 20px;
        position: fixed;
        top: 0;
        width: 100%;
        left: 0;
        bottom: 0;
        z-index: 999;
        background: #000000c4;
        overflow-y: scroll;
    }
    .modal_step3
    {
        border-radius: 4px;
        padding: 20px;
        background: #fff;
        width: 80vh;
        margin: auto;

    }
    .cerrar_modal_desktop
    {
        display: flex; 
        justify-content: space-between;
        align-items: center;
        font-size: 1.2em;
        font-weight: 600;
        padding: 10px 0;
        border-bottom: 1px solid #f1f1f1;
        color: gray;
        margin-bottom: 10px;
    }
    .cerrar_modal
	{
		display: flex; 
		justify-content: space-between;
		align-items: baseline;
	}
	.back_button{
        font-size: 1.2em;
        cursor: pointer;
    }
@media (max-width: 900px){
    .modal_step3 h1{
        font-size: 1em;
    }
    .modal_step3
    {
        width: 100%;
    }
}
@media (max-width: 480px){
    
    .modal_step3
    {
        padding: 10px;
    }
    .cerrar_modal{
        position: sticky;
        top: -20px;
        background: white;
        z-index: 99;
    }
  
}

</style>