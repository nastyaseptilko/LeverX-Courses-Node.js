//Write a JavaScript function to count the occurrence of a substring in a string.

function countSubstring(sourceString, substring) {

    sourceString += "";
    substring += "";

    if (substring.length <= 0) {
        return "Empty substring";
    }

    let subStr = substring.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    return "Count: " + (sourceString.match(new RegExp(subStr, 'gi')) || []).length;
}

console.log(countSubstring("This text this words this letter", 'this'));
console.log(countSubstring("This text is written for example", 'for'));
