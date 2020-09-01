//Write a JavaScript function to get a copy of the object where the keys have become the values and the values the keys.

let object = {
    name: "Nastya",
    lastName: "Septilko",
    age: 20
}

function copyObj() {

    let keysOldObject = Object.keys(object);
    let valuesOldObject = Object.values(object);
    let newObject = {};

    for (let i = 0; i < valuesOldObject.length; i++) {
        let value = valuesOldObject[i];
        newObject[value] = keysOldObject[i];
    }

    return newObject;

}

console.log(copyObj());
