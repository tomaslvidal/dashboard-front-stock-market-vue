function parseSearch(json){
    Object.keys(json).forEach((item) => {
        if(typeof json[item].location === 'object' && json[item].location !== null){
            delete json[item].location.id;
        }
    });

    return json;
}

export default parseSearch;