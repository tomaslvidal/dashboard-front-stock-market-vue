import $ from 'jquery';

export default{ 
    methods:{
            showModal(value, state = true){
                $('.filtros_container_mobile').animate({
                left: 0
                }, 500);
                $('body').css('overflow', 'hidden');
               if(state == true){
                this.state.component = value;
                if(value == 1){
                    this.filter_name = 'Filtrar';
                }else if(value == 2){
                    this.filter_name = 'Modificar';
                }else{
                    this.filter_name = 'Ordenar';
                }
               } 
            },
            hideModal(){
                $('.filtros_container_mobile').animate({
                    left: '-2000px'
                }, 500);
                $('body').css('overflow', 'auto');
            }
        }
  };