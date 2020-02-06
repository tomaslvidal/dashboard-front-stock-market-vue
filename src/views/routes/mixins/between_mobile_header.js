import $ from 'jquery';

export default{ 
    data(){
            return{
                click : 0
            }
    },
    methods:{
            showModal(value, state = true ){
                
                this.click++;
                   
                $('.filtros_container_mobile').animate({
                            left: 0
                }, 500);

                $('body').css('overflow', 'hidden');
              /*   if(this.click!= 1){
                    this.hideModal();
                    this.click = 0;
                } */
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