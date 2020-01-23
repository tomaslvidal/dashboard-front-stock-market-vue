export default {
    methods: {
        getAirportClass(name, letters){
            if(name.length > letters){
                return true;

            }else{
                return false;
            }
        }
    }
}