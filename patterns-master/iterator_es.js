function range(start, end) {
    return {
        [Symbol.iterator]() { //#A
            return this;
        },
        next() {
            if (start < end) {
                return { value: start++, done: false }; //#B
            }
            return { done: true, value: end }; //#B
        }
    }
}
for (const number of range(1, 5)) {
    console.log(number);   //-> 1, 2, 3, 4
}

let iter = ['I', 't', 'e', 'r', 'a', 't', 'o', 'r'][Symbol.iterator]();
console.log(iter.next().value); //-> I
console.log(iter.next().value); //-> t
