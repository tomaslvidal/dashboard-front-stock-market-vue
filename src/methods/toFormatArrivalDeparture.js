function toFormatArrivalDeparture(segmentos = []){
    let data = {};

    segmentos.forEach((item, index) => {
        let type = item.tipo === 'ida' || item.tipo === 'tramo' ? 'arrival' : 'departure';

        if(typeof data[type] === 'undefined'){
            data[type] = [];
        }

        data[type].push({
            ...item,
            index
        });
    });

    if(Object.keys(data).length > 1){
        return Object.fromEntries(Object.entries(data).sort());
    }

    return data;
}

export default toFormatArrivalDeparture;