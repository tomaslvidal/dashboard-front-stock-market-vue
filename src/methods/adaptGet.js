function adaptGet(data){
    data = {
        type_search: (item => {
            if(item === 'roundtrip'){
                return 1;
            }
            else if(item === 'oneway'){
                return 2;
            }
            else if(item === 'multitrip'){
                return 3;
            }
        })(data.airTipo),
        flex: data.airFlex,
        passenger: {
            adults: data.airAdultos,
            children: data.airNinos,
            babies: data.airBebes
        },
        without_stopovers: data.airEscalas,
        cabin: data.airCabin,
        flights: [
            {
                origin: {
                    label: data.airOrigen,
                    value: data.airOrigenHidden,
                    id: 1
                },
                destination: {
                    label: data.airDestino,
                    value: data.airDestinoHidden,
                    id: 2
                },
                date: (item => {
                    function formatDate(date_string){
                        date_string = date_string.split('/');

                        date_string = `${date_string[1]}/${date_string[0]}/${date_string[2]}`;

                        return date_string;
                    }

                    // eslint-disable-next-line no-constant-condition
                    if(true){
                        return [formatDate(item.airSalida), formatDate(item.airRegreso)];
                    }
                    else{
                        return formatDate(item.airSalida);
                    }
                })(data)
            }
        ]
    };

    data.qty_flights = data.flights.length;

    return data;
}

export default adaptGet;