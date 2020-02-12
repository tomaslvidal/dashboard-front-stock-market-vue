<template>
    <header class="header row bg-primary">
        <div class="col-12">
            <div class="d-flex h-100 justify-content-start align-items-center">
                <span class="text-light">
                    <i class="fas fa-bars menu" style="cursor: pointer"></i>
                </span>
            </div>
        </div>
    </header>
</template>

<script>
    import $ from 'jquery';

    export default {
        mounted(){
            $('.menu').on('click', function(e){
                e.preventDefault();

                if($('.aside').css('display') == 'block'){
                    $('.aside').fadeOut(200, function(){
                        $('.aside').removeClass('d-md-block');

                        $('.content').css('flex', '1').css('min-width', '100%');
                    });

                    return;
                }

                $('.aside').fadeIn(200, function(){
                    $('.content').removeAttr('style');
                    
                    $('.aside').addClass('d-md-block');
                });
            });
        }
    }
</script>

<style lang="scss" scoped>
    @import './styles';
</style>