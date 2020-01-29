function booleanToString(data){
    data = JSON.parse(JSON.stringify(data));
    
    Object.keys(data).forEach(key => {
        if(typeof data[key] === 'boolean'){
            data[key] = data[key] ? 'true' : 'false';
        }
        else if(typeof data[key] === 'object'){
            if(data[key].constructor.name === 'Object'){
                data[key] = booleanToString(data[key]);
            }
        }
    });

    return data;
}

export default booleanToString;