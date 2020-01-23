function jsonParseAll(json){
    Object.keys(json).map(item => {
        try{
            json[item] = JSON.parse(json[item]);

            if(json[item] instanceof Object){
                jsonParseAll(json[item]);
            }
        }
        // eslint-disable-next-line
        catch(e){}
    });

    return json;
}

export default jsonParseAll;