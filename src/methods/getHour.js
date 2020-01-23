function getHour(date, config = {
    locale: 'es-AR',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false
}){
    if(!(date instanceof Date)){
        date = new Date(date);
    }
    
    return date.toLocaleString(config.locale, config);
}

export default getHour