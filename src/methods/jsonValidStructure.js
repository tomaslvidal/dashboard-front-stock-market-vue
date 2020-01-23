import jsonPaths from './jsonPaths';

function jsonValidStructure(json, json_structure){
    try {
        jsonPaths(json_structure).forEach((item) => {
            item.split('.').reduce((v, k) => { 
                if(typeof v !== "undefined"){
                    if(typeof v[k] !== "undefined"){
                        return v[k];
                    }
                    else{
                        throw new Error(`invalid property '${item}'`);
                    }
                }
            }, json);
        });

        return true;
    }
    catch(e){
        return false;
    }
}

export default jsonValidStructure;