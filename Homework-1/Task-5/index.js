//Write a JavaScript function to convert an object into a list of `[key, value]` pairs.

let object = {
    "1": 300,
    "2": 15,
    "3": 44,
    "4": 660,
    "5": 111
};

function convertObj(obj) {
    return Object.entries(obj);
}

console.log(convertObj(object))
