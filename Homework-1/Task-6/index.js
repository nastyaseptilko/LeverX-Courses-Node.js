// Write a JavaScript function to uncamelize a string

function uncamelize(sourceString, separator) {

    if (typeof (separator) == "undefined") {
        separator = " ";
    }

    let str = sourceString.replace(/[A-Z]/g, function (symbol) {
        return separator + symbol.toLowerCase();
    });

    return str.replace("/^" + separator + "/", '');
}

console.log(uncamelize('helloWorld'));
console.log(uncamelize('helloWorld', '-'));
console.log(uncamelize('helloWorld', '_'));
