function mergeBIntoA(a, b){
    for (let key in b){
        if(typeof(a[key]) === "undefined" || typeof(a[key]) !== "object"){
            a[key] = b[key];
        }
        
        if(typeof b[key] === "object"){
            mergeBIntoA(a[key], b[key]);
        }
    }

    return a;
}

export default mergeBIntoA;