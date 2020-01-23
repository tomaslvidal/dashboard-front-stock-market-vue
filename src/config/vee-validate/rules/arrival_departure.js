import { extend } from 'vee-validate';

const arrival_departure = extend('arrival_departure', {
    validate: value => {
        if(value instanceof Array){
            if(value.length > 1){
                return true;
            }
        }

        return false;
    },
    message: 'Es necesaria una fecha para la vuelta'
});

export default arrival_departure;