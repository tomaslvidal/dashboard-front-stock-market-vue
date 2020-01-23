function toFormatStringDate(date){
    if(!(date instanceof Date)){
        date = new Date(date);
    }

    return `${(date.getFullYear())}/${(date.getMonth() + 1)}/${(date.getDate())}`;
}

export default toFormatStringDate;