export default {
    methods: {
        toLocaleString(date, config){
            if(!(date instanceof Date)){
                date = new Date(date);
            }

            let data = date.toLocaleDateString('es-AR', config);

            if(config.first_capital_letter){
                data = `${data[0].toUpperCase()}${data.slice(1)}`;
            }

            return data;
        }
    }
};