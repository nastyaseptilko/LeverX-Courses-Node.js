// Flat an array (​use reduce here​) and sort it (​by ascending​).

function flatArray(array) {

    let arr = [];

    arr = array.reduce((acc, val) =>
        Array.isArray(val) ? acc.concat(flatArray(val)) : acc.concat(val), []);

    arr.sort((a,b) => { return a - b; })

    return arr;
}

console.log(flatArray([1, 2, 1000, 300, [400, [3, 10, [11, 12]], [1, 2, [3, 4]], 5, 6]]))
