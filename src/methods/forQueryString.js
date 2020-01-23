function forQueryString(json = {}){
    Object.keys(json).forEach(item => {
        if(typeof json[item] === "object"){
            json[item] = JSON.stringify(json[item]);
        }
    });

    return json;
}

export default forQueryString;