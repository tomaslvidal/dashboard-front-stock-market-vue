<template>
    <div>
        <div class="container_step">
            <div class="gracias_container ">
                <div id="checkCircle">
                    <span>
                        <font-awesome-icon
                            class="mr-2"
                            :icon="['fas' ,'check']"
                        />
                    </span>
                </div>
            </div>

            <div class="compra_detalles">
                <h2>¡Gracias por tu compra!</h2>
                
                <p>Tu codigo de reserva es: <strong> {{ $store.state.Step3.data.book.codigo[0] }} </strong></p>
                
                <small>
                    (Este texto es autoadministrable)

                    <br>

                    Se ha enviado un correo electrónico con la confirmación de tu reserva.
                    Si tienes consultas puede contactarnos al +54 11 4798 2746 o vía email ventas@aptek.com.ar
                </small> 
            </div>
        </div>
    </div>
</template>                    
<script>
    import { library } from '@fortawesome/fontawesome-svg-core';

    import { faCheck } from '@fortawesome/free-solid-svg-icons';

    library.add(faCheck);

    import $ from 'jquery';

    export default {
        beforeCreate(){
            if(!this.$store.state.Step5.state.email_sent){
                this.$store.dispatch('Step5/SEND_MAIL');
            }
        },
        mounted(){
            setTimeout( function(){
               $('.compra_detalles').fadeIn(1000);
            }, 800);
        }
    }
</script>

<style lang="scss" scoped>
	@import './styles'; 
</style>