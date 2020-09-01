// Write a JavaScript function to create a case-insensitive search
// Example : console.log(caseInsensitiveSearch('JavaScript Exercises', 'exercises')); "Matched"

function caseInsensitiveSearch(sourceString, findString) {
    sourceString = sourceString.toUpperCase();
    findString = findString.toUpperCase();
    if (sourceString.includes(findString))  {
        return "Matched";
    } else {
        return "Not Matched";
    }

}

console.log(caseInsensitiveSearch('JavaScript Exercises', 'exercises'));
console.log(caseInsensitiveSearch('JavaScript Exercises', 'Exercises'));
console.log(caseInsensitiveSearch('JavaScript Exercises', 'Exercisess'));
