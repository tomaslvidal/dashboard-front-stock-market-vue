function calculateAge(date) { 
    let diff = new Date(Date.now() - new Date(date).getTime());

    return Math.abs(diff.getUTCFullYear() - 1970);
}

export default calculateAge;