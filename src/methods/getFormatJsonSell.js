function getFormatJsonSell(rate){
    return {
        convid: rate.convid,
        token: rate.token,
        adultos: (item => item.length ? item[0].cantidad : 0)(rate.data.precio.pasajeros.filter(item => item.titulo === 'Adulto')),
        ninos: (item => item.length ? item[0].cantidad : 0)(rate.data.precio.pasajeros.filter(item => item.titulo === 'Niño')),
        bebes: (item => item.length ? item[0].cantidad : 0)(rate.data.precio.pasajeros.filter(item => ['Bebe', 'Bebé'].includes(item.titulo))),
        opcion: rate.segmentos.map(item => item.tramos.map(item2 => ({
                marriage: item2.marriage,
                fecha_salida: item2.salida.fecha,
                fecha_llegada: item2.llegada.fecha,
                nro_vuelo: item2.numeroVuelo,
                clase: item2.ResBookDesigCode,
                aeropuerto_salida: item2.salida.destino,
                aeropuerto_llegada: item2.llegada.destino,
                operating_airline: item2.aerolineaOperadora.codigo,
                marketing_airline: item2.marketingAirline.codigo,
                equipo: item2.equipo
            })
        )).flat(Infinity)
    }
}

export default getFormatJsonSell;