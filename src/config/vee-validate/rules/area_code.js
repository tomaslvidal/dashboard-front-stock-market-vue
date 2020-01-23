import { extend } from 'vee-validate';

const area_code = extend('area_code', {
    validate: value => {
        value = value.toString();

        if(value[0] === '+'){
            value = value.slice(1, value.length);
        }

        if(!isNaN(value)){
            value = parseFloat(value);
        }

        if(typeof value === 'number'){
            if(parseInt(value) === value){
                return true;
            }
        }

        return false;
    },
    message: 'El formato del campo {_field_} no es válido'
});

export default area_code;