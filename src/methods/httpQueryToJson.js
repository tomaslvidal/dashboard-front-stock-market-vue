function httpQueryToJson(data){
    return Object.fromEntries(new URLSearchParams(data));
}

export default httpQueryToJson;