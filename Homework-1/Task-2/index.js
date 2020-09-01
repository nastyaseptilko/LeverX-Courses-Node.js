// ​Write a JavaScript function to find the unique elements from two arrays.
// Example : console.log(difference([1, 2, 3], [100, 2, 1, 10])); ["1", "2", "3", "10", "100"]

function difference(arrayFirst, arraySecond) {
    let array = [];
    let arraySet = new Set(arrayFirst.concat(arraySecond));
    array = Array.from(arraySet.values());
    return array;
}

console.log(difference([1, 2, 3], [100, 2, 1, 10]));
