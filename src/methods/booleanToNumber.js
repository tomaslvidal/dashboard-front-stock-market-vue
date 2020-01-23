function booleanToNumber(object){
    for(let key in object){
        if(typeof object[key] === "boolean"){
            object[key] = Number(object[key])
        }
        else if(typeof object[key] === "object" && object[key] !== null){
            booleanToNumber(object[key]);
        }
    }
}

export default booleanToNumber;