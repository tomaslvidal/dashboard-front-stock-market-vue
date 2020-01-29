import { forQueryString } from '@/methods';

function adaptGet(data){
    return new Promise((resolve, reject) => {
        try{
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
                airline: data.airline,
                alliance: data.alliance,
                hold_baggage: typeof data.airEquipaje !== 'undefined' ? data.airEquipaje : false,
                without_stopovers: typeof data.airEscalas !== 'undefined' ? data.airEscalas : false,
                same_air: typeof data.airSameAir !== 'undefined' ? data.airSameAir : false,
                cabin: data.airCabin,
                flights: [
                    ...(data => {
                        let flights = [];

                        const formatDate = (date_string) => {
                            date_string = date_string.split('/');

                            date_string = `${date_string[1]}/${date_string[0]}/${date_string[2]}`;

                            return date_string;
                        };

                        [data['airOrigenHiddenM[]']].flat().forEach((item, index) => {
                            flights.push({ 
                                origin: {
                                    label: data.airTipo !== 'multitrip' ? data.airOrigen : [data['airOrigenM[]']].flat()[index],
                                    value: data.airTipo !== 'multitrip' ? data.airOrigenHidden : item,
                                    id: 1
                                },
                                destination: {
                                    label: data.airTipo !== 'multitrip' ? data.airDestino : [data['airDestinoM[]']].flat()[index],
                                    value: data.airTipo !== 'multitrip' ? data.airDestinoHidden : [data['airDestinoHiddenM[]']].flat()[index],
                                    id: 2
                                },
                                date: (() => {
                                    if(data.airTipo === 'roundtrip'){
                                        return [formatDate(data.airSalida), formatDate(data.airRegreso)];
                                    }

                                    return data.airTipo !== 'multitrip' ? formatDate(data.airSalida) : formatDate([data['airSalidaM[]']].flat()[index]);
                                })()
                            });
                        });

                        return flights;
                    })(data)
                ]
            };

            data.qty_flights = data.flights.length;

            resolve(data);
        }
        catch(e){
            reject(e);
        }
    });
}

export default adaptGet;