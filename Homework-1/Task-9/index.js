// ​Write a function that delete ​null ​and ​undefined ​values from the array.
// The function takes two parameters: ​array​, ​callback​,runs for 5 seconds and then calls a callback ​function-parameter that displays the result of the execution or an error

function deleteNullAndUndefined(array, callback) {

    let error = null;
    let filteredArray = null;

    try {
        filteredArray = array.filter(el => {
            return el != null
        });
    } catch (e) {
        error = e;
    }

    setTimeout(() => callback(filteredArray, error), 5000)
}

deleteNullAndUndefined([0, 1, null, 2, 3, undefined, 4, 5], (result, error) => {
    if (error) {
        console.log(error);
    } else {
        console.log(result);
    }
})
