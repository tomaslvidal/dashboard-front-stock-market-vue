function jsonPaths(json, key = '', array = new Array()){
    Object.keys(json).forEach((item) => {
        let state = false;

        let path = key.length>0 ? `${key}.${item}` : item;

        if(json[item] instanceof Object){
            state = true;

            jsonPaths(json[item], path, array);
        }

        if(!state){
            array.push(path);
        }
    });

    return array;
}

export default jsonPaths;