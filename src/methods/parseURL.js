function parseURL(url){
    url = url.replace(/COLON/g, ':'); url = url.replace(/AMPERSAND/g, '&');

    return url;
}

export default parseURL;