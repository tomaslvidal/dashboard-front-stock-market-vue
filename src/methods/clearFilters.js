function clearFilter(filters){
    filters = JSON.parse(JSON.stringify(filters));

    return new Promise((resolve, reject) => {
        try{
            Object.keys(filters).map(async key => {
                if(key === 'selected' && filters[key] instanceof Array){
                    filters[key] = [];
                }
                else if(filters[key] instanceof Object && filters[key].constructor.name === 'Object'){
                    filters[key] = await clearFilter(filters[key]);
                }
                else if(key === 'value' && typeof filters[key] === 'string'){
                    filters[key] = '';
                }
            });

            resolve(filters);
        }
        catch(e){
            reject(e);
        }
    });
}

export default clearFilter;