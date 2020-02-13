import $ from 'jquery';

export default {
    created(){
        console.log($);
        
    },
    methods: {
        open(val){
            if(val === 'link'){
                if(this.current_width >= 768){
                    return;
                }
            }

            if($('.aside').css('display') === 'block'){
                $('.aside').fadeOut(200, () => {
                    if($(document).width() < 768){
                        $('.aside').addClass('d-none d-md-block');
                    
                        this.$store.dispatch('Root/STATE_ASIDE', {
                            open: false
                        });
                    }
                    else{
                        $('.aside').removeClass('d-md-block');
                    }

                    $('.content').css('flex', '1').css('min-width', '100%');
                });

                return;
            }

            $('.aside').fadeIn(200, () => {
                if($(document).width() < 768){
                    $('.aside').removeClass('d-none');
                
                    this.$store.dispatch('Root/STATE_ASIDE', {
                        open: true
                    });
                }
                else{
                    $('.content').removeAttr('style');
                    
                    $('.aside').addClass('d-md-block');
                }
            });
        }
    }
};