function deleteJsonPath(json, arrayPaths = new Array()){
    arrayPaths.forEach((path) => {
        let split_path = path.split('.');

        split_path.reduce((val, key, index) => {
            if(index < split_path.length-1){
                return val[key];
            }
            else{
                delete val[key];
            }
        }, json);
    });

    return json;
}

export default deleteJsonPath;