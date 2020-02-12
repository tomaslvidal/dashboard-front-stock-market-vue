<template>
    <header class="header row bg-primary">
        <div class="col-12">
            <div class="d-flex h-100 justify-content-start align-items-center">
                <span class="text-light d-flex align-items">
                    <i class="fas fa-bars menu" style="cursor: pointer; font-size: 20px"></i>
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
                
                console.log($, 1);

                if($('.aside').css('display') == 'block'){
                console.log(2);
                    
                    $('.aside').fadeOut(200, function(){
                        if($(document).width() < 768){
                            $('.aside').addClass('d-none d-md-block');
                        }
                        else{
                            $('.aside').removeClass('d-md-block');
                        }

                        $('.content').css('flex', '1').css('min-width', '100%');
                    });

                    return;
                }
                console.log(3);

                $('.aside').fadeIn(200, function(){
                    if($(document).width() < 768){
                        $('.aside').removeClass('d-none');
                    }
                    else{
                        $('.content').removeAttr('style');
                        
                        $('.aside').addClass('d-md-block');
                    }
                });
            });
        }
    }
</script>

<style lang="scss" scoped>
    @import './styles';
</style>