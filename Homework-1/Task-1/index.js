// 0 1 1 2 3 5 8 13 21 34 55 ...
// ​Write a JavaScript function that returns the Fibonacci series up to a certain number.
function fibonacci(number) {
    let prev = 0, next = 1;
    let array = [0];
    
    if (number <= 0) {
        array = [];
    }

    for (let i = 0; i < number; i++) {
        next = prev + next;
        prev = next - prev;

        if (next > number) {
            break;
        } else {
            array.push(prev);
        }
    }
    return array;
}

console.log(fibonacci(8));
console.log(fibonacci(610));
