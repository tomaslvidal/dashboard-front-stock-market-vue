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
                    $('.aside').fadeOut(400, function(){
                        $('.content').addClass('col-md-12');
                    });

                    return;
                }

                $('.content').removeClass('col-md-12');

                $('.aside').fadeIn();
            });
        }
    }
</script>

<style lang="scss" scoped>
    @import './styles';
</style>