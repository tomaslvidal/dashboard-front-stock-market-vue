function totalDuration(hour_in_minutes){
    let hours = Math.floor(hour_in_minutes / 60).toString(), minutes = "00", text_total_duration = '';

    if(hours > 0){
        minutes =  (hour_in_minutes - (hours * 60)).toString();

        text_total_duration = `${hours.padStart(2, 0)}${hours == 1 ? 'h' : 'hs'} ${minutes.padStart(2, 0)}m`;
    }
    else{
        minutes = hour_in_minutes.toString();

        text_total_duration = `${minutes.padStart(2, 0)}m`;
    }

    return {
        text: text_total_duration,
        data: {
            hours: hours,
            minutes: minutes
        }
    };
}

export default totalDuration;