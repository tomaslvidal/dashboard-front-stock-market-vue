function onlyOneItem(data){
    Object.keys(data).forEach(key => {
        if(data[key] instanceof Object && data[key].constructor.name === 'Object'){
            data[key] = onlyOneItem(data[key]);
        }
        else if(data[key] instanceof Array){
            data[key] = data[key].filter((item, index, array) => array.findIndex(item2 => item2.value === item.value) === index);

            if(typeof data[key][0] !== 'undefined'){
                if(typeof data[key][0].sort !== 'undefined'){
                    data[key] = data[key].sort((a, b) => {
                        a = a.sort; b = b.sort;

                        if(a < b){
                            return -1;
                        }
                        else if(a > b){
                            return 1;
                        }
                        else{
                            return 0;
                        }
                    });
                }
            }
        }
    });

    return data;
}

export default onlyOneItem;