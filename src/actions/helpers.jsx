export const nl2br = (str) => {	// Inserts HTML line breaks before all newlines in a string
    // 
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)

    return str.replace(/([^>])\n/g, '$1<br>');
};

export const brto = (str) => {
    let arr = _.split(nl2br(str), '<br>');
    let result = [];
    arr.forEach((i) => {
        if (i.length > 1) {
            result.push(i);
        }
    });
    return result;
};

export const difference =  (array , nextArray) => {
    // if the other array is a falsy value, return
    if (!nextArray)
        return false;

    // compare lengths - can save a lot of time 
    if (array.length !== nextArray.length)
        return false;

    for (let i = 0, l=array.length; i < l; i++) {
        // Check if we have nested arrays
        if (array[i] instanceof Array && nextArray[i] instanceof Array) {
            // recurse into the nested arrays
            if (!array[i].equals(nextArray[i]))
                return false;
        }
        else if (array[i] !== nextArray[i]) {
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;
        }
    }
    return true;
};
