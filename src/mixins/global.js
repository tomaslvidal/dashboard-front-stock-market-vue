import { httpQueryToJson, jsonParseAll } from '@/methods';

export default {
    data() {
        return {
            current_width : '',
            current_scroll: ''
        } 
    },
    created(){
        this.current_width = window.innerWidth;
        
        window.addEventListener('resize', val => {
           this.current_width = window.innerWidth;
         
        });
        window.addEventListener('scroll', val => {
           this.current_scroll = window.scrollY;
        });
        
    },
    computed:{
        router(){
            return jsonParseAll(httpQueryToJson(JSON.parse(JSON.stringify(this.$store.state.Router.fullPath.slice(2)))));
        },
        mobile_size(){
            if(this.current_width < 576){
                return true;
            }else{
                return false;
            }
        },
        tablet_size(){
            if(this.current_width < 770){
                return true;
            }else{
                return false;
            }
        },
        collapse_filters(){
            if(this.current_width > 1200){
                return true;
            }else{
                return false;
            }
        },
        scroll_arrow(){
            if(this.current_scroll > 300){
                return true;
            }
        }
    }
};