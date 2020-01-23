function getTypeSchedule(date_string){
    let date = new Date(date_string);

    let skeleton = `${(date.getFullYear())}/${(date.getMonth() + 1)}/${(date.getDate())} {{hour}}`;

    let type_schedules = {
        night: {
            between_1: (item => {
                return new Date(item.setDate(item.getDate() + -1));
            })(new Date(skeleton.replace(/{{hour}}/g, '07:00 PM'))),
            between_2: new Date(skeleton.replace(/{{hour}}/g, '06:00 AM')),
            name: 'Noche (19 - 6hs)',
            value: 'night',
            sort: 2
        },
        morning: {
            between_1: new Date(skeleton.replace(/{{hour}}/g, '06:00 AM')),
            between_2: new Date(skeleton.replace(/{{hour}}/g, '12:00 PM')),
            name: 'Mañana (6 - 12hs)',
            value: 'morning',
            sort: 0
        },
        afternoon: {
            between_1: new Date(skeleton.replace(/{{hour}}/g, '12:00 PM')),
            between_2: new Date(skeleton.replace(/{{hour}}/g, '07:00 PM')),
            name: 'Tarde (12 - 19hs)',
            value: 'afternoon',
            sort: 1
        },
        night_2: {
            between_1: new Date(skeleton.replace(/{{hour}}/g, '07:00 PM')),
            between_2: (item => {
                return new Date(item.setDate(item.getDate() + 1));
            })(new Date(skeleton.replace(/{{hour}}/g, '06:00 AM'))),
            name: 'Noche (19 - 6hs)',
            value: 'night',
            sort: 3
        },
    };

    let type_schedule;

    Object.keys(type_schedules).forEach(key => {
        if(date >= type_schedules[key].between_1 && date <= type_schedules[key].between_2){
            type_schedule = {
                value: type_schedules[key].value,
                name: type_schedules[key].name,
                sort: type_schedules[key].sort,
            };
        }
    });

    return type_schedule;
}

export default getTypeSchedule;