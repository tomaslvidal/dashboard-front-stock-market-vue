function getMinutes(date){
    if(!(date instanceof Date)){
        date = new Date(date);
    }

    return date.getMinutes() + date.getHours() * 60
}

export default getMinutes;